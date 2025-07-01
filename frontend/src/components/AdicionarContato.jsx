import axios from 'axios';
import {TextField, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AdicionarContato = () => {
    const navigate = useNavigate();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/contatos/salvar', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(res => {
                setFormData({
                    nome: '',
                    email: '',
                    telefone: ''
                });
                console.log(res);

            })
            .catch(erro => console.log(erro));

    };

    const redirectVisualizar = () => {
        navigate('/contato/visualizar');
    }

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
                maxWidth: '420px',
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
                    marginBottom: '40px'
                }}>
                    Adicionar Contato
                </h2>

                <form onSubmit={handleSubmit}>
                    <TextField
                        id="nome-contato"
                        label="Nome"
                        name="nome"
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
                        }}
                    />

                    <TextField
                        id="email-contato"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        type="email"
                        fullWidth
                        sx={{
                            marginBottom: '16px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px'
                            }
                        }}
                    />

                    <TextField
                        id="telefone-contato"
                        label="Telefone"
                        name="telefone"
                        type="tel"
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
                        }}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            fullWidth
                            startIcon={<ArrowBackIcon/>}
                            sx={{
                                width: '40%',
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '16px',
                                padding: '10px 0',
                                marginTop: '10px',
                                '&:hover': {
                                    backgroundColor: '#ccdff4',
                                    borderColor: '#005FCC'
                                }
                            }}

                            onClick={redirectVisualizar}>
                            Voltar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<AddCircleOutlineIcon/>}
                            fullWidth
                            sx={{
                                width: '40%',
                                marginTop: '10px',
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


        </div>
    );
};

export default AdicionarContato;