const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // ou o usuário que você configurou
  password: 'root',         // sua senha (ou vazio se não tiver)
  database: 'sistema_academia' // nome certinho do seu banco
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL!');
  }
});

module.exports = db;
