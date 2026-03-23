const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./articles.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    date TEXT NOT NULL,
    categorie TEXT,
    tags TEXT
  )`);
});

module.exports = db;