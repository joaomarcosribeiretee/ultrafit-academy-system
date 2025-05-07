// routes/vincularTreino.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { aluno_id, treino_id, data_inicio, data_fim } = req.body;

  if (!aluno_id || !treino_id) {
    return res.status(400).json({ message: 'Aluno e treino são obrigatórios.' });
  }

  const query = `
    INSERT INTO alunos_treinos (aluno_id, treino_id, data_inicio, data_fim)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [aluno_id, treino_id, data_inicio || new Date(), data_fim || null], (err, result) => {
    if (err) {
      console.error('Erro ao vincular treino ao aluno:', err);
      return res.status(500).json({ message: 'Erro ao vincular treino' });
    }

    return res.status(201).json({ message: 'Treino vinculado com sucesso!', id: result.insertId });
  });
});

module.exports = router;
