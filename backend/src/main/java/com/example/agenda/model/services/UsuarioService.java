package com.example.agenda.model.services;

import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.controller.dto.UsuarioLogarDto;
import com.example.agenda.model.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {
    private UsuarioRepository repository;
    private PasswordEncoder encriptador;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder encriptador) {
        this.repository = repository;
        this.encriptador = encriptador;
    }

    public HttpSession autenticar(UsuarioLogarDto usuarioLogarDto, HttpSession session){
        session.setAttribute("usuario", null);
        String login = usuarioLogarDto.getLogin();
        Optional<Usuario> opUsuario = repository.findUsuariosByLogin(login);
        if(opUsuario.isPresent()){
            if(encriptador.matches(usuarioLogarDto.getSenha(), opUsuario.get().getSenha())){
                session.setAttribute("usuario", opUsuario.get());
                return session;
            }
        }
        return session;
    }

    public Boolean criarConta(Usuario usuario){
        Optional<Usuario> optionalUsuario =  repository.findUsuariosByLogin(usuario.getLogin());
        if(optionalUsuario.isPresent()){
            return false;
        }
        String senhaEncriptada = encriptador.encode(usuario.getSenha());
        usuario.setSenha(senhaEncriptada);
        repository.save(usuario);
        return true;
    }

    public Usuario save(Usuario usuario){
        return repository.save(usuario);
    }
    public Usuario findById(UUID id){
        return repository.findById(id).orElse(null);
    }
    public Usuario findByTelefone(String telefone){
        return repository.findByTelefone(telefone).orElse(null);
    }
}
