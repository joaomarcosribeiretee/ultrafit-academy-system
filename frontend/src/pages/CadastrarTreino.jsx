import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CadastrarTreino.css';

function CadastrarTreino() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    professor: '',
    gruposMusculares: []  // Armazena os grupos musculares selecionados
  });

  const [gruposDisponiveis, setGruposDisponiveis] = useState([]);

  // Buscar os grupos musculares do backend com Axios
  useEffect(() => {
    axios.get('http://localhost:3001/api/treinos/grupos-musculares')
      .then(response => {
        setGruposDisponiveis(response.data);  // Preenche a lista de grupos musculares disponíveis
      })
      .catch(error => {
        console.error('Erro ao buscar grupos musculares:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGruposChange = (e) => {
    const options = e.target.options;
    const selectedGroups = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGroups.push(options[i].value);  // Armazena os grupos musculares selecionados
      }
    }
    setFormData({ ...formData, gruposMusculares: selectedGroups });
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
          gruposMusculares: []
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

        <div className="grupos-musculares-container">
          <label htmlFor="gruposMusculares">Grupos Musculares:</label>
          <select
            id="gruposMusculares"
            name="gruposMusculares"
            multiple
            value={formData.gruposMusculares}
            onChange={handleGruposChange}
            className="grupos-musculares-select"
            required
          >
            {gruposDisponiveis.map((grupo) => (
              <option key={grupo} value={grupo}>
                {grupo}
              </option>
            ))}
          </select>
          <small>
            Mantenha pressionado Ctrl (Windows) ou Command (Mac) para selecionar múltiplos grupos.
          </small>
        </div>

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
