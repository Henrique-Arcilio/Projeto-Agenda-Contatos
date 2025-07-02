import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import { ButtonGroup, TextField, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetalhesContato = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contato, setContato] = useState(null);
  const [open, setOpen] = useState(false);
  const [openBloquear, setOpenBloquear] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [editando, setEditando] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const carregarContato = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/contatos/${id}`);
      setContato(res.data);
      setFormData({
        nome: res.data.nome,
        email: res.data.email,
        telefone: res.data.telefone,
      });
      setBloqueado(res.data.bloqueado || false);
    } catch (err) {
      console.error("Erro ao buscar contato:", err);
    }
  };

  const handleEditar = () => {
    setEditando(true);
  };

  useEffect(() => {
    carregarContato();
  }, [id, location.key]);

  const handleSalvar = () => {
    axios.put(`http://localhost:8080/contatos/editar/${id}`, formData)
      .then(() => {
        carregarContato(); // recarrega dados, incluindo status de bloqueio
        setEditando(false);
      })
      .catch(err => {
        console.error("Erro ao salvar alterações:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExcluir = () => {
    axios.delete(`http://localhost:8080/contatos/deletar/${id}`)
      .then(() => {
        navigate('/contato/visualizar');
      })
      .catch(err => {
        console.error("Erro ao excluir:", err);
      });
  };

  const handleBloquear = () => {
    axios.put(`http://localhost:8080/contatos/bloquear/${id}`)
      .then(() => {
        setBloqueado(true);
        setOpenBloquear(false);
      })
      .catch(err => {
        console.error("Erro ao bloquear:", err);
      });
  };

  const handleDesbloquear = () => {
    axios.put(`http://localhost:8080/contatos/desbloquear/${id}`)
      .then(() => {
        setBloqueado(false);
        carregarContato(); // para garantir consistência
      })
      .catch(err => {
        console.error("Erro ao desbloquear:", err);
      });
  };

  const redirectVisualizar = () => {
    navigate('/contato/visualizar');
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickBloquear = () => setOpenBloquear(true);
  const handleCloseBloquear = () => setOpenBloquear(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#fff'
    }}>
      <div style={{
        maxWidth: '420px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(3, 3, 3, 0.48)',
        fontFamily: 'roboto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        <h2 style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '600',
          color: '#000',
          marginBottom: '40px'
        }}>
          Editar Contato
        </h2>

        <TextField
          disabled={!editando}
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: '16px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <TextField
          disabled={!editando}
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: '16px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <TextField
          disabled={!editando}
          label="Telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: '16px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <ButtonGroup
          disableElevation
          variant="outlined"
          aria-label="Botões de ação"
          size="medium"
          sx={{ marginTop: '20px' }}
        >
          {bloqueado ? (
            <Button onClick={handleDesbloquear} startIcon={<BlockIcon />} color="secondary">
              Desbloquear
            </Button>
          ) : (
            <Button onClick={handleClickBloquear} startIcon={<BlockIcon />}>
              Bloquear
            </Button>
          )}


          {editando ? (
            <Button onClick={handleSalvar} startIcon={<SaveIcon />} color="success">
              Salvar
            </Button>
          ) : (
            <Button onClick={handleEditar} startIcon={<EditRoundedIcon />}>
              Editar
            </Button>
          )}

          <Button onClick={handleClickOpen} startIcon={<DeleteIcon />} color="error">
            Deletar
          </Button>
        </ButtonGroup>
        <div style={{
                    marginTop: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        fullWidth
                        startIcon={<ArrowBackIcon/>}
                        sx={{
                            width: '100%',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: '600',
                            fontSize: '16px',
                            marginTop: '10px',
                            '&:hover': {
                                backgroundColor: '#ccdff4',
                                borderColor: '#005FCC'
                            }
                        }} onClick={redirectVisualizar}> Voltar
                    </Button>
                </div>


        <Dialog
          open={openBloquear}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseBloquear}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Bloquear contato</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Tem certeza que deseja bloquear esse contato?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBloquear}>Cancelar</Button>
            <Button onClick={handleBloquear} color="error">Bloquear</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Excluir Contato</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Tem certeza que deseja excluir esse contato?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleExcluir} color="error" variant="outlined">Excluir</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DetalhesContato;
