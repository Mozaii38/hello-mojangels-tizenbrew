# Mojangels Private TV — privacy-first migration plan

Target: Samsung UN50M5300, Tizen 3.0, with working native Mojangels app and TizenBrew.

## Non-negotiable safety boundary
Do **not** flash, root, erase, or replace Samsung firmware without a verified and recoverable platform-specific method. Do not modify service-menu settings, remove system packages, disable firmware security, or claim the native web app can replace Smart Hub or take over the physical HOME button. Keep a way to return to normal TV inputs and developer access. No warranty that telemetry can be eliminated while stock firmware has internet access.

## Layer 1: Manufacturer privacy opt-outs
On this model/year, inspect Settings > Support > Terms & Policy (or Terms & Privacy), and Smart Hub > Terms & Policy if that path is absent. Disable the optional Viewing Information Services/ACR, Interest-Based Advertisements, SyncPlus/interactive marketing if present, and Voice Recognition Services if unused. Menu wording varies; don't blindly click. These steps reduce optional tracking; some generic ads and telemetry may remain.

## Layer 2: Network containment
- Prefer a dedicated isolated TV network segment/VLAN when supported by the router.
- Permit the TV only the minimum network destinations actually required for intended features, including the paired HTTPS AI gateway; apply deny by default to *TV internet egress* after establishing what remains functional. Local SDB/developer traffic is temporary and should not be exposed to the internet.
- For maximum reduction of Samsung online telemetry, disconnect the TV from the public internet and use an HDMI-connected trusted media device or local resources for entertainment. A native TV web app that needs a hosted AI service still needs a narrowly permitted network path.
- Router DNS filters can block some known ad/tracker hostnames but are imperfect: hardcoded DNS, encrypted DNS, shared domains, endpoint changes, and system traffic can bypass or break things.
- No port forwarding to 26101 (SDB), 8765 (local bridge), or the gateway. Never expose the signing certificates or private keys. Avoid changes that would lock out the user.

## Layer 3: App behavior
- Keep Mojangels local-first, no analytics, ad networks or third-party scripts.
- Explicit opt-in pairing for AI chat; disclose that typed prompts are sent to the selected AI provider.
- Keep API keys on the gateway, not the TV, and minimize/redact logs.
- Retain working Samsung firmware for inputs, display and remote support.
- Do not auto-launch, auto-modify settings, or treat the UI prototype as a system launcher replacement.

## Deployment status
Plan only. No router rules, privacy toggles, or firmware settings have been changed remotely. Mojangels v0.2 still requires local build, signing and installation. Preserve v0.1 until v0.2 is verified.

## Source references checked Oct 30, 2026
Samsung ACR feature: https://www.samsung.com/us/support/answer/ANS10010616/
Consumer Reports smart TV privacy settings: https://www.consumerreports.org/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/
Samsung Smart TV advertising privacy: https://policy.samsungrs.com/
