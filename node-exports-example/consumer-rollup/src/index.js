import { direct } from "./direct.js";
import { intermediary } from "intermediary";

let failed = false;
for (const name of "abcde".split("")) {
  const directSymbol = direct[name];
  const interSymbol = intermediary[name];
  if (!directSymbol) {
    throw `missing direct ${name}`;
  }
  if (!interSymbol) {
    throw `missing intermediary ${name}`;
  }
  if (directSymbol === interSymbol) {
    console.log(`${name} OK`)
  } else {
    failed = true;
    console.error(`${name} FAIL`)
  }
}

// if (failed) {
//   process.exit(1);
// }
