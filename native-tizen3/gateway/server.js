'use strict';
// Node.js 20+; this gateway requires a trusted HTTPS certificate.
// Never put an API key into index.html or source control.
const https = require('node:https');
const fs = require('node:fs');
const crypto = require('node:crypto');

const required = ['OPENAI_API_KEY','MOJANGELS_PAIR_CODE','TLS_CERT_FILE','TLS_KEY_FILE'];
for (const key of required) if (!process.env[key]) throw new Error('Missing environment setting: '+key);
if (!/^[0-9]{6}$/.test(process.env.MOJANGELS_PAIR_CODE)) throw new Error('Pairing code must have six digits.');
const host = process.env.MOJANGELS_HOST || '127.0.0.1';
const port = Number(process.env.MOJANGELS_PORT || '9443');
const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const allowedOrigin = process.env.MOJANGELS_ORIGIN || 'null';
const sessions = new Map();
const attempts = new Map();
const MAX_BODY = 8192;
const MAX_SESSIONS = 100;
const MAX_CLIENTS = 1000;
function json(res,status,body,origin) {
  if (origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin',origin);
    res.setHeader('Vary','Origin');
    res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  }
  res.setHeader('Cache-Control','no-store');
  res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve,reject)=>{
    let raw='',done=false;
    req.on('data',chunk=>{
      if(done)return;
      raw+=chunk.toString('utf8');
      if(Buffer.byteLength(raw)>MAX_BODY){done=true;reject(new Error('Request too large'));}
    });
    req.on('end',()=>{if(done)return;try{resolve(JSON.parse(raw));}catch(e){reject(new Error('Invalid JSON'));}});
    req.on('error',reject);
  });
}
function getClientIP(req){return req.socket.remoteAddress || 'unknown';}
const server = https.createServer({
  key:fs.readFileSync(process.env.TLS_KEY_FILE),
  cert:fs.readFileSync(process.env.TLS_CERT_FILE),
  minVersion:'TLSv1.2'
},async(req,res)=>{
  const origin=req.headers.origin || '';
  if(origin && origin !== allowedOrigin) return json(res,403,{error:'Origin not permitted'},origin);
  if(req.method==='OPTIONS'){res.writeHead(origin===allowedOrigin?204:403,{
    'Access-Control-Allow-Origin':origin===allowedOrigin?origin:'',
    'Access-Control-Allow-Headers':'Content-Type, Authorization',
    'Access-Control-Allow-Methods':'POST, OPTIONS',
    'Vary':'Origin'
  });return res.end();}
  if(req.method!=='POST'||!['/api/pair','/api/chat'].includes(req.url))return json(res,404,{error:'Not found'},origin);
  let body;
  try{body=await readBody(req);}catch(e){return json(res,400,{error:'Invalid request'},origin);}
  if(!body || typeof body!=='object'||Array.isArray(body))return json(res,400,{error:'Invalid request'},origin);
  const now=Date.now(),ip=getClientIP(req);
  if(req.url==='/api/pair'){
    for(const [client,times] of attempts){const recent=times.filter(t=>now-t<15*60*1000);if(recent.length)attempts.set(client,recent);else attempts.delete(client);}
    if(attempts.size>=MAX_CLIENTS&&!attempts.has(ip))return json(res,503,{error:'Pairing temporarily unavailable'},origin);
    const history=(attempts.get(ip)||[]).filter(t=>now-t<15*60*1000);
    if(history.length>=5){attempts.set(ip,history);return json(res,429,{error:'Too many pairing attempts'},origin);}
    history.push(now);attempts.set(ip,history);
    const supplied=String(body.code||'');
    const expected=process.env.MOJANGELS_PAIR_CODE;
    if(supplied.length!==expected.length || !crypto.timingSafeEqual(Buffer.from(supplied),Buffer.from(expected)))return json(res,401,{error:'Invalid pairing code'},origin);
    for (const [key, session] of sessions) if(session.expires<now)sessions.delete(key);
    if(sessions.size>=MAX_SESSIONS)return json(res,503,{error:'Gateway session capacity reached'},origin);
    const token=crypto.randomBytes(32).toString('hex');
    sessions.set(token,{expires:now+60*60*1000,lastCall:0,history:[]});
    return json(res,200,{token:token},origin);
  }
  const bearer=String(req.headers.authorization||'');
  if(!bearer.startsWith('Bearer '))return json(res,401,{error:'Pairing required'},origin);
  const token=bearer.slice(7);
  if(!/^[a-f0-9]{64}$/.test(token))return json(res,401,{error:'Invalid session'},origin);
  const s=sessions.get(token);
  if(!s||s.expires<now){sessions.delete(token);return json(res,401,{error:'Session expired; pair again'},origin);}
  if(s.busy)return json(res,429,{error:'A reply is already in progress'},origin);
  if(s.lastCall && now-s.lastCall<3000)return json(res,429,{error:'Please wait before sending another message'},origin);
  if(typeof body.message!=='string'||!body.message.trim()||body.message.length>1200)return json(res,400,{error:'Message must be 1 to 1200 characters'},origin);
  s.lastCall=now;
  s.busy=true;
  const prior=s.history.slice(-8);
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Authorization':'Bearer '+process.env.OPENAI_API_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({model:model,max_output_tokens:450,
        instructions:'You are Mojangels AI TV, a concise and helpful assistant on a television. Do not claim to control the TV.',
        input:[...prior,{role:'user',content:body.message}] }),
      signal:AbortSignal.timeout(30000)
    });
    if(!response.ok){return json(res,502,{error:'AI provider unavailable ('+response.status+')'},origin);}
    const result=await response.json();
    const answer=(result.output||[]).flatMap(o=>(o.content||[])).filter(c=>c.type==='output_text').map(c=>c.text).join('\n').trim();
    if(!answer)return json(res,502,{error:'AI provider returned no text'},origin);
    s.history.push({role:'user',content:body.message},{role:'assistant',content:answer});
    s.history=s.history.slice(-8);
    return json(res,200,{answer:answer},origin);
  }catch(e){return json(res,502,{error:'AI request failed or timed out'},origin);}finally{s.busy=false;}
});
server.listen(port,host,()=>console.log('Mojangels HTTPS gateway listening on '+host+':'+port+' (pairing required)'));
