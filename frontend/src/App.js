import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroAluno from './pages/CadastroAluno';
import Treinos from './pages/Treinos';
import CadastrarTreino from './pages/CadastrarTreino';
import MontarTreino from './pages/MontarTreino';
import Header from './components/Header';
import VincularTreino from './pages/VincularTreino';
import VisualizarTreino from './pages/VisualizarTreino';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<CadastroAluno />} />
        <Route path="/treinos" element={<Treinos />} />
        <Route path="/cadastrar-treino" element={<CadastrarTreino />} /> 
        <Route path="/montar-treino" element={<MontarTreino />} /> 
        <Route path="/vincular-treino" element={<VincularTreino />} />
        <Route path="/visualizar-treino" element={<VisualizarTreino />} />
      </Routes>
    </Router>
  );
}

export default App;
