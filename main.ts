import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dest = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`Source entry image not found: ${source}`);
}
mkdirSync(outDir, { recursive: true });

copyFileSync(source, dest);

const copiedBytes = statSync(dest).size;
if (copiedBytes !== statSync(source).size) {
  throw new Error(
    `Copy size mismatch: source ${statSync(source).size} bytes, dest ${copiedBytes} bytes`,
  );
}
console.log(`Wrote ${dest} (${copiedBytes} bytes)`);
