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
    const { testOutputPath, name } = JSON.parse(pkgPath);
    const testPath = join(workspace, testOutputPath);
    const {size} = statSync(testPath);
    console.log(`${name}: ${fmt.format(size)} bytes in ${testOutputPath}`);
    rows.push(`| ${name.replace(/^consumer-/, "")} | ${fmt.format(size)} bytes | ${testOutputPath} |`)
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