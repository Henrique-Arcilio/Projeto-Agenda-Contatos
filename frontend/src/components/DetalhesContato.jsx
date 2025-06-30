import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // Buscar contato
  useEffect(() => {
    axios.get(`http://localhost:8080/contatos/${id}`)
      .then(res => {
        setContato(res.data);
        setBloqueado(res.data.bloqueado || false); // Se já estiver bloqueado
      })
      .catch(err => {
        console.error("Erro ao buscar contato:", err);
      });
  }, [id]);

  // Ações
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
          marginBottom: '20px'
        }}>
          Editar Contato
        </h2>

        <TextField
          disabled
          label="Nome"
          value={contato?.nome || ''}
          fullWidth
          required
          sx={{ marginBottom: '16px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <TextField
          disabled
          label="Email"
          value={contato?.email || ''}
          fullWidth
          required
          sx={{ marginBottom: '16px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        />

        <TextField
          disabled
          label="Telefone"
          value={contato?.telefone || ''}
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
          <Button onClick={handleClickBloquear} startIcon={<BlockIcon />}>
            Bloquear
          </Button>

          {bloqueado && (
            <Button startIcon={<BlockIcon />} color="secondary">
              Desbloquear
            </Button>
          )}

          <Button startIcon={<EditRoundedIcon />}>Editar</Button>

          <Button onClick={handleClickOpen} startIcon={<DeleteIcon />} color="error">
            Deletar
          </Button>
        </ButtonGroup>

        {/* Diálogo de Bloquear */}
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

        {/* Diálogo de Excluir */}
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
