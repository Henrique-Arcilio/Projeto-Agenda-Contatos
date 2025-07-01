
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button} from "@mui/material";

const ContatosBuscados = () => {
    const navigate = useNavigate();

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
                maxWidth: '1000px',
                width: '80vw',
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '20px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                fontFamily: 'roboto',
                display: 'flex',
                flexDirection: 'column',
                height: '80vh'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '40px',
                }}>
                    Contatos Encontrados
                </h2>
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    marginBottom: '20px'
                }}>
                    <table style={{
                        borderCollapse: 'separate',
                        padding: '10px',
                        width: '100%',
                    }}>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center', padding: '10px', borderBottom: '1px solid #ccc'}}>Nome</th>
                            <th style={{
                                textAlign: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ccc'
                            }}>Telefone
                            </th>
                            <th style={{
                                textAlign: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ccc'
                            }}>Email
                            </th>
                            <th style={{
                                textAlign: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #ccc'
                            }}>Editar
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>                     <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    fullWidth
                    startIcon={<ArrowBackIcon/>}
                    sx={{
                        width: '20%',
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
                    }} onClick={redirectVisualizar}
                > Voltar
                </Button>
                </div>
            </div>
        </div>
    );
}

export default ContatosBuscados;
