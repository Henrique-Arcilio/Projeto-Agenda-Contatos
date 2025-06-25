import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CadastroContato from './pages/CadastroContato';
import '@fontsource/roboto';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CadastroContato />
    </ThemeProvider>
  );
}

export default App;
