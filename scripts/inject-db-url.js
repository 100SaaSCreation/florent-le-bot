const fs = require("fs");
const uri = process.argv[2];
if (!uri) {
  console.error("Usage: node inject-db-url.js <DATABASE_URL>");
  process.exit(1);
}
let content = "";
try {
  content = fs.readFileSync(".env", "utf8");
} catch (_) {}
const lines = content.split("\n").filter((l) => !l.startsWith("DATABASE_URL="));
lines.push('DATABASE_URL="' + uri.replace(/"/g, '\\"') + '"');
fs.writeFileSync(".env", lines.join("\n").trim() + "\n");
console.log("DATABASE_URL injected into .env");
