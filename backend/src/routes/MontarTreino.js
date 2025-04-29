const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para buscar todos os treinos
router.get('/treinos', (req, res) => {
  db.query('SELECT treino_id, nome FROM treinos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos:', err);
      return res.status(500).json({ message: 'Erro ao buscar treinos' });
    }
    console.log('Treinos encontrados:', results);
    res.json(results);
  });
});

// Rota para buscar todos os grupos musculares
router.get('/grupos-musculares', (req, res) => {
  db.query('SELECT grupo_muscular_id, nome FROM grupos_musculares', (err, results) => {
    if (err) {
      console.error('Erro ao buscar grupos musculares:', err);
      return res.status(500).json({ message: 'Erro ao buscar grupos musculares' });
    }
    console.log('Grupos musculares encontrados:', results);
    res.json(results);
  });
});

// Rota para buscar exercícios de um grupo muscular específico
router.get('/exercicios/grupo/:id', (req, res) => {
  const grupoId = req.params.id;
  console.log(`Buscando exercícios para grupo muscular ID: ${grupoId}`);
  
  db.query(
    'SELECT exercicio_id, nome, grupo_muscular_id FROM exercicios WHERE grupo_muscular_id = ?',
    [grupoId],
    (err, results) => {
      if (err) {
        console.error('Erro ao buscar exercícios:', err);
        return res.status(500).json({ message: 'Erro ao buscar exercícios' });
      }
      console.log(`Exercícios encontrados para grupo ${grupoId}:`, results);
      res.json(results);
    }
  );
});

// Rota para salvar treino montado
router.post('/salvar', (req, res) => {
  const { treino_id, exercicios } = req.body;
  
  if (!treino_id || !exercicios || !Array.isArray(exercicios) || exercicios.length === 0) {
    return res.status(400).json({ message: 'Dados inválidos para salvar o treino' });
  }

  console.log(`Salvando treino ID: ${treino_id} com ${exercicios.length} exercícios`);

 

      // Preparar os valores para inserção em massa
      const values = exercicios.map(ex => [
        treino_id,
        ex.exercicio_id,
        ex.series,
        ex.repeticoes,
        ex.carga || null,
        ex.observacoes || null
      ]);

      // Inserir todos os exercícios de uma vez
      const query = 'INSERT INTO treinos_exercicios (treino_id, exercicio_id, series, repeticoes, carga_kg, observacoes) VALUES ?';
      
      db.query(query, [values], (err, insertResult) => {
        if (err) {
          console.error('Erro ao inserir exercícios no treino:', err);
          return res.status(500).json({ message: 'Erro ao salvar exercícios do treino' });
        }

        console.log(`Exercícios inseridos: ${insertResult.affectedRows}`);
        res.status(200).json({ 
          message: 'Treino salvo com sucesso',
          treino_id: treino_id,
          exercicios_inseridos: insertResult.affectedRows
        });
      });
    }
  );


module.exports = router;