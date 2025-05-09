import { useState} from 'react';
import axios from 'axios';
import '../styles/CadastrarTreino.css';

function CadastrarTreino() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    professor: '',
  });



 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Envia os dados do formulário para o backend para criar o treino
    axios.post('http://localhost:3001/api/treinos', formData)
      .then(response => {
        alert(response.data.message);  // Exibe a mensagem de sucesso retornada pelo backend
        // Limpa o formulário após sucesso
        setFormData({
          nome: '',
          descricao: '',
          professor: '',
        });
      })
      .catch(error => {
        console.error('Erro ao cadastrar treino:', error);
        alert('Erro ao cadastrar treino');
      });
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
