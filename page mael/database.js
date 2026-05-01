const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mods.db');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS mods (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      downloads INTEGER,
      slug TEXT,
      icon TEXT,
      categories TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS modpacks (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      downloads INTEGER,
      slug TEXT,
      icon TEXT,
      categories TEXT
    )
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_mods_name ON mods(name)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_modpacks_name ON modpacks(name)`);

});

module.exports = db;