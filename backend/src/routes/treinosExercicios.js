const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET - Buscar treinos montados (presentes na tabela treinos_exercicios)
router.get('/treinos-exercicios', (req, res) => {
  const query = `
    SELECT 
      t.treino_id,
      t.nome AS nome_treino,
      e.nome AS nome_exercicio,
      te.series,
      te.repeticoes,
      te.carga_kg,
      te.observacoes
    FROM treinos t
    JOIN treinos_exercicios te ON t.treino_id = te.treino_id
    JOIN exercicios e ON te.exercicio_id = e.exercicio_id
    ORDER BY t.treino_id, te.treino_exercicio_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos montados:', err);
      return res.status(500).json({ message: 'Erro ao buscar treinos montados' });
    }

    // Agrupar os dados por treino
    const treinosAgrupados = {};
    results.forEach(row => {
      if (!treinosAgrupados[row.treino_id]) {
        treinosAgrupados[row.treino_id] = {
          treino_id: row.treino_id,
          nome: row.nome_treino,
          exercicios: []
        };
      }

      treinosAgrupados[row.treino_id].exercicios.push({
        nome: row.nome_exercicio,
        series: row.series,
        repeticoes: row.repeticoes,
        carga_kg: row.carga_kg,
        observacoes: row.observacoes
      });
    });

    res.json(Object.values(treinosAgrupados));
  });
});

// DELETE - Remover completamente um treino (exercícios + metadados)
router.delete('/treinos-exercicios/:id', (req, res) => {
  const treinoId = req.params.id;

  // Primeiro, remove os exercícios associados
  db.query('DELETE FROM treinos_exercicios WHERE treino_id = ?', [treinoId], (err) => {
    if (err) {
      console.error('Erro ao remover exercícios do treino:', err);
      return res.status(500).json({ message: 'Erro ao remover exercícios do treino' });
    }

    // Depois, remove o próprio treino
    db.query('DELETE FROM treinos WHERE treino_id = ?', [treinoId], (err2) => {
      if (err2) {
        console.error('Erro ao remover treino:', err2);
        return res.status(500).json({ message: 'Erro ao remover o treino' });
      }

      res.status(200).json({ message: 'Treino e exercícios removidos com sucesso' });
    });
  });
});

module.exports = router;
