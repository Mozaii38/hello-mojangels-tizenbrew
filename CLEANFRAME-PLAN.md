# CleanFrame adaptation assessment — Samsung UN50M5300

## Verified local baseline
- Samsung UN50M5300, Tizen 3.0
- TizenBrew 2.0.5 running on the TV
- The `Hello TV Test` module rendered successfully and the OK button worked
- `hello-test.html` preserves the known-working example
- `index.html` hosts Mojangels AI TV prototype
- The user's Windows PC was reachable to the TV's development port 26101 during testing; this **does not** establish remote access from a hosted ChatGPT session.

## CleanFrame upstream
Source: https://github.com/nthnclrk/CleanFrame
- Tested by its author on Samsung The Frame LS03D, firmware 2130.0, Tizen 9.0.
- Author explicitly makes **no claim of compatibility with other TVs**.
- Designed as a Tizen app with generated image assets, a browser preview, and Samsung SDK signing/installation.
- Browser preview instructions (on a locally configured Windows PC): `git clone ...`, `npm ci`, `npm run dev:public` with Node 22.13+ or 24+ and Python 3.10+.
- CleanFrame source and documentation are MIT-licensed, but included visual assets have separate licenses. Do not copy artwork or third-party branding into this repository without checking rights.

## Safe staged roadmap
1. Preserve the existing TizenBrew module and never replace Samsung firmware.
2. Build a **separate, lightweight CleanFrame-inspired layout** with plain HTML/CSS/ES5 JavaScript, distinct from the upstream CleanFrame port. Test on a computer first.
3. Test arrow keys, OK, Return and font rendering on the Samsung TV; keep `hello-test.html` intact.
4. If attempting to port upstream CleanFrame itself, audit APIs/assets/permissions, obtain firmware build, and use Samsung's SDK and user-owned signing certificate. Test without binding the physical Home button.
5. Only after stable testing consider optional autolaunch inside TizenBrew. Do not change native HOME/startup hooks, root the TV, flash firmware, or disable protections as part of this stage.

## Capability boundaries
- ChatGPT API integration, voice assistant, app launching, input switching and volume are **not implemented** by this prototype.
- A hosted ChatGPT session cannot connect directly to private IP addresses `192.168.1.72` / `192.168.1.67`.
- Never put API keys in public GitHub source or directly in TV JavaScript.
