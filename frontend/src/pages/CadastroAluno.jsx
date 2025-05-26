import { useState } from 'react';
import axios from 'axios'; // IMPORTANTE adicionar essa linha
import '../styles/CadastroAluno.css';

function CadastroAluno() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '', 
    telefone: '',
    email: '',
    data_matricula: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envia para o backend
    axios.post('http://localhost:3001/api/alunos', formData)
      .then(response => {
        console.log(response.data);
        alert('Aluno cadastrado com sucesso!');
        // Limpa o formulário
        setFormData({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          data_matricula: ''
        });
      })
      .catch(error => {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno. Verifique os dados.');
      });
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro de Aluno</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Aluno"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data_matricula"
          value={formData.data_matricula}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar Aluno</button>
      </form>
    </div>
  );
}

export default CadastroAluno;
