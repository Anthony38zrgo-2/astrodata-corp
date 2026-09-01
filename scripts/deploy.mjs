import { execSync } from "node:child_process";

const DIST_DIR = "dist";

function getFullRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY;
  }
  try {
    const remote = execSync("git config --get remote.origin.url")
      .toString()
      .trim();
    const match = remote.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
    return match ? `${match[1]}/${match[2]}` : null;
  } catch {
    return null;
  }
}

const fullRepo = getFullRepo();
const repoName = fullRepo ? fullRepo.split("/")[1] : "astrodata-corp";
const repo = fullRepo || `Anthony38zrgo-2/${repoName}`;

if (!fullRepo) {
  console.warn(
    `\nNo se pudo detectar el repositorio de GitHub. Se usará "${repo}" como base.`,
  );
}

console.log(`\nDeployando a GitHub Pages`);
console.log(`  Repositorio: ${repo}`);
console.log(`  Base:        /${repoName}/`);
console.log(`  Ramas:       gh-pages\n`);

const env = { ...process.env, GITHUB_REPOSITORY: repo };

console.log("=== 1/2 Construyendo para deployment ===");
execSync("npm run build:deployment", { stdio: "inherit", env, shell: true });

console.log(`\n=== 2/2 Publicando "${DIST_DIR}" en la rama gh-pages ===`);
const { publish } = await import("gh-pages");

await new Promise((resolve, reject) => {
  publish(
    DIST_DIR,
    { branch: "gh-pages", message: "Deploy: update sito" },
    (error) => (error ? reject(error) : resolve()),
  );
});

console.log("\n✔ Deploy completado.");
console.log(`URL: https://${repo.split("/")[0]}.github.io/${repoName}/\n`);
