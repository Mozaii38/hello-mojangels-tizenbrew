# Paired Phone-to-TV Voice Sync v0.6 (prototype)

The gateway now implements a small ephemeral event feed for **trusted devices paired to the same gateway**.

## Expected behavior
1. Host the HTTPS gateway and phone companion securely, then pair the phone with the gateway's six-digit code.
2. Build/install the updated v0.6 native TV app, open AI Chat and separately pair it with the **same** gateway.
3. Tap Talk on the phone (when supported), edit recognized words and press Send.
4. The AI response displays on the phone. While the TV keeps AI Chat open and is paired, it polls /api/events every five seconds; questions and AI answers originating from another paired session appear on screen.
5. Neither phone nor TV will auto-execute TV control commands. Samsung's HOME and firmware are unchanged.

## Security and privacy boundaries
- The feed is shared by **all** clients successfully paired to this gateway, not by a unique TV+phone pair. Do not give the pairing code to anyone who should not read conversations; this prototype is appropriate only for a single trusted household.
- The feed stores only the most recent 30 events in gateway memory; messages may also be kept briefly in per-session conversation histories, and go to OpenAI when Send is pressed. Restarting clears gateway memory. No transcript file is written by this source.
- The phone's browser-native recognition may upload audio to the browser vendor. The user must tap to listen and then explicitly tap Send.
- Phone and TV must both trust the HTTPS gateway certificate. The server must be configured with the exact allowed browser origins via comma-separated `MOJANGELS_ORIGINS` (e.g. `https://your-voice-host.example,null` if packaged Tizen uses a null origin). Never use wildcard CORS or disable TLS validation.
- Remote polling only occurs while TV AI Chat is open and paired. No wake words or background TV microphone recording.
- The app is **not** a full Samsung system replacement and has no powers to remove protected apps.
- This source has not been hosted, installed on the real TV, or integration-tested. Protect `OPENAI_API_KEY`, pairing code, signing keys, network ports.

## Not yet provided
Dedicated TV-only pairing confirmation, voice-to-TV audio playback, TV volume/input commands, and a production-grade account/permission system.
