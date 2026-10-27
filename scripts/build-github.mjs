import { cp, mkdir, readdir, readFile, rm, writeFile, stat } from "node:fs/promises";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { execSync } from "node:child_process";

console.log("==> 1. Cleaning out folder...");
const outDir = "out";
if (existsSync(outDir)) {
  try {
    for (const file of readdirSync(outDir)) {
      rmSync(join(outDir, file), { recursive: true, force: true });
    }
  } catch (err) {
    console.warn("Notice while cleaning out folder:", err.message);
  }
} else {
  await mkdir(outDir, { recursive: true });
}

console.log("==> 2. Running Next.js build...");
execSync("npx next build", {
  stdio: "inherit",
  env: { ...process.env, GITHUB_ACTIONS: "false" }
});

console.log("==> 3. Copying public assets to out...");
await cp("public", outDir, { recursive: true });

console.log("==> 4. Copying Next.js static bundles to out/_next/static...");
const nextStatic = join(".next", "static");
const outNextStatic = join(outDir, "_next", "static");
await mkdir(dirname(outNextStatic), { recursive: true });
await cp(nextStatic, outNextStatic, { recursive: true });

console.log("==> 5. Exporting prerendered HTML pages to out...");
const serverApp = join(".next", "server", "app");

async function copyHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await copyHtmlFiles(fullPath);
    } else if (entry.name.endsWith(".html")) {
      const relPath = relative(serverApp, fullPath);
      const destPath = join(outDir, relPath);
      await mkdir(dirname(destPath), { recursive: true });
      await cp(fullPath, destPath);
    } else if (entry.name.endsWith(".txt") || entry.name.endsWith(".rsc") || entry.name.endsWith(".json")) {
      const relPath = relative(serverApp, fullPath);
      const destPath = join(outDir, relPath);
      await mkdir(dirname(destPath), { recursive: true });
      await cp(fullPath, destPath);
    }
  }
}

if (existsSync(serverApp)) {
  await copyHtmlFiles(serverApp);
}

// Ensure 404.html exists from _not-found.html if present
if (existsSync(join(outDir, "_not-found.html")) && !existsSync(join(outDir, "404.html"))) {
  await cp(join(outDir, "_not-found.html"), join(outDir, "404.html"));
}

console.log("==> 6. Copying legacy pages and .nojekyll...");
const pairs = [
  ["public/clients-policy/udrive-privacy.html", "out/clients-policy/udrive-privacy.html"],
  ["public/clients-policy/utrack-privacy.html", "out/clients-policy/utrack-privacy.html"],
  ["public/support/udrive-support.html", "out/support/udrive-support.html"]
];

for (const [source, destination] of pairs) {
  if (existsSync(source)) {
    await mkdir(dirname(destination), { recursive: true });
    await cp(source, destination);
  }
}

await writeFile(join(outDir, ".nojekyll"), "# Disable Jekyll for GitHub Pages\n");

console.log("==> 7. Validating legacy pages in out...");
execSync("node scripts/validate-legacy-pages.mjs out", { stdio: "inherit" });

console.log("✅ GitHub Pages build successfully generated in out/ folder!");
