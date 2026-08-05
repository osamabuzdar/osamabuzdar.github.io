import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || "public";
const requiredFiles = [
  "clients-policy/udrive-privacy.html",
  "clients-policy/utrack-privacy.html",
  "support/udrive-support.html"
];

const missing = requiredFiles.filter((file) => {
  const path = join(root, file);
  return !existsSync(path) || !statSync(path).isFile();
});

if (missing.length > 0) {
  console.error(`Legacy URL validation failed for ${root}:`);
  for (const file of missing) {
    console.error(`- Missing ${join(root, file)}`);
  }
  process.exit(1);
}

console.log(`Legacy URL validation passed for ${root}.`);
