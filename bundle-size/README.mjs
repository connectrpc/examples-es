import { readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

injectResults("README.md", getResultsTable());

function getResultsTable() {
  const rows = [
    `| Name | Size | Artifact |`,
    `|------|-----:|----------|`,
  ];
  const { workspaces } = JSON.parse(readFileSync("package.json", "utf-8"));
  const fmt = new Intl.NumberFormat("en-US", {});
  for (const workspace of workspaces) {
    const pkgPath = readFileSync(join(workspace, "package.json"), "utf-8");
    const { testOutputPaths, name } = JSON.parse(pkgPath);
    for (const [type, path] of Object.entries(testOutputPaths)) {
      const testPath = join(workspace, path);
      const {size} = statSync(testPath);
      console.log(`${name} (${type}): ${fmt.format(size)} bytes in ${path}`);
      rows.push(`| ${name.replace(/^consumer-/, "")} (${type}) | ${fmt.format(size)} bytes | ${path} |`)
    }
  }
  return ["", ...rows, ""].join("\n");
}

function injectResults(filePath, content) {
  const cStart = "<!--- RESULTS-START -->";
  const cEnd = "<!--- RESULTS-END -->";
  const fileContent = readFileSync(filePath, "utf-8");
  const iStart = fileContent.indexOf(cStart);
  const iEnd = fileContent.indexOf(cEnd);
  if (iStart < 0 || iEnd < 0) throw "missing comment annotations";
  const head = fileContent.substring(0, iStart + cStart.length);
  const foot = fileContent.substring(iEnd);
  writeFileSync(filePath, head + content + foot);
}
