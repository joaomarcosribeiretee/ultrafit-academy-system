import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/VisualizarTreinos.css';

const VisualizarTreinos = () => {
    const [treinos, setTreinos] = useState([]);
    const [treinoSelecionado, setTreinoSelecionado] = useState('');
    const [dadosTreino, setDadosTreino] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    // 🔹 Buscar todos os treinos ao carregar a página
    useEffect(() => {
        const buscarTreinos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/vizutreinos');
                setTreinos(response.data);
            } catch (error) {
                console.error('Erro ao buscar treinos:', error);
            }
        };

        buscarTreinos();
    }, []);

    // 🔹 Buscar dados de um treino específico
    const buscarDadosTreino = async () => {
        try {
            setCarregando(true);
            setErro('');
            setDadosTreino(null);

            const response = await axios.get(`http://localhost:3001/api/vizutreinos/${treinoSelecionado}`);
            setDadosTreino(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do treino:', error);
            setErro('Erro ao buscar dados do treino.');
        } finally {
            setCarregando(false);
        }
    };

    // 🔥 Deletar treino
    const deletarTreino = async () => {
        if (!treinoSelecionado) return;

        const confirmacao = window.confirm('Tem certeza que deseja remover este treino? Essa ação é irreversível.');

        if (!confirmacao) return;

        try {
            await axios.delete(`http://localhost:3001/api/vizutreinos/${treinoSelecionado}`);
            alert('Treino removido com sucesso!');

            // Resetar estados
            setDadosTreino(null);
            setTreinoSelecionado('');

            // Atualizar lista de treinos
            const response = await axios.get('http://localhost:3001/api/vizutreinos');
            setTreinos(response.data);
        } catch (error) {
            console.error('Erro ao deletar treino:', error);
            alert('Erro ao deletar treino.');
        }
    };

    return (
        <div className="visualizar-container">
            <h1 className="titulo">Visualizar Treinos</h1>

            <div className="formulario">
                <select
                    value={treinoSelecionado}
                    onChange={(e) => setTreinoSelecionado(e.target.value)}
                >
                    <option value="">Selecione um treino</option>
                    {treinos.map((treino) => (
                        <option key={treino.treino_id} value={treino.treino_id}>
                            {treino.nome}
                        </option>
                    ))}
                </select>
                <button onClick={buscarDadosTreino} disabled={!treinoSelecionado}>
                    Buscar Treino
                </button>
            </div>

            {carregando && <p>Carregando...</p>}
            {erro && <p className="erro">{erro}</p>}

            {dadosTreino && (
                <div className="treino-card">
                    <button className="botao-remover" onClick={deletarTreino}>❌</button>
                    <h2>{dadosTreino.treino_nome}</h2>
                    <p><strong>Professor:</strong> {dadosTreino.professor}</p>
                    <p><strong>Descrição:</strong> {dadosTreino.treino_descricao}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>Exercício</th>
                                <th>Grupo Muscular</th>
                                <th>Séries</th>
                                <th>Repetições</th>
                                <th>Carga (kg)</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosTreino.exercicios.map((ex) => (
                                <tr key={ex.exercicio_id}>
                                    <td>{ex.nome}</td>
                                    <td>{ex.grupo_muscular}</td>
                                    <td>{ex.series}</td>
                                    <td>{ex.repeticoes}</td>
                                    <td>{ex.carga_kg}</td>
                                    <td>{ex.observacoes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default VisualizarTreinos;
