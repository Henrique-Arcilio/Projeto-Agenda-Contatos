import { Button, Typography, Container, Box } from '@mui/material';

function App() {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Agenda de Contatos
        </Typography>
        <Button variant="contained" color="primary">
          Clique aqui
        </Button>
      </Box>
    </Container>
  );
}

export default App;
