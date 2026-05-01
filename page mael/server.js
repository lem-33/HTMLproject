const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.static('.'));

// 🔍 mods
app.get('/mods', (req, res) => {
  const q = req.query.q || "";

  db.all(
    `SELECT * FROM mods WHERE name LIKE ? LIMIT 100`,
    [`%${q}%`],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

// 🔍 modpacks
app.get('/modpacks', (req, res) => {
  const q = req.query.q || "";

  db.all(
    `SELECT * FROM modpacks WHERE name LIKE ? LIMIT 100`,
    [`%${q}%`],
    (err, rows) => {
      if (err) return res.status(500).send(err);
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Serveur démarré : http://localhost:3000");
});