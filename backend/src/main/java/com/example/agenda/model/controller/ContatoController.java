package com.example.agenda.model.controller;

import com.example.agenda.model.controller.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.services.ContatoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.UUID;

@RestController
@RequestMapping("/contatos")
public class ContatoController {
    private ContatoService contatoService;

    public ContatoController(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<String> salvarContato(@RequestBody Contato contato, HttpSession session){
        try {
            contatoService.salvarContato(contato, (Usuario) session.getAttribute("usuario"));
            return ResponseEntity.ok().body("Contato salvo");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listar")
    public List<Contato> listarContatos(){
        return contatoService.listar();
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable("id") String id){
        UUID idContato = UUID.fromString(id);
        boolean contatoDeletado = contatoService.deletar(idContato);
        if (contatoDeletado) {

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Contato> editarContato(@PathVariable("id") String id, @RequestBody ContatoEditarDTO contatoEditarDTO){
        UUID idContato = UUID.fromString(id);
        boolean contatoEditado = contatoService.editar(idContato, contatoEditarDTO);
        if (contatoEditado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/bloquear/{id}")
    public ResponseEntity<String> bloquearContato(@PathVariable UUID id, HttpSession session){
        try {
            contatoService.bloquear(id, (Usuario) session.getAttribute("usuario"));
            return ResponseEntity.ok().body("O usuário foi bloqueado");
        }catch (ClassNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/desbloquear/{id}")
    public ResponseEntity<String> desbloquearcontato(@PathVariable UUID id, HttpSession session){
        try {
            contatoService.desbloquear(id, (Usuario) session.getAttribute("usuario"));
            return ResponseEntity.ok().body("O usuário foi desbloqueado");
        }catch (ClassNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> buscarContatoPorId(@PathVariable UUID id, HttpSession session) {
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        if (usuario == null) {
            return ResponseEntity.status(401).build(); // Não autorizado
        }

        Contato contato = contatoService.buscarPorId(id, usuario);
        if (contato != null) {
            return ResponseEntity.ok(contato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
