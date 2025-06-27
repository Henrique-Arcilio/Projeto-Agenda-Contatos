package com.example.agenda.model.controller;

import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.controller.dto.UsuarioLogarDto;
import com.example.agenda.model.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(("/usuarios"))
public class UsuarioController {

    private UsuarioService service;
    private HttpSession session;

    public UsuarioController(UsuarioService service, HttpSession session) {
        this.service = service;
        this.session = session;
    }

    @PostMapping
    public ResponseEntity<String> criar(@RequestBody Usuario usuario){
        boolean criado = service.criarConta(usuario);
        if(criado){
            return  ResponseEntity.ok().body("Cadastro criado com sucesso");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Login já existe");

    }
    @PostMapping("/autenticacao")
    public ResponseEntity<String> autenticar(@RequestBody UsuarioLogarDto loginDto, HttpSession session){
        session = service.autenticar(loginDto, session);
        if(session.getAttribute("usuario") != null){
            return ResponseEntity.ok().body("Login validado");
        }
        return ResponseEntity.status(401).body("Login ou senha inválida");
    }


}