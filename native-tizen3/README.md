# Mojangels AI TV — native Tizen 3.0 test build

Status: **v0.1 was signed, installed and launched successfully on the Samsung TV on 2026-10-30. v0.2 changes are committed to GitHub but have NOT been rebuilt, installed or tested.** TizenBrew remains a separate working app.

## Target
- Samsung UN50M5300, Tizen TV 3.0
- SDB address: `192.168.1.72:26101`, verified as `device`
- Local signing profile: `Mojangels-Samsung-TV` (never commit or upload .p12 files, passwords, or private keys)
- This project is a **prototype with a new, untested chat UI and gateway code**, not yet a live AI assistant. Real OpenAI conversations require a separate authenticated server-side component, not a public API key in TV JavaScript.

## Installation using the existing VS Code Tizen Extension
1. Download this branch using GitHub's **Code > Download ZIP**, extract it, and choose **File > Open Folder** in VS Code. Open the `native-tizen3` subfolder (the directory containing `config.xml` and `index.html`).
2. On Tizen's left sidebar confirm **Device: UN50M5300** and **Certificate: Mojangels-Samsung-TV** are active. If the project isn't recognized, create a **TV Web Application** through **Create Project**, targeting Tizen 3.0, then copy the HTML from this folder into the generated project, using the generated app ID/config.xml instead of replacing its generated IDs.
3. Choose **Build Project**. The Tizen extension may prompt for the certificate passwords on your own laptop. The expected output is a **signed .wgt**. Don't upload the signed credentials to GitHub.
4. Choose **Run Project** with the TV selected. On the established TV the older VS Code Tizen extension launched using the wrong SDB syntax even after successful install. Once the install log says `install completed`, launch from PowerShell using `& "$HOME\.tizen-extension-platform\server\sdktools\data\tools\sdb.exe" -s 192.168.1.72:26101 shell 0 was_execute Mojangel01.native-tizen3`. This is a local laptop command, not something ChatGPT can execute remotely. Check arrows, OK, Return and HOME when convenient.
5. Keep the already working TizenBrew installed. **Do not** flash firmware, root the TV, remap the physical Home button, or uninstall system applications.

## Emergency fallback
If the native project fails to build/install, use the already installed TizenBrew and `hello-test.html` as the known-working fallback. Revert the TV developer Host PC IP to `127.0.0.1` after local SDK testing only if required for TizenBrew, then restart the TV.

## Developer notes
- Manifest application ID now matches the ID reported by the successful TV installer: `Mojangel01.native-tizen3`. If the SDK rewrites metadata, trust the actual installed app ID shown in logs.
- `config.xml` is rooted with `widget`; `tizen:profile` is `tv` and `required_version` is `3.0`.
- The client uses local HTML/CSS/JS with internet privilege for a future **HTTPS-only paired gateway**. The gateway in `gateway/` is source only and must be hosted and configured separately. Do not embed OpenAI keys in the TV app.
- The GitHub branch exists to isolate unfinished native work from working TizenBrew.
