const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/treinos
router.get('/', (req, res) => {
  db.query('SELECT treino_id, nome FROM treinos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos:', err);
      return res.status(500).send('Erro ao buscar treinos');
    }
    res.json(results);
  });
});

module.exports = router;
