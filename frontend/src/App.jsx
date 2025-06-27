import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VisualizarContato from './components/VisualizarContato.jsx';
import ContatoForm from './components/ContatoForm.jsx';
import '@fontsource/roboto';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
            <Routes>
                <Route path="/" element={<VisualizarContato />} />
                <Route path="/contato/adicionar" element={<ContatoForm />} />
            </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;
