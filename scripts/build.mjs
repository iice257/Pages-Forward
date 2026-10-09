// Assembles the deployable site into dist/:
//   /      landing page (three tabs)
//   /v1/   static storefront, copied as is (supabase/ and docs/ stay in the repo)
//   /v2/   Vite rebuild, built with VITE_STATIC=1 so it runs on demo data without its Express server
//   /v3/   Primordial Cosmic concept page and references
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const run = (cmd, cwd = root, env = {}) => execSync(cmd, { cwd, stdio: "inherit", env: { ...process.env, ...env } });

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "index.html"), join(dist, "index.html"));
for (const item of ["index.html", "purchases.html", "admin.html", "css", "js", "assets"]) {
  cpSync(join(root, "v1", item), join(dist, "v1", item), { recursive: true });
}
cpSync(join(root, "v3", "index.html"), join(dist, "v3", "index.html"));
cpSync(join(root, "v3", "reference"), join(dist, "v3", "reference"), { recursive: true });

const v2 = join(root, "v2");
if (!existsSync(join(v2, "node_modules"))) run("npm ci --no-audit --no-fund", v2);
run(`npx vite build --base /v2/ --outDir ${JSON.stringify(join(dist, "v2"))} --emptyOutDir`, v2, { VITE_STATIC: "1" });

console.log("\nBuilt dist/ with landing, v1, v2 and v3.");
