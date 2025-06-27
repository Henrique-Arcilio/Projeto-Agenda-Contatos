import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto';
import theme from './theme/theme';

import VisualizarContato from './components/VisualizarContato.jsx';
import ContatoForm from './components/ContatoForm.jsx';
import Login from './components/Login.jsx';
import EditarContato from './components/EditarContato.jsx';
import Cadastro from './components/Cadastro.jsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contato/adicionar" element={<ContatoForm />} />
                <Route path="/contato/visualizar" element={<VisualizarContato />} />
                <Route path="/usuario/cadastrar" element={<Cadastro />}></Route>
                <Route path="/contato/editar/:id" element={<EditarContato />} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
