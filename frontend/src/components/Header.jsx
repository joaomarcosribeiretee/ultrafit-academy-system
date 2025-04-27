import { Link } from 'react-router-dom';
import '../styles/Header.css'; // importa o CSS

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/alunos" className="link">Alunos</Link>
        <Link to="/treinos" className="link">Treinos</Link>
        <Link to="/vincular-treino" className="link">Vincular Treino</Link>
      </nav>
    </header>
  );
}

export default Header;
