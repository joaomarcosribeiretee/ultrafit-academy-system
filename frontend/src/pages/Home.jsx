import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Sistema de Gestão ULTRAFIT 🏋️‍♂️</h1>
      <div className="home-buttons">
        <Link to="/alunos" className="home-button">Alunos</Link>
        <Link to="/treinos" className="home-button">Treinos</Link>
        <Link to="/vincular-treino" className="home-button">Vincular Treino</Link>
      </div>
    </div>
  );
}

export default Home;
