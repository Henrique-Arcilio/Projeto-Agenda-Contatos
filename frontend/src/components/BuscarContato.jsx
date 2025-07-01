import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from '@mui/icons-material/Search';

const BuscarContato = () => {
    const navigate = useNavigate();

    const redirectVisualizar = () => {
        navigate('/contato/visualizar');
    }

    const redirectBuscados = () => {
        navigate('/contato/buscados');
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
                minWidth: '420px',
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
                    Buscar Contato
                </h2>

                <TextField
                    id="nome"
                    label="Nome"
                    name="nome"
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
                        }} onClick={redirectVisualizar}
                    > Voltar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<SearchIcon/>}
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
                        }} onClick={redirectBuscados}
                    > Buscar
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BuscarContato;