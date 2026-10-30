# Mojangels AI TV — secure assistant development roadmap

## Confirmed baseline (Oct 30, 2026)
- Native Tizen 3.0 web app has installed and launched on Samsung UN50M5300.
- SDK launcher initially failed with `execute Mojangel01.MojangelsTV`; actual installed app ID is `Mojangel01.native-tizen3` and `sdb shell 0 was_execute Mojangel01.native-tizen3` succeeded.
- The currently installed index.html has four dashboard tiles; **ChatGPT and Voice are placeholders**, not live AI.
- TizenBrew and Samsung Smart Hub must remain untouched.

## Phase A: Validate controls
Test arrows, OK, Return, HOME. Existing index.html supports arrow keys (37/38/39/40), Enter (13), Back (8 or 10009). Don't replace it before collecting a test result.

## Phase B: Secure local AI gateway on owner's Windows laptop
Build a separate local authenticated server with narrow POST /api/chat request and response schemas:
  request: { "message": "user question", "conversationId": "opaque-local-session" }
  response: { "answer": "assistant response", "conversationId": "opaque-local-session" }
Maintain authentication, short lifetimes, rate limits, and an explicit pairing UI. The TV should *never* contain an OpenAI API key or pass certificates/passwords to GitHub. Hold the key in the trusted server environment only; keep logs minimal and redact credentials. Don't make the TV service publicly reachable or expose raw PowerShell/SDB commands. Any action on the TV must be explicitly permitted and narrowly allowlisted. Provide clear error states for offline PC and disconnected session.

**Important network limitation:** The current bridge binds to localhost and cannot be reached directly by the TV. An authenticated TV-to-PC connection requires a separately designed LAN binding, firewall rule restricted to the TV, HTTPS/TLS suitable for the Tizen 3.0 web runtime, and local user authorization. None of this is implemented or tested yet. Do not turn on port forwarding or allow arbitrary LAN access as a shortcut. A hosted HTTPS gateway with authenticated sessions is an alternative.

## Phase C: Native TV chat
- Add a TV-readable conversation view, compose UI compatible with remote and onscreen keyboard, and a clear Send action.
- Preserve remote focus navigation and Return.
- Fetch /api/chat only after pairing and transport have been verified on this exact TV. Timeouts, network failures and unsupported web APIs must show useful messages.
- Never claim the placeholder tile is a functioning live AI.

## Phase D: Voice
Check whether Samsung Tizen 3.0 and the user's actual remote/TV expose appropriate microphone APIs. Do not promise voice operation until hardware and permissions are verified. Text chat is the default fallback.

## Phase E: Limited TV commands
Keep TV control in the existing local bridge. Add each narrowly allowlisted action only after confirming it with the owner; do not expose raw shell, remap HOME, root the television, change firmware, or remove system apps.

## Build and deploy
After updating index.html, build and sign with existing Samsung developer certificate profile locally. Do not commit .p12/.pfx, access tokens, secrets or private keys. If VS Code Run Project still fails, use the *installed* application ID and documented manual SDB `was_execute` syntax only after the package reports successful installation.
