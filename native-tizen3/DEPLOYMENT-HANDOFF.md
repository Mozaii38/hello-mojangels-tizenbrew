# Mojangels completion / deployment handoff

## What is done in source
- Cinema home UI: original gradients, TV remote D-pad navigation, focus styling; no remote artwork/fonts/advertising/analytics.
- Privacy Center: explicit statement of what Mojangels can and cannot change about Samsung's software.
- AI Chat: remote-navigable screen, HTTPS-only gateway pairing UI, message entry, in-memory display and disconnect.
- Gateway: Node.js HTTPS API with locally held OpenAI key, six-digit pairing code, expiring session tokens, limited attempts and sessions, output limits.
- TV manifest: Tizen 3.0 app identifier `Mojangel01.native-tizen3`, version 0.4.0.

## What is NOT complete / verified
- New app version has not been built, signed, installed or tested on the physical Samsung UN50M5300.
- Secure HTTPS gateway is not deployed, no OpenAI API credentials or trusted TLS endpoint are configured.
- No voice, privileged Samsung system control, app deletions or backend Samsung package cleanup.
- Compatibility with the television's older browser and its supported TLS versions needs local verification.
- Samsung Smart Hub will still exist, and the physical HOME button remains Samsung-controlled.

## Minimal deployment steps for the owner or local technician
1. Back up the existing working source and leave TizenBrew installed.
2. Obtain the latest source from `native-tizen3-starter/native-tizen3` and open it in the existing Tizen VS Code extension on the Windows laptop.
3. Build and sign with local `Mojangels-Samsung-TV` profile; never upload signing certificates or passwords.
4. Install the WGT through SDB only after successful build. The historical install ID was `Mojangel01.native-tizen3`. The known-working manual launch was: `& "$HOME\.tizen-extension-platform\server\sdktools\data\tools\sdb.exe" -s 192.168.1.72:26101 shell 0 was_execute Mojangel01.native-tizen3` (verify TV IP hasn't changed).
5. Confirm the TV displays Cinema UI and focus controls work. Keep existing installation unless the new app passes basic checks.
6. Independently provision a server with trustworthy HTTPS for Tizen 3.0, set Node.js gateway environment secrets locally, provide TV-to-gateway network path and verify app Origin/CORS. Start paired AI chat only after the gateway is secure.
7. For Samsung unwanted apps: use Settings removal or hide shortcuts only where allowed. For telemetry: disable optional Samsung ACR/ad tracking, then use reversible per-TV router egress restrictions. Never run unverified forced package deletions, root commands or firmware replacement.

## Privacy note
Mojangels has no embedded API key and no deliberate advertising/analytics connections, but **it cannot guarantee that Samsung firmware has stopped tracking**. If public internet access is blocked at the router, the TV may lose Samsung streaming apps, software updates and other network functions. Keep a way to roll back.
