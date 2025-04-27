import { useNavigate } from 'react-router-dom';
import '../styles/Treinos.css';

function Treinos() {
  const navigate = useNavigate(); // Ativa o navegador

  return (
    <div className="treinos-container">
      <h1 className="treinos-title">Gestão de Treinos</h1>

      <div className="treinos-buttons">
        <button className="treinos-button" onClick={() => navigate('/cadastrar-treino')}>
          Cadastrar Novo Treino
        </button>

        <button className="treinos-button" onClick={() => navigate('/montar-treino')}>
          Montar Treino
        </button>
      </div>
    </div>
  );
}

export default Treinos;
