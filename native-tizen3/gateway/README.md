# Mojangels AI TV secure gateway (developer source)

This is **not deployed** and is **not connected to the user's TV**. Node.js 20+ is required. The gateway expects a publicly trusted HTTPS certificate, hostname that matches it, and OpenAI API access. Older Tizen 3.0 browsers might not accept modern TLS/certificate combinations: compatibility must be established before use.

## Endpoints
- `POST /api/pair` with `{"code":"123456"}` exchanges a locally configured six-digit pairing code for an expiring in-memory session token.
- `POST /api/chat` with `Authorization: Bearer <session>` and `{"message":"Hello"}` forwards user text to OpenAI Responses API. The key stays on the gateway.

## Configuration
Use environment variables on the gateway host, **never in GitHub**:

- `OPENAI_API_KEY` — secret OpenAI API key
- `MOJANGELS_PAIR_CODE` — temporary six-digit code; rotate it after pairing
- `TLS_CERT_FILE`, `TLS_KEY_FILE` — HTTPS certificate and private key paths
- `MOJANGELS_HOST` — defaults to `127.0.0.1`, which is intentionally inaccessible from the TV
- `MOJANGELS_PORT` — defaults to `9443`
- `MOJANGELS_ORIGIN` — defaults to `null` (some Tizen packaged apps send `Origin: null`; confirm on device)
- `OPENAI_MODEL` — defaults to `gpt-4.1-mini`

Run `node server.js` in a properly secured environment after setting variables. Do not expose this endpoint publicly without professional authentication, firewall, origin restrictions, monitoring, and abuse controls. Do not open home router ports or bypass certificate verification. Since Tizen 3.0 uses an older web engine, CORS and TLS require real-device verification.

The `index.html` pairing UI expects `https://your-gateway-host`; no credentials are saved across launches. This is a minimal development gateway, **not production-hardened**. In-memory sessions and conversation context disappear on restart.

## Security
Never commit certificate private keys, signing files, pairing codes, or API keys. This is unrelated to the existing local SDB bridge, which remains unchanged. No remote shells, executable commands or TV control APIs are exposed.
