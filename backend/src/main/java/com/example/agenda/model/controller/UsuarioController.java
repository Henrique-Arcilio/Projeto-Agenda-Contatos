package com.example.agenda.model.controller;

import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.controller.dto.UsuarioLogarDto;
import com.example.agenda.model.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
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
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){
        System.out.println();
        usuario = service.save(usuario);
        return  ResponseEntity.status(201).body(usuario);
    }
    @GetMapping("/autenticacao")
    public ResponseEntity<String> autenticar(@RequestBody UsuarioLogarDto loginDto, HttpSession session){
        session = service.autenticar(loginDto, session);
        if(session != null){
            return ResponseEntity.ok().body("Login validado");
        }
        return ResponseEntity.status(401).body("Login ou senha inválida");
    }

}