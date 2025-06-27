package com.example.agenda.model.services;

import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.controller.dto.UsuarioLogarDto;
import com.example.agenda.model.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    private UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public HttpSession autenticar(UsuarioLogarDto usuarioLogarDto, HttpSession session){
        String login = usuarioLogarDto.getLogin();
        Usuario usuario = repository.findUsuariosByLogin(login).orElseGet(null);
        if(usuario != null){
            if(usuario.getSenha().equals(usuarioLogarDto.getSenha())){
                 session.setAttribute("usuario", usuario);
                 return session;
            }
        }
        return session;
    }
    public Boolean save(Usuario usuario){
        Optional<Usuario> optionalUsuario =  repository.findUsuariosByLogin(usuario.getLogin());
        if(optionalUsuario.isPresent()){
            return false;
        }
        repository.save(usuario);
        return true;
    }
}
