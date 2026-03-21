import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./journal.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS journal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      text TEXT NOT NULL,
      ambience TEXT,
      emotion TEXT,
      keywords TEXT,
      summary TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
