const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para cadastrar um novo treino
router.post('/', (req, res) => {
  const { nome, descricao, professor } = req.body;

  if (!nome || !professor) {
    return res.status(400).json({ message: 'Nome e professor são obrigatórios.' });
  }

  const query = 'INSERT INTO treinos (nome, descricao, professor) VALUES (?, ?, ?)';
  db.query(query, [nome, descricao, professor], (err, result) => {
    if (err) {
      console.error('Erro ao inserir treino:', err);
      return res.status(500).json({ message: 'Erro ao cadastrar treino' });
    }

    return res.status(200).json({ message: 'Treino cadastrado com sucesso!', treinoId: result.insertId });
  });
});

module.exports = router;
