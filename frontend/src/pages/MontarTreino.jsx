import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MontarTreino.css';

function MontarTreino() {
  // Estados para seleção de treino
  const [treinos, setTreinos] = useState([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState('');
  const [faseSelecionarTreino, setFaseSelecionarTreino] = useState(true);

  // Estados para montagem de exercícios
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [exercicios, setExercicios] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [exercicioSelecionado, setExercicioSelecionado] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [exerciciosAdicionados, setExerciciosAdicionados] = useState([]);
  
  // Estados de controle
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Carrega lista de treinos disponíveis
  useEffect(() => {
    const carregarTreinos = async () => {
      if (faseSelecionarTreino) {
        setCarregando(true);
        setErro('');
        try {
          const response = await axios.get('http://localhost:3001/api/montar-treino/treinos');
          setTreinos(response.data);
        } catch (err) {
          console.error('Erro ao carregar treinos:', err);
          setErro('Erro ao carregar lista de treinos. Tente novamente mais tarde.');
        } finally {
          setCarregando(false);
        }
      }
    };
    carregarTreinos();
  }, [faseSelecionarTreino]);

  // Carrega grupos musculares quando inicia a montagem
  useEffect(() => {
    const carregarGruposMusculares = async () => {
      if (!faseSelecionarTreino) {
        setCarregando(true);
        setErro('');
        try {
          const response = await axios.get('http://localhost:3001/api/montar-treino/grupos-musculares');
          setGruposMusculares(response.data);
        } catch (err) {
          console.error('Erro ao carregar grupos musculares:', err);
          setErro('Erro ao carregar grupos musculares.');
        } finally {
          setCarregando(false);
        }
      }
    };
    carregarGruposMusculares();
  }, [faseSelecionarTreino]);

  // Carrega exercícios quando grupo muscular é selecionado
  useEffect(() => {
    const carregarExercicios = async () => {
      if (grupoSelecionado && !faseSelecionarTreino) {
        setCarregando(true);
        setExercicioSelecionado('');
        setErro('');
        try {
          const response = await axios.get(
            `http://localhost:3001/api/montar-treino/exercicios/grupo/${grupoSelecionado}`
          );
          setExercicios(response.data);
        } catch (err) {
          console.error('Erro ao carregar exercícios:', err);
          setErro('Erro ao carregar exercícios para este grupo muscular.');
        } finally {
          setCarregando(false);
        }
      } else {
        setExercicios([]);
      }
    };
    carregarExercicios();
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
      setErro('Preencha todos os campos obrigatórios: exercício, séries e repetições.');
      return;
    }

    const exercicioSelecionadoObj = exercicios.find(e => e.exercicio_id === parseInt(exercicioSelecionado));
    
    if (!exercicioSelecionadoObj) {
      setErro('Exercício selecionado inválido.');
      return;
    }

    const grupoMuscular = gruposMusculares.find(g => g.grupo_muscular_id === parseInt(grupoSelecionado));

    const novoExercicio = {
      id: Date.now(), // ID temporário
      exercicio_id: exercicioSelecionadoObj.exercicio_id,
      nome: exercicioSelecionadoObj.nome,
      grupo_muscular: grupoMuscular?.nome || '',
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
      setErro('Adicione pelo menos um exercício para salvar o treino.');
      return;
    }

    setCarregando(true);
    setErro('');
    
    try {
      // Primeiro, atualiza o treino existente ou cria um novo
      const treinoData = {
        treino_id: treinoSelecionado,
        exercicios: exerciciosAdicionados
      };

      await axios.post('http://localhost:3001/api/montar-treino/salvar', treinoData);
      
      setSucesso('Treino salvo com sucesso!');
      setTimeout(() => {
        // Resetar para o início
        setFaseSelecionarTreino(true);
        setTreinoSelecionado('');
        setExerciciosAdicionados([]);
        setSucesso('');
      }, 2000);
    } catch (err) {
      console.error('Erro ao salvar treino:', err);
      setErro('Erro ao salvar treino. Tente novamente.');
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
      {sucesso && <div className="mensagem sucesso">{sucesso}</div>}

      {faseSelecionarTreino ? (
        <div className="selecionar-treino">
          <div className="form-group">
            <label>Solidariedade: Treino</label>
            <select
              value={treinoSelecionado}
              onChange={(e) => setTreinoSelecionado(e.target.value)}
              required
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

          <button 
            className="botao-primario" 
            onClick={iniciarMontagem} 
            disabled={carregando || !treinoSelecionado}
          >
            {carregando ? 'Carregando...' : 'Iniciar Montagem'}
          </button>
        </div>
      ) : (
        <>
          <div className="cabecalho-montagem">
            <h2>Montando: {treinos.find(t => t.treino_id === treinoSelecionado)?.nome}</h2>
            <button className="botao-secundario" onClick={voltarParaSelecao}>
              Voltar
            </button>
          </div>

          <div className="montar-form">
            <div className="form-group">
              <label htmlFor="grupoMuscular">Grupo Muscular</label>
              <select
                id="grupoMuscular"
                value={grupoSelecionado}
                onChange={(e) => setGrupoSelecionado(e.target.value)}
                disabled={carregando}
              >
                <option value="">Selecione o Grupo Muscular</option>
                {gruposMusculares.map((grupo) => (
                  <option key={grupo.grupo_muscular_id} value={grupo.grupo_muscular_id}>
                    {grupo.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exercicio">Exercício</label>
              <select
                id="exercicio"
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
                <label htmlFor="series">Séries</label>
                <input
                  id="series"
                  type="number"
                  min="1"
                  placeholder="Ex: 3"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="repeticoes">Repetições</label>
                <input
                  id="repeticoes"
                  type="number"
                  min="1"
                  placeholder="Ex: 12"
                  value={repeticoes}
                  onChange={(e) => setRepeticoes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="carga">Carga (kg)</label>
                <input
                  id="carga"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="Opcional"
                  value={carga}
                  onChange={(e) => setCarga(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações (opcional)</label>
              <textarea
                id="observacoes"
                placeholder="Ex: 30 segundos de descanso"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <button 
              className="botao-primario"
              onClick={adicionarExercicio}
              disabled={!exercicioSelecionado || !series || !repeticoes || carregando}
            >
              Adicionar Exercício
            </button>
          </div>

          <div className="exercicios-adicionados">
            <h2>Exercícios Adicionados</h2>
            {exerciciosAdicionados.length === 0 ? (
              <p>Nenhum exercício adicionado ainda.</p>
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
                      className="botao-remover"
                      onClick={() => removerExercicio(ex.id)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="acoes">
            <button 
              className="botao-primario" 
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