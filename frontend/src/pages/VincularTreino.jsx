import { useState, useEffect } from 'react';
import '../styles/VincularTreino.css';

function VincularTreino() {
  const [alunoSelecionado, setAlunoSelecionado] = useState('');
  const [treinoSelecionado, setTreinoSelecionado] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [vinculos, setVinculos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data));

    fetch('http://localhost:3001/api/treinos')
      .then(res => res.json())
      .then(data => setTreinos(data));

    carregarVinculos();
  }, []);

  const carregarVinculos = () => {
    fetch('http://localhost:3001/api/alunos/vinculos')
      .then(res => res.json())
      .then(data => setVinculos(data));
  };

  const vincularTreino = () => {
    if (!alunoSelecionado || !treinoSelecionado) {
      alert('Selecione um aluno e um treino!');
      return;
    }

    fetch('http://localhost:3001/api/alunos/vincular-treino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aluno_id: alunoSelecionado,
        treino_id: treinoSelecionado
      })
    })
      .then(res => res.json())
      .then(() => {
        alert('Treino vinculado com sucesso!');
        carregarVinculos();
      });
  };

  return (
    <div className="vincular-container">
      <h1 className="vincular-title">Vincular Treino ao Aluno</h1>

      <div className="vincular-form">
        <select value={alunoSelecionado} onChange={(e) => setAlunoSelecionado(e.target.value)}>
          <option value="">Selecione o Aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.aluno_id} value={aluno.aluno_id}>
              {aluno.nome}
            </option>
          ))}
        </select>

        <select value={treinoSelecionado} onChange={(e) => setTreinoSelecionado(e.target.value)}>
          <option value="">Selecione o Treino</option>
          {treinos.map((treino) => (
            <option key={treino.treino_id} value={treino.treino_id}>
              {treino.nome}
            </option>
          ))}
        </select>

        <button onClick={vincularTreino}>Vincular Treino</button>
      </div>

      <h2 style={{ color: '#7CFC00', marginTop: '30px' }}>Treinos Vinculados</h2>
      <table className="vinculo-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Treino</th>
          </tr>
        </thead>
        <tbody>
          {vinculos.map((v, index) => (
            <tr key={index}>
              <td>{v.aluno}</td>
              <td>{v.treino}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VincularTreino;
