import { useState } from 'react';
import '../styles/CadastrarTreino.css';

function CadastrarTreino() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    professor: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do treino:', formData);
    // Aqui depois vamos enviar para o backend
  };

  return (
    <div className="treino-container">
      <h1 className="treino-title">Cadastrar Novo Treino</h1>
      <form className="treino-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Treino"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição do Treino (opcional)"
          value={formData.descricao}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="professor"
          placeholder="Nome do Professor Responsável"
          value={formData.professor}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar Treino</button>
      </form>
    </div>
  );
}

export default CadastrarTreino;
