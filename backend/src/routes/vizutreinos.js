const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ajuste conforme seu arquivo de conexão

// 🔸 Buscar todos os treinos (para preencher o SELECT no frontend)
router.get('/', (req, res) => {
  const sql = 'SELECT treino_id, nome FROM treinos';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 🔸 Buscar dados completos de um treino (exercícios, descrição, professor...)
router.get('/:treinoId', (req, res) => {
  const treinoId = req.params.treinoId;

  const sql = `
    SELECT 
      t.treino_id,
      t.nome AS treino_nome,
      t.descricao AS treino_descricao,
      t.professor,
      e.exercicio_id,
      e.nome AS exercicio_nome,
      e.descricao AS exercicio_descricao,
      gm.nome AS grupo_muscular,
      te.series,
      te.repeticoes,
      te.carga_kg,
      te.observacoes
    FROM treinos t
    JOIN treinos_exercicios te ON t.treino_id = te.treino_id
    JOIN exercicios e ON te.exercicio_id = e.exercicio_id
    JOIN grupos_musculares gm ON e.grupo_muscular_id = gm.grupo_muscular_id
    WHERE t.treino_id = ?
  `;

  db.query(sql, [treinoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }

    const treino = {
      treino_id: results[0].treino_id,
      treino_nome: results[0].treino_nome,
      treino_descricao: results[0].treino_descricao,
      professor: results[0].professor,
      exercicios: results.map(row => ({
        exercicio_id: row.exercicio_id,
        nome: row.exercicio_nome,
        descricao: row.exercicio_descricao,
        grupo_muscular: row.grupo_muscular,
        series: row.series,
        repeticoes: row.repeticoes,
        carga_kg: row.carga_kg,
        observacoes: row.observacoes
      }))
    };

    res.json(treino);
  });
});

router.delete('/:treinoId', (req, res) => {
    const treinoId = req.params.treinoId;
  
    const sqlDeleteAlunosTreinos = 'DELETE FROM alunos_treinos WHERE treino_id = ?';
    const sqlDeleteTreinosExercicios = 'DELETE FROM treinos_exercicios WHERE treino_id = ?';
    const sqlDeleteTreino = 'DELETE FROM treinos WHERE treino_id = ?';
  
    db.query(sqlDeleteAlunosTreinos, [treinoId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
  
      db.query(sqlDeleteTreinosExercicios, [treinoId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
  
        db.query(sqlDeleteTreino, [treinoId], (err) => {
          if (err) return res.status(500).json({ error: err.message });
  
          res.json({ message: 'Treino removido com sucesso!' });
        });
      });
    });
  });
  

module.exports = router;
