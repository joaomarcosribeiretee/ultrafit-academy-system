import { useState } from 'react';
import '../styles/MontarTreino.css';

function MontarTreino() {
  const [treinoSelecionado, setTreinoSelecionado] = useState('');
  const [faseSelecionarTreino, setFaseSelecionarTreino] = useState(true);

  const [exercicioSelecionado, setExercicioSelecionado] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [exerciciosAdicionados, setExerciciosAdicionados] = useState([]);

  const treinos = ['Treino A', 'Treino B', 'Treino C'];

  const exercicios = [
    { nome: 'Supino Reto', grupoMuscular: 'Peito' },
    { nome: 'Agachamento Livre', grupoMuscular: 'Pernas' },
    { nome: 'Puxada Frente', grupoMuscular: 'Costas' }
  ];

  const iniciarMontagem = () => {
    if (!treinoSelecionado) {
      alert('Selecione um treino para continuar!');
      return;
    }
    setFaseSelecionarTreino(false);
  };

  const adicionarExercicio = () => {
    if (!exercicioSelecionado || !series || !repeticoes) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoExercicio = {
      exercicio: exercicioSelecionado,
      series,
      repeticoes,
      observacoes
    };

    setExerciciosAdicionados([...exerciciosAdicionados, novoExercicio]);
    setExercicioSelecionado('');
    setSeries('');
    setRepeticoes('');
    setObservacoes('');
  };

  const salvarTreino = () => {
    if (exerciciosAdicionados.length === 0) {
      alert('Adicione pelo menos um exercício!');
      return;
    }

    console.log('Treino selecionado:', treinoSelecionado);
    console.log('Exercícios adicionados:', exerciciosAdicionados);
  };

  return (
    <div className="montar-container">
      <h1 className="montar-title">Montar Treino</h1>

      {faseSelecionarTreino ? (
        <div className="selecionar-treino">
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

          <button className="iniciar-button" onClick={iniciarMontagem}>
            Iniciar Montagem
          </button>
        </div>
      ) : (
        <>
          <div className="montar-form">
            <select
              value={exercicioSelecionado}
              onChange={(e) => setExercicioSelecionado(e.target.value)}
              required
            >
              <option value="">Selecione o Exercício</option>
              {exercicios.map((exercicio, index) => (
                <option key={index} value={exercicio.nome}>
                  {exercicio.nome} ({exercicio.grupoMuscular})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Séries"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Repetições"
              value={repeticoes}
              onChange={(e) => setRepeticoes(e.target.value)}
              required
            />

            <textarea
              placeholder="Observações do exercício (opcional)"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            ></textarea>

            <button type="button" onClick={adicionarExercicio}>
              Adicionar Exercício
            </button>
          </div>

          <div className="exercicios-adicionados">
            <h2>Exercícios Adicionados</h2>
            {exerciciosAdicionados.length === 0 ? (
              <p>Nenhum exercício adicionado ainda.</p>
            ) : (
              <ul>
                {exerciciosAdicionados.map((item, index) => (
                  <li key={index}>
                    {item.exercicio} - {item.series} séries x {item.repeticoes} repetições
                    {item.observacoes && (
                      <p><em>Obs: {item.observacoes}</em></p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="salvar-button" onClick={salvarTreino}>
            Salvar Treino Montado
          </button>
        </>
      )}
    </div>
  );
}

export default MontarTreino;
