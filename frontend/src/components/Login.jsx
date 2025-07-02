import {TextField, Button, Alert} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        senha: ''
    });

    const [erroLogin, setErroLogin] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErroLogin(false);

        axios.post('http://localhost:8080/usuarios/autenticacao', formData)
            .then(() => {
                navigate('/contato/visualizar');
            })
            .catch((erro) => {
                console.log(erro);
                setErroLogin(true);
            });
    };

    const redirectCadastrar = () => {
        navigate('/usuario/cadastrar');
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
                margin: '40px auto',
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
                    Login
                </h2>

                {/* ✅ Exibe alerta se login falhar */}
                {erroLogin && (
                    <Alert severity="error" sx={{mb: 2}}>
                        Login ou senha inválidos.
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        id="login"
                        label="Login"
                        name="login"
                        value={formData.login}
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
                        id="outlined-password-input"
                        label="Senha"
                        name="senha"
                        type="password"
                        autoComplete="current-password"
                        value={formData.senha}
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
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            startIcon={<LoginIcon/>}
                            sx={{
                                width: '45%',
                                backgroundColor: '#007AFF',
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: '600',
                                fontSize: '16px',
                                padding: '10px 0',
                                marginTop: '10px',
                                '&:hover': {
                                    backgroundColor: '#005FCC'
                                }
                            }}
                        >
                            Logar
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            fullWidth
                            startIcon={<PersonAddIcon/>}
                            sx={{
                                width: '45%',
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

                            onClick={redirectCadastrar}>
                            Criar Conta
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;
