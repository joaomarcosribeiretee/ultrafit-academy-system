// routes/vincularTreino.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para inserir vínculo entre aluno e treino
router.post('/', (req, res) => {
  const { aluno_id, treino_id, data_inicio, data_fim } = req.body;

  if (!aluno_id || !treino_id || !data_inicio || !data_fim) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const query = `
    INSERT INTO alunos_treinos (aluno_id, treino_id, data_inicio, data_fim)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [aluno_id, treino_id, data_inicio, data_fim], (err, result) => {
    if (err) {
      console.error('Erro ao vincular treino ao aluno:', err);
      return res.status(500).json({ message: 'Erro ao vincular treino' });
    }

    return res.status(201).json({ message: 'Treino vinculado com sucesso!', id: result.insertId });
  });
});

// ✅ Rota para listar vínculos com nomes e datas formatadas
router.get('/listar', (req, res) => {
  const query = `
    SELECT 
      at.aluno_id,
      a.nome AS aluno,
      at.treino_id,
      t.nome AS treino,
      DATE_FORMAT(at.data_inicio, '%d/%m/%Y') AS data_inicio,
      DATE_FORMAT(at.data_fim, '%d/%m/%Y') AS data_fim
    FROM 
      alunos_treinos at
    INNER JOIN 
      alunos a ON at.aluno_id = a.aluno_id
    INNER JOIN 
      treinos t ON at.treino_id = t.treino_id
    ORDER BY 
      at.aluno_id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar vínculos:', err);
      return res.status(500).json({ message: 'Erro ao buscar vínculos' });
    }

    res.json(results);
  });
});

module.exports = router;
