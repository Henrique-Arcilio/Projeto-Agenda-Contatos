import axios, {Axios} from 'axios';
import { useEffect } from "react"
import {Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

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
        <body style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
        
        <div style={{
            maxWidth: '1000px',
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
                marginBottom: '20px',
            }}>Lista de Contatos</h2>
            <table
                variant="outlined"
                fullWidth
                required
                sx={{
                    marginBottom: '16px',
                    '& .MuiOutlinedTable-root': {
                        borderRadius: '12px'
                    }
                }}
                style={{
                border: '0px 10px solid #000',
                borderCollapse: 'separate',
                padding : '10px',
                width: '100%',
            }}>
                <thead>
                <tr>
                    <th style={{
                        textAlign: 'left',
                        padding : '10px',
                        borderBottom: '1px solid #ccc',
                    }}>Nome</th>
                    <th style={{
                        textAlign: 'right',
                        padding : '10px',
                        borderBottom: '1px solid #ccc',
                    }}>Telefone</th>
                </tr>
                </thead>
                <tbody>
                {contatos.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{textAlign: 'center'}}>Nenhum contato encontrado.</td>
                    </tr>
                ) : (
                    contatos.map((contato) => (
                        <tr key={contato.id}>
                            <td style={{
                                textAlign: 'left',
                                padding : '10px',
                                borderBottom: '1px solid #ccc',
                            }}>{contato.nome}</td>
                            <td style={{
                                textAlign: 'right',
                                padding : '10px',
                                borderBottom: '1px solid #ccc',
                            }}>{contato.telefone}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
            <Button
                onClick={irParaAdicao}
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
                }
            }> Adicionar Contato
            </Button>
            </div>
        </body>
    )
}

export default VisualizarContato;
