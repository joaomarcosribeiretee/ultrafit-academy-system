const express = require('express');
const router = express.Router();
const db = require('../config/db');





// Rota POST (cadastrar novo aluno)
router.post('/', (req, res) => {
  const { nome, cpf, telefone, email, data_matricula } = req.body;

  const sql = `
    INSERT INTO alunos (nome, cpf, telefone, email, data_matricula)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, cpf, telefone, email, data_matricula], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar aluno:', err);
      return res.status(500).send('Erro ao cadastrar aluno');
    }
    res.status(201).send('Aluno cadastrado com sucesso!');
  });
});


// Rota GET para listar todos os alunos
router.get('/', (req, res) => {
  const sql = 'SELECT aluno_id, nome FROM alunos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar alunos:', err);
      return res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
    res.json(results);
  });
});




// POST /api/alunos/vincular-treino
router.post('/vincular-treino', (req, res) => {
  const { aluno_id, treino_id } = req.body;

  if (!aluno_id || !treino_id) {
    return res.status(400).json({ message: 'Aluno ou treino não fornecido' });
  }

  const sql = 'INSERT INTO alunos_treinos (aluno_id, treino_id) VALUES (?, ?)';
  db.query(sql, [aluno_id, treino_id], (err, result) => {
    if (err) {
      console.error('Erro ao vincular treino:', err);
      return res.status(500).json({ message: 'Erro ao vincular treino' });
    }
    res.status(200).json({ message: 'Treino vinculado com sucesso!' });
  });
});


// GET para listar os vínculos
router.get('/vinculos', (req, res) => {
  const sql = `
    SELECT a.nome AS aluno, t.nome AS treino
    FROM alunos_treinos at
    JOIN alunos a ON a.aluno_id = at.aluno_id
    JOIN treinos t ON t.treino_id = at.treino_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar vínculos:', err);
      return res.status(500).json({ message: 'Erro ao buscar vínculos' });
    }
    res.json(results);
  });
});

module.exports = router;
