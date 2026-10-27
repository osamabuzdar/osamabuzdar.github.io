import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const src = "export_out";
const dest = "out";

if (!existsSync(dest)) {
  await mkdir(dest, { recursive: true });
}

if (existsSync(src)) {
  await cp(src, dest, { recursive: true, force: true });
  console.log(`Successfully synced build export: ${src} -> ${dest}`);
}
