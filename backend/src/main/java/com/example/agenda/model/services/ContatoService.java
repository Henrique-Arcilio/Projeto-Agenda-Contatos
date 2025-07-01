package com.example.agenda.model.services;

import com.example.agenda.model.controller.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.repository.ContatoRepository;
import com.example.agenda.model.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContatoService {
    private UsuarioService usuarioService;
    private ContatoRepository contatoRepository;
    private UsuarioRepository usuarioRepository;

    public ContatoService(UsuarioService usuarioService, ContatoRepository contatoRepository, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.contatoRepository = contatoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public void salvarContato(Contato contato, Usuario usuario) throws Exception{

        if(usuario.getTelefone().equals(contato.getTelefone())){
            throw new Exception("Você não pode salvar o próprio número");
        }
        if(usuario.getContatos().contains(contato)){
            throw new Exception("O contato já está na sua agenda");
        }
        Usuario donoDoContato = usuarioService.findByTelefone(contato.getTelefone());
        if (donoDoContato != null) {
            contato.setDono(usuario);
            usuario.getContatos().add(contato);
            contatoRepository.save(contato);
            usuarioService.save(usuario);
        }else {
            throw new Exception("O número não existe");
        }
    }

    public List<Contato> listar(){
        return contatoRepository.findAll();
    }

    public boolean deletar(UUID id, Usuario usuario){
        if (contatoRepository.existsById(id)){
            usuario = usuarioService.findById(usuario.getId());
            Contato contato = contatoRepository.findById(id).orElse(null);
            usuario.getContatos().remove(contato);
            usuarioService.save(usuario);

            return true;
        }
        return false;
    }

    public boolean editar(UUID id, ContatoEditarDTO contatoEditarDTO){
        Contato contato = contatoRepository.findById(id).get();
        contato.setNome(contatoEditarDTO.getNome());
        contato.setTelefone(contatoEditarDTO.getTelefone());
        contato.setEmail(contatoEditarDTO.getEmail());
        contatoRepository.save(contato);
        return true;
    }

    public void bloquear(UUID id, Usuario usuario) throws ClassNotFoundException{
        Contato contato = contatoRepository.findById(id).orElse(null);
        usuario = usuarioService.findById(usuario.getId());
        if(contato == null) {
            throw new ClassNotFoundException("O contato não está na lista do usuário");
        }
        contato.setBloqueado(true);
        contatoRepository.save(contato);
        usuarioService.save(usuario);
    }

    public void desbloquear(UUID id, Usuario usuario) throws ClassNotFoundException{
        Contato contato = contatoRepository.findById(id).orElse(null);
        usuario = usuarioService.findById(usuario.getId());
        if(contato == null) {
            throw new ClassNotFoundException("Contato informado não existe");
        }else if(!contato.isBloqueado()){
            throw new ClassNotFoundException("Contato informado não está bloqueado");
        }
        contato.setBloqueado(false);
        contatoRepository.save(contato);
        usuarioService.save(usuario);
    }

    public Contato buscarPorId(UUID id, Usuario usuario) {
        return usuario.getContatos().stream()
                .filter(contato -> contato.getId().equals(id))
                .findFirst()
                .orElse(null);
    }


}
