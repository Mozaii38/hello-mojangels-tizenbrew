# Hello TV Test for TizenBrew

A tiny test application module for Samsung Tizen 3.0. This ZIP is **source code**, not a WGT installer. It must be hosted as a TizenBrew module (e.g., in a public GitHub repository using TizenBrew's Add GitHub module option) before it can launch on the TV.

## Files
- `package.json`: TizenBrew module metadata.
- `app/index.html`: simple compatibility test UI.

## How to try it
1. On your Windows laptop, unzip the archive.
2. Upload the contents (not the enclosing folder) to the root of a new **public** GitHub repository you control. Ensure `package.json` is at the repository root.
3. On the TV, open TizenBrew's **Module Manager**, then **Add GitHub module** (if available in your version).
4. Enter `YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`, then confirm. Return to TizenBrew home and launch **Hello TV Test**.
5. Press OK/Enter with the remote. The status should say `Success! Remote OK button works.`

This is a compatibility test only. It doesn't access ChatGPT or control firmware. If the module doesn't load, stop and report the exact error. Avoid changing firmware or installing untrusted code.
