import { direct } from "./direct.js";
import { intermediary } from "intermediary";

for (const name of "abcde".split("") as (keyof typeof direct)[]) {
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
    console.error(`${name} FAIL`)
  }
}
