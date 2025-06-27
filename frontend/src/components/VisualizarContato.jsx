import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VisualizarContato = () => {
  const [contatos, setContatos] = useState([]);
  const navigate = useNavigate();

  const irParaAdicao = () => {
    navigate('/contato/adicionar');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/contatos/listar')
      .then(response => setContatos(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: 'roboto'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '600',
          color: '#000',
          marginBottom: '20px',
        }}>
          Lista de Contatos
        </h2>

        <table style={{
          borderCollapse: 'separate',
          padding: '10px',
          width: '100%',
        }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>Nome</th>
              <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>Telefone</th>
              <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {contatos.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>Nenhum contato encontrado.</td>
              </tr>
            ) : (
              contatos.map((contato) => (
                <tr key={contato.id}>
                  <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>{contato.nome}</td>
                  <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>{contato.telefone}</td>
                  <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>{contato.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Button
          onClick={irParaAdicao}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: '#007AFF',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: '600',
            fontSize: '16px',
            padding: '10px 0',
          }}
        >
          Adicionar Contato
        </Button>
      </div>
    </div>
  );
};

export default VisualizarContato;
