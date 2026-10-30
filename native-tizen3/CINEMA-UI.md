# Mojangels Cinema UI v0.4 — native Samsung TV

The Apple TV-inspired **cinematic home interface** is implemented in `index.html` on this branch. It is an original design, not a copy of Apple graphics, apps or trademarks.

## Design
- Dark midnight palette and subtle gradients
- Large feature hero with atmospheric CSS-only orb art (no external assets or requests)
- Four compact application tiles: Mojangels AI, Remote Studio, Voice Experience and TV Experience
- TV remote D-pad focus highlight and Return behavior
- Native HTML, CSS and ES5-compatible JavaScript without build dependencies or analytics
- Existing AI Chat pairing and gateway source are preserved

## Controls
- LEFT/RIGHT: move horizontally between apps in the rail
- UP: move focus to the hero Chat button
- DOWN: move focus to the app rail
- OK/Enter: open the selected item
- Return: go to dashboard from details or AI Chat
- HOME: owned by Samsung TV firmware; no override attempted

## Accurate feature status
- Mojangels AI: pairing and chat UI exist, but AI gateway deployment, API setup and actual remote connection remain unfinished
- Remote Studio: basic navigation demonstration
- Voice Experience: placeholder, microphone support unverified
- TV Experience: placeholder, no privileged controls
- Mojangels v0.1 was previously installed and launched successfully on UN50M5300
- v0.4 code has been committed to GitHub, but **not compiled, signed, installed or hardware-tested** on the actual TV
- Styling and focus behavior must be verified with the actual 2017 Tizen 3.0 Web runtime before claiming full compatibility

## Privacy
No analytics scripts, ads, cloud artwork, trackers or third-party libraries are loaded by this app. A network request to a configured HTTPS AI gateway occurs only through voluntary pairing and chat. Samsung firmware privacy is a separate issue documented in PRIVACY-FIRST.md and NETWORK-PRIVACY-POLICY.md.

## Deployment note
After the user chooses to deploy, download the branch and open `native-tizen3` in the existing VS Code Tizen extension. Keep signing credentials local. On this TV, the extension previously installed successfully but failed to launch with its default `execute` command. The tested manual launch command used SDB `shell 0 was_execute Mojangel01.native-tizen3`. Do not delete the working installed version until the new one has been verified.
