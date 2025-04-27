const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota GET (listar alunos já existe)

// Rota POST (cadastrar novo aluno)
router.post('/', (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email } = req.body;

  const sql = `
    INSERT INTO alunos (nome, cpf, data_nascimento, telefone, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, cpf, data_nascimento, telefone, email], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar aluno:', err);
      return res.status(500).send('Erro ao cadastrar aluno');
    }
    res.status(201).send('Aluno cadastrado com sucesso!');
  });
});

module.exports = router;
