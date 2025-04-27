import { useState } from 'react';
import '../styles/VincularTreino.css';

function VincularTreino() {
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [treinoSelecionado, setTreinoSelecionado] = useState('');

  // Simulando alunos e treinos cadastrados
  const alunos = ['João Silva', 'Maria Souza', 'Pedro Santos'];
  const treinos = ['Treino A - Peito e Tríceps', 'Treino B - Costas e Bíceps', 'Treino C - Pernas e Ombros'];

  const vincularTreino = () => {
    if (!alunoSelecionado || !treinoSelecionado) {
      alert('Selecione um aluno e um treino!');
      return;
    }

    console.log(`Vinculando treino "${treinoSelecionado}" ao aluno "${alunoSelecionado}"`);
    // Aqui depois vamos fazer o POST para o backend
  };

  return (
    <div className="vincular-container">
      <h1 className="vincular-title">Vincular Treino ao Aluno</h1>

      <div className="vincular-form">
        <select
          value={alunoSelecionado}
          onChange={(e) => setAlunoSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione o Aluno</option>
          {alunos.map((aluno, index) => (
            <option key={index} value={aluno}>
              {aluno}
            </option>
          ))}
        </select>

        <select
          value={treinoSelecionado}
          onChange={(e) => setTreinoSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione o Treino</option>
          {treinos.map((treino, index) => (
            <option key={index} value={treino}>
              {treino}
            </option>
          ))}
        </select>

        <button onClick={vincularTreino}>Vincular Treino</button>
      </div>
    </div>
  );
}

export default VincularTreino;
