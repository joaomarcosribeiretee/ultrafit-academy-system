const express = require('express');
const cors = require('cors');
const app = express();

// Importa os arquivos de rotas
const alunosRoutes = require('./routes/alunos2');
const treinosRoutes = require('./routes/treinos');
const montarTreinoRoutes = require('./routes/MontarTreino');

app.use(cors());
app.use(express.json());

// Rota inicial apenas para teste
app.get('/', (req, res) => {
  res.send('API ULTRAFIT funcionando!');
});

// Usa as rotas
app.use('/api/alunos', alunosRoutes);
app.use('/api/treinos', treinosRoutes);
app.use('/api/montar-treino', montarTreinoRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
