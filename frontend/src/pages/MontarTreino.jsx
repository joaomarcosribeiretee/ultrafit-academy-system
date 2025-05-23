import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MontarTreino.css';

function MontarTreino() {
  const [treinos, setTreinos] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState('');
  const [faseSelecionarTreino, setFaseSelecionarTreino] = useState(true);

  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [exercicioSelecionado, setExercicioSelecionado] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [exerciciosAdicionados, setExerciciosAdicionados] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  // 🔹 Carregar treinos
  useEffect(() => {
    if (faseSelecionarTreino) {
      setCarregando(true);
      axios.get('http://localhost:3001/api/montar-treino/treinos')
        .then(res => setTreinos(res.data))
        .catch(err => {
          console.error(err);
          setErro('Erro ao carregar treinos');
        })
        .finally(() => setCarregando(false));
    }
  }, [faseSelecionarTreino]);

  // 🔹 Carregar grupos musculares
  useEffect(() => {
    if (!faseSelecionarTreino) {
      setCarregando(true);
      axios.get('http://localhost:3001/api/montar-treino/grupos-musculares')
        .then(res => setGruposMusculares(res.data))
        .catch(err => {
          console.error(err);
          setErro('Erro ao carregar grupos musculares');
        })
        .finally(() => setCarregando(false));
    }
  }, [faseSelecionarTreino]);

  // 🔹 Carregar exercícios quando grupo mudar
  useEffect(() => {
    if (grupoSelecionado && !faseSelecionarTreino) {
      setCarregando(true);
      axios.get(`http://localhost:3001/api/montar-treino/exercicios/grupo/${grupoSelecionado}`)
        .then(res => setExercicios(res.data))
        .catch(err => {
          console.error(err);
          setErro('Erro ao carregar exercícios');
        })
        .finally(() => setCarregando(false));
    } else {
      setExercicios([]);
    }
  }, [grupoSelecionado, faseSelecionarTreino]);

  const iniciarMontagem = () => {
    if (!treinoSelecionado) {
      setErro('Selecione um treino para continuar');
      return;
    }
    setFaseSelecionarTreino(false);
    setErro('');
  };

  const adicionarExercicio = () => {
    if (!exercicioSelecionado || !series || !repeticoes) {
      setErro('Preencha exercício, séries e repetições.');
      return;
    }

    const exercicioObj = exercicios.find(e => e.exercicio_id === parseInt(exercicioSelecionado));
    const grupoObj = gruposMusculares.find(g => g.grupo_muscular_id === parseInt(grupoSelecionado));

    const novoExercicio = {
      id: Date.now(),
      exercicio_id: exercicioObj.exercicio_id,
      nome: exercicioObj.nome,
      grupo_muscular: grupoObj?.nome || '',
      series: parseInt(series),
      repeticoes: parseInt(repeticoes),
      carga: carga ? parseFloat(carga) : null,
      observacoes: observacoes.trim()
    };

    setExerciciosAdicionados([...exerciciosAdicionados, novoExercicio]);
    limparCampos();
    setErro('');
  };

  const limparCampos = () => {
    setExercicioSelecionado('');
    setSeries('');
    setRepeticoes('');
    setCarga('');
    setObservacoes('');
  };

  const removerExercicio = (id) => {
    setExerciciosAdicionados(exerciciosAdicionados.filter(ex => ex.id !== id));
  };

  const salvarTreino = async () => {
    if (exerciciosAdicionados.length === 0) {
      setErro('Adicione pelo menos um exercício.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const treinoData = {
        treino_id: treinoSelecionado,
        exercicios: exerciciosAdicionados
      };

      await axios.post('http://localhost:3001/api/montar-treino/salvar', treinoData);

      alert('✅ Treino salvo com sucesso!');

      setFaseSelecionarTreino(true);
      setTreinoSelecionado('');
      setExerciciosAdicionados([]);
    } catch (err) {
      console.error(err);
      alert('❌ Erro ao salvar treino. Verifique e tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const voltarParaSelecao = () => {
    setFaseSelecionarTreino(true);
    setExerciciosAdicionados([]);
    setErro('');
  };

  return (
    <div className="montar-container">
      <h1 className="montar-title">Montar Treino</h1>

      {erro && <div className="mensagem erro">{erro}</div>}

      {faseSelecionarTreino ? (
        <div className="selecionar-treino">
          <div className="form-group">
            <label>Selecionar Treino</label>
            <select
              value={treinoSelecionado}
              onChange={(e) => setTreinoSelecionado(e.target.value)}
              disabled={carregando}
            >
              <option value="">Selecione o Treino</option>
              {treinos.map((treino) => (
                <option key={treino.treino_id} value={treino.treino_id}>
                  {treino.nome}
                </option>
              ))}
            </select>
          </div>

          <button onClick={iniciarMontagem} disabled={carregando || !treinoSelecionado}>
            {carregando ? 'Carregando...' : 'Iniciar Montagem'}
          </button>
        </div>
      ) : (
        <>
          <div className="cabecalho-montagem">
            <h2>Montando: {treinos.find(t => t.treino_id === treinoSelecionado)?.nome}</h2>
            <button onClick={voltarParaSelecao}>Voltar</button>
          </div>

          <div className="montar-form">
            <div className="form-group">
              <label>Grupo Muscular</label>
              <select
                value={grupoSelecionado}
                onChange={(e) => setGrupoSelecionado(e.target.value)}
                disabled={carregando}
              >
                <option value="">Selecione o Grupo</option>
                {gruposMusculares.map((grupo) => (
                  <option key={grupo.grupo_muscular_id} value={grupo.grupo_muscular_id}>
                    {grupo.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Exercício</label>
              <select
                value={exercicioSelecionado}
                onChange={(e) => setExercicioSelecionado(e.target.value)}
                disabled={!grupoSelecionado || carregando}
              >
                <option value="">{carregando ? 'Carregando...' : 'Selecione o Exercício'}</option>
                {exercicios.map((ex) => (
                  <option key={ex.exercicio_id} value={ex.exercicio_id}>
                    {ex.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Séries</label>
                <input
                  type="number"
                  min="1"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Repetições</label>
                <input
                  type="number"
                  min="1"
                  value={repeticoes}
                  onChange={(e) => setRepeticoes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Carga (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={carga}
                  onChange={(e) => setCarga(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Observações (opcional)</label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <button onClick={adicionarExercicio}>
              Adicionar Exercício
            </button>
          </div>

          <div className="exercicios-adicionados">
            <h2>Exercícios Adicionados</h2>
            {exerciciosAdicionados.length === 0 ? (
              <p>Nenhum exercício adicionado.</p>
            ) : (
              <ul>
                {exerciciosAdicionados.map((ex) => (
                  <li key={ex.id}>
                    <div className="exercicio-info">
                      <strong>{ex.nome}</strong> - {ex.series}x{ex.repeticoes}
                      {ex.carga && <span> - {ex.carga}kg</span>}
                      {ex.observacoes && <p className="observacao">Obs: {ex.observacoes}</p>}
                    </div>
                    <button
                      className="botao-remover2"
                      onClick={() => removerExercicio(ex.id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="acoes">
            <button
              onClick={salvarTreino}
              disabled={exerciciosAdicionados.length === 0 || carregando}
            >
              {carregando ? 'Salvando...' : 'Salvar Treino Montado'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MontarTreino;
