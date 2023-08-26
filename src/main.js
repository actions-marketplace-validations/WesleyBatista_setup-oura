import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";

main().catch((err) => {
  core.setFailed(err.message);
});

async function main() {
  let version = core.getInput("version", {
    required: true,
    trimWhitespace: true,
  });

  core.startGroup(`Installing Oura ${version}`);

  const arch = process.arch === "x64" ? "amd64" : process.arch;

  try {
    let cachedPath = tc.find("oura", version);

    if (!cachedPath) {
      const baseDownloadUrl =
        "https://github.com/txpipe/oura/releases/download";

      const tarPath = await tc.downloadTool(
        `${baseDownloadUrl}/${version}/oura-x86_64-unknown-linux-gnu.tar.gz`,
      );

      const extractPath = await tc.extractTar(tarPath, undefined, ["xzC"]);

      cachedPath = await tc.cacheDir(extractPath, "oura", version);
    }

    core.addPath(cachedPath);

    core.exportVariable("INSTALL_DIR_FOR_OURA", cachedPath);
  } catch (err) {
    core.error(
      `Oura install failed for platform '${process.platform}' on arch '${arch}'`,
    );

    core.error(`${err}\n${err.stack}`);

    throw new Error(`Could not install Oura ${version}`);
  }

  core.info(`Installed Oura ${version} (arch '${arch}')`);

  core.setOutput("version", version);

  core.endGroup();
}
