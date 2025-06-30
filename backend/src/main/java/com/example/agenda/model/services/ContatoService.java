package com.example.agenda.model.services;

import com.example.agenda.model.controller.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContatoService {
    private UsuarioService usuarioService;
    private ContatoRepository contatoRepository;

    public ContatoService(UsuarioService usuarioService, ContatoRepository contatoRepository) {
        this.usuarioService = usuarioService;
        this.contatoRepository = contatoRepository;
    }

    public void salvarContato(Contato contato, Usuario usuario) throws Exception{
        if(usuario.getTelefone().equals(contato.getTelefone())){
            throw new Exception("Você não pode salvar o próprio número");
        }
        if(usuario.getContatos().contains(contato)){
            throw new Exception("O contato já está na sua agenda");
        }
        if(usuario.getBloqueados().contains(contato)){
            throw  new Exception("O contato já existe e está bloqueado");
        }
        Usuario donoDoContato = usuarioService.findByTelefone(contato.getTelefone());
        if (donoDoContato != null) {
           contato = contatoRepository.save(contato);
           usuario.getContatos().add(contato);
           usuarioService.save(usuario);
        }else {
            throw new Exception("O número não existe");
        }
    }

    public List<Contato> listar(){
        return contatoRepository.findAll();
    }

    public boolean deletar(UUID id){
        if (contatoRepository.existsById(id)){
            contatoRepository.deleteById(id);
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
        usuario.getContatos().remove(contato);
        usuario.getBloqueados().add(contato);
        contatoRepository.save(contato);
        usuarioService.save(usuario);
    }

    public void desbloquear(UUID id, Usuario usuario) throws ClassNotFoundException{
        Contato contato = contatoRepository.findById(id).orElse(null);
        usuario = usuarioService.findById(usuario.getId());
        if(contato == null) {
            throw new ClassNotFoundException("Contato informado não existe");
        }else if(!usuario.getBloqueados().contains(contato)){
            throw new ClassNotFoundException("Contato informado não está bloqueado");
        }
        usuario.getBloqueados().remove(contato);
        usuario.getContatos().add(contato);
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
