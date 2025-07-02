import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto';
import theme from './theme/theme';

import VisualizarContato from './components/VisualizarContato.jsx';
import AdicionarContato from './components/AdicionarContato.jsx';
import Login from './components/Login.jsx';
import DetalhesContato from './components/DetalhesContato.jsx';
import Cadastro from './components/Cadastro.jsx'
import BuscarContato from "./components/BuscarContato.jsx";
import ContatosBuscados from "./components/ContatosBuscados.jsx";
import ContatosBloqueados from './components/ContatosBloqueados.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contato/adicionar" element={<AdicionarContato />} />
                <Route path="/contato/visualizar" element={<VisualizarContato />} />
                <Route path="/usuario/cadastrar" element={<Cadastro />}></Route>
                <Route path="/contato/detalhesContato/:id" element={<DetalhesContato />} />
                <Route path="/contato/buscar/" element={<BuscarContato />} />
                <Route path="/contato/buscados" element={<ContatosBuscados />} />
                <Route path="/contato/bloqueados" element={<ContatosBloqueados />} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
