import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const pairs = [
  ["public/clients-policy/udrive-privacy.html", "out/clients-policy/udrive-privacy.html"],
  ["public/clients-policy/utrack-privacy.html", "out/clients-policy/utrack-privacy.html"],
  ["public/support/udrive-support.html", "out/support/udrive-support.html"]
];

for (const [source, destination] of pairs) {
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
  console.log(`Copied ${join(source)} -> ${join(destination)}`);
}
