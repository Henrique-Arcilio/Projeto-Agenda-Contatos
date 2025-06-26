import axios, { Axios } from 'axios';
import {TextField, Button } from '@mui/material';
import { useState } from 'react';


const ContatoForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => { //manda os dados pro back
    e.preventDefault();
    axios.post('http://localhost:8080/contatos/salvar', {
      ...formData
    })
    .then(function (res){
      console.log(res);
    })
    .catch(function (erro){
      console.log(erro);
    })
    console.log('Dados enviados:', formData);
  };  

  return (
    <body style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
    }}>

    <div style={{
        maxWidth: '420px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: 'roboto'
    }}>

      <h2
      style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
        color: '#000',
        marginBottom: '20px',
        fontFamily: 'roboto'
      }}>Adicionar Contato</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="standard-basic nomeContato"
            label="Nome"
            name='nome'
            value={formData.nome}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{
              marginBottom: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}/>

          <TextField
            id="standard-basic nomeContato"
            label="Email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            vvariant="outlined"
            type="email"
            fullWidth
            sx={{
              marginBottom: '16px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px'
              }
            }}/>

          <TextField
            label="Telefone"
            type='number'
            name='telefone'
            value={formData.telefone}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            sx={{
              marginBottom: '16px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px'
                  }
            }}/>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#007AFF',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: '600',
              fontSize: '16px',
              padding: '10px 0',
              '&:hover': {
                backgroundColor: '#005FCC'
              }
            }}
            >
              Salvar

          </Button>
        </div>
      </form>
    </div>
    </body>
  );
};


export default ContatoForm;
