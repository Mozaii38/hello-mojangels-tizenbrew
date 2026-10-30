# Privacy-first TV network policy — reversible deployment specification

**Not applied:** This file describes a policy to configure on a router that supports device-specific firewall rules. It is not an executable router configuration. We don't know the user's router make, its policy UI, or whether it supports per-device IPv6 firewall rules.

## Objective
Give Samsung UN50M5300 (currently observed at 192.168.1.72) as little third-party network access as possible while keeping the screen, HDMI inputs, local Mojangels app, developer connection and explicitly authorized AI chat usable.

## Recommended rollout (least disruptive first)
1. Reserve a stable IP for the TV on the router and identify it by device MAC from the router itself. Do **not** rely on the old IP if DHCP changed it.
2. Disable optional Samsung viewing-data/ACR and personalized advertising services using actual on-device Settings menus.
3. Baseline normal HDMI/antenna playback and available local services.
4. Create a device-specific internet *block* rule for the TV, but keep it disabled until a person at home can confirm a rollback path. Apply the rule to both IPv4 and IPv6. Keep local TV-to-laptop traffic allowed only for required ports and addresses.
5. If network access is needed by the eventual AI app, permit only a narrowly scoped TLS endpoint to the private paired gateway. This may require a router with hostname-aware rules or a trusted local proxy. Network egress restriction is not a substitute for API pairing.
6. Verify HDMI playback, TV remote, Mojangels app, and a way back into the router UI. Roll back the internet-block rule if unintended behavior occurs.

## Example policy (pseudocode — do NOT paste into a router)
Source: TV reservation / TV network segment.
- ALLOW TV -> approved local gateway : approved TLS port (only if gateway is deployed).
- ALLOW TV -> trusted local services necessary for current use (explicit list).
- DENY TV -> all public IPv4 internet destinations.
- DENY TV -> all public IPv6 internet destinations.
- DENY unsolicited internet -> TV.
- NEVER forward SDB TCP 26101, the localhost bridge 8765, or private gateway ports to the internet.
- Keep management access and the ability to disable this rule from a trusted device.
- Preserve DHCP/DNS only if needed for local LAN services; note that normal internet DNS service is unnecessary with a fully offline TV.

## Privacy caveats
- Blocking public internet egress reduces remote telemetry and remote ad downloads, but doesn't prove all data collection is absent. Offline usage data could be retained or transmitted if the rule is later lifted.
- Device-level DNS filters alone cannot guarantee complete blocking.
- The installed v0.1 Mojangels application continues to run locally; the not-yet-deployed v0.2 AI Chat will need a reachable authenticated gateway.
- Samsung operating-system components remain; this is containment, not firmware replacement.

## Explicit exclusions
No firmware flashing, rooting, uninstalling Samsung system packages, unauthorized system settings, automatic HOME remapping, router reset, Wi-Fi password collection, or disabling security updates without an informed decision.

## Status
**Design only.** No TV, router, DNS, firewall, or firmware settings were modified through ChatGPT.
