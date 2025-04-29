const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Rota para obter os grupos musculares
router.get('/grupos-musculares', (req, res) => {
  db.query('SELECT nome FROM grupos_musculares', (err, results) => {
    if (err) {
      console.error('Erro ao buscar grupos musculares:', err);
      return res.status(500).send('Erro ao buscar grupos musculares');
    }
    const grupos = results.map(result => result.nome);  // Retorna apenas o nome dos grupos musculares
    res.json(grupos);
  });
});

// Rota para cadastrar um novo treino
router.post('/', (req, res) => {
  const { nome, descricao, professor, gruposMusculares } = req.body;

  if (!nome || !professor || gruposMusculares.length === 0) {
    return res.status(400).json({ message: 'Dados obrigatórios faltando' });
  }

  //  Inserir o treino
  db.query(
    'INSERT INTO treinos (nome, descricao, professor) VALUES (?, ?, ?)',
    [nome, descricao, professor],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir treino:', err);
        return res.status(500).send('Erro ao cadastrar treino');
      }

      const treinoId = result.insertId;

      //  Buscar os IDs dos grupos musculares pelo nome
      const placeholders = gruposMusculares.map(() => '?').join(',');
      db.query(
        `SELECT grupo_muscular_id FROM grupos_musculares WHERE nome IN (${placeholders})`,
        gruposMusculares,
        (err2, grupoResults) => {
          if (err2) {
            console.error('Erro ao buscar IDs dos grupos musculares:', err2);
            return res.status(500).send('Erro ao associar grupos musculares');
          }

          //  Inserir na tabela de junção (treinos_grupos)
          const values = grupoResults.map(g => [treinoId, g.grupo_muscular_id]);

          db.query(
            'INSERT INTO treinos_grupos (treino_id, grupo_muscular_id) VALUES ?',
            [values],
            (err3) => {
              if (err3) {
                console.error('Erro ao associar grupos ao treino:', err3);
                return res.status(500).send('Erro ao cadastrar grupos do treino');
              }
              res.status(201).json({ message: 'Treino cadastrado com sucesso!' });
            }
          );
        }
      );
    }
  );
});

module.exports = router;
