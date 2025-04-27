import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroAluno from './pages/CadastroAluno';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-aluno" element={<CadastroAluno />} />
      </Routes>
    </Router>
  );
}

export default App;
