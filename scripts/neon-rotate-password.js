/**
 * Rotation du mot de passe Neon (rôle neondb_owner).
 * Usage: NEON_API_KEY=<key> node scripts/neon-rotate-password.js
 * Ou définir NEON_API_KEY dans .env (ne pas committer).
 */
require("dotenv").config({ path: ".env" });
const fs = require("fs");

const NEON_API_KEY = process.env.NEON_API_KEY;
const PROJECT_ID = process.env.NEON_PROJECT_ID || "snowy-glade-71111421";
const BRANCH_ID = process.env.NEON_BRANCH_ID || "br-frosty-sky-ag9f1drr";
const ROLE_NAME = "neondb_owner";
const HOST = "ep-delicate-leaf-agh7zell.c-2.eu-central-1.aws.neon.tech";
const DATABASE = "neondb";

async function main() {
  if (!NEON_API_KEY) {
    console.error(
      "NEON_API_KEY manquant. Définissez-le dans .env ou en variable d'environnement."
    );
    console.error(
      "Créez une clé dans Neon Console : Account settings > API keys"
    );
    process.exit(1);
  }

  const url = `https://api.neon.tech/v2/projects/${PROJECT_ID}/branches/${BRANCH_ID}/roles/${ROLE_NAME}/reset_password`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NEON_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const t = await res.text();
    console.error("Neon API error:", res.status, t);
    process.exit(1);
  }

  const data = await res.json();
  const newPassword = data.password || data.role?.password;
  if (!newPassword) {
    console.error("Réponse API sans mot de passe:", JSON.stringify(data));
    process.exit(1);
  }

  const connectionUri = `postgresql://${ROLE_NAME}:${encodeURIComponent(newPassword)}@${HOST}/${DATABASE}?sslmode=require`;

  let envContent = "";
  try {
    envContent = fs.readFileSync(".env", "utf8");
  } catch (_) {}
  const lines = envContent.split("\n").filter((l) => !l.startsWith("DATABASE_URL="));
  lines.push(`DATABASE_URL="${connectionUri}"`);
  fs.writeFileSync(".env", lines.join("\n").trim() + "\n");
  console.log("DATABASE_URL mise à jour dans .env (mot de passe Neon roté).");
  console.log("Exécutez: npx vercel env rm DATABASE_URL production && npx vercel env rm DATABASE_URL preview");
  console.log("Puis: (node -e \"require('dotenv').config({path:'.env'}); process.stdout.write((process.env.DATABASE_URL||'').trim());\") | npx vercel env add DATABASE_URL production");
  console.log("Et idem pour preview.");
}

main();
