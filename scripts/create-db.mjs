#!/usr/bin/env node
/**
 * Crée la base de données monkey_run si elle n'existe pas.
 * Nécessite PostgreSQL installé et démarré, et DATABASE_URL dans .env (ou en env).
 * Usage: node scripts/create-db.mjs   ou   npm run db:create
 */
import "dotenv/config";
import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Erreur: DATABASE_URL manquante. Définissez-la dans .env");
  process.exit(1);
}

// Se connecter au serveur PostgreSQL (base "postgres" par défaut)
const url = new URL(DATABASE_URL);
const dbName = url.pathname.slice(1).split("?")[0] || "monkey_run";
url.pathname = "/postgres";

const client = new pg.Client({
  connectionString: url.toString(),
});

async function main() {
  try {
    await client.connect();
    const res = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    if (res.rows.length > 0) {
      console.log(`La base "${dbName}" existe déjà.`);
      return;
    }
    await client.query(`CREATE DATABASE ${client.escapeIdentifier(dbName)}`);
    console.log(`Base "${dbName}" créée avec succès.`);
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      console.error(
        "Impossible de joindre PostgreSQL sur localhost:5432. Vérifiez que le service est démarré."
      );
    } else {
      console.error(err.message);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
