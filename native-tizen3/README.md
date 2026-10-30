# Mojangels AI TV — native Tizen 3.0 test build

Status: **source prepared; signed WGT not yet built or installed**. The prior Hello TV Test runs inside TizenBrew; this is a separate experiment and must not overwrite it.

## Target
- Samsung UN50M5300, Tizen TV 3.0
- SDB address: `192.168.1.72:26101`, verified as `device`
- Local signing profile: `Mojangels-Samsung-TV` (never commit or upload .p12 files, passwords, or private keys)
- This application is a **prototype dashboard**, not yet a live AI assistant. Real OpenAI conversations require a separate authenticated server-side component, not a public API key in TV JavaScript.

## Installation using the existing VS Code Tizen Extension
1. Download this branch using GitHub's **Code > Download ZIP**, extract it, and choose **File > Open Folder** in VS Code. Open the `native-tizen3` subfolder (the directory containing `config.xml` and `index.html`).
2. On Tizen's left sidebar confirm **Device: UN50M5300** and **Certificate: Mojangels-Samsung-TV** are active. If the project isn't recognized, create a **TV Web Application** through **Create Project**, targeting Tizen 3.0, then copy the HTML from this folder into the generated project, using the generated app ID/config.xml instead of replacing its generated IDs.
3. Choose **Build Project**. The Tizen extension may prompt for the certificate passwords on your own laptop. The expected output is a **signed .wgt**. Don't upload the signed credentials to GitHub.
4. Choose **Run Project** with the TV selected. Confirm installation and test directional arrows, OK, Return, and that the Home button still returns to Smart Hub. Report all build and launch errors before changing any TV settings.
5. Keep the already working TizenBrew installed. **Do not** flash firmware, root the TV, remap the physical Home button, or uninstall system applications.

## Emergency fallback
If the native project fails to build/install, use the already installed TizenBrew and `hello-test.html` as the known-working fallback. Revert the TV developer Host PC IP to `127.0.0.1` after local SDK testing only if required for TizenBrew, then restart the TV.

## Developer notes
- Manifest application ID and package ID here are provisional. Use SDK-generated IDs if your installed extension rejects them.
- `config.xml` is rooted with `widget`; `tizen:profile` is `tv` and `required_version` is `3.0`.
- The app uses local HTML/CSS/JS, no dependencies or internet privileges.
- The GitHub branch exists to isolate unfinished native work from working TizenBrew.
