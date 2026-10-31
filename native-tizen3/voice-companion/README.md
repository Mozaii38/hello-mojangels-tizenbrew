# Mojangels Voice Companion v0.5

**Implemented in source, not yet deployed.** This is a separate phone-friendly HTML page under `voice-companion/index.html`. It does not use a microphone on the Samsung UN50M5300 or modify its Tizen software.

## What it does
- A phone-browser *tap-to-talk* control requests microphone access only when tapped.
- Browser-native speech recognition (if supported) transcribes speech into editable text.
- The user explicitly taps **Send** before the transcribed text is transmitted.
- When paired to the Mojangels HTTPS gateway, the recognized text is sent to `/api/chat` and the AI response is displayed **on the phone**.
- Typed questions work if speech recognition is unsupported.
- No embedded analytics, ad libraries, external scripts, API credentials or persistent conversation storage.

## Important limitations
- This does **not** yet display phone voice transcriptions or AI answers on the television. TV-to-phone synced conversation delivery requires a separately designed session/channel authenticated on both devices.
- Browser speech recognition may send captured audio to the browser vendor's speech service. It is not guaranteed on-device/private processing. If you require audio to stay entirely on the phone, this feature is not appropriate until an offline speech-to-text implementation has been chosen and verified.
- Microphone capture requires a secure origin and explicit browser permission. Opening the HTML as a file may not work.
- The existing gateway defaults to a single allowed CORS origin (`MOJANGELS_ORIGIN`), so **simultaneous TV and phone origins are not yet enabled**. Set a specific trusted phone origin for phone-only use; do not allow arbitrary origins. The gateway must be deployed with trusted HTTPS and OpenAI API access.
- No TV control actions (volume, inputs, app launches) are available from this companion.
- No always-on wake word or background listening.
- This is prototype source. It has not been tested against the user's phone, TV, or a live AI gateway.

## Deployment order
1. Securely deploy the existing gateway with TLS, an environment-only OpenAI API key and temporary pairing code. Use a trusted HTTPS hostname compatible with the client browser.
2. Host `voice-companion/index.html` over trusted HTTPS and configure the gateway's allowed CORS origin to **that exact origin**.
3. Pair on the phone, tap Talk, review/edit recognized text, then tap Send.
4. To support the phone and Samsung TV together, implement separate authenticated device sessions and a carefully scoped secure message synchronization channel before enabling TV rendering.

No API key, signing certificate, Samsung developer bridge port, router port forward or PIN should be committed to GitHub.
