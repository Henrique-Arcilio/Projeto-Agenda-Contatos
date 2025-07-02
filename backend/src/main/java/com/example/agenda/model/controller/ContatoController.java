package com.example.agenda.model.controller;

import com.example.agenda.model.controller.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;

import com.example.agenda.model.repository.ContatoRepository;

import com.example.agenda.model.entities.Usuario;

import com.example.agenda.model.services.ContatoService;
import com.example.agenda.model.services.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.UUID;

@RestController
@RequestMapping("/contatos")
public class ContatoController {
    private ContatoRepository contatoRepository;
    private final UsuarioService usuarioService;

    private ContatoService contatoService;

    public ContatoController(ContatoService contatoService, UsuarioService usuarioService) {
        this.contatoService = contatoService;
        this.usuarioService = usuarioService;
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
    public List<Contato> listarContatos(HttpSession session){
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuario");
        if(usuarioLogado != null){
            return usuarioLogado.getContatos();
        }
        return null;
    }

    @GetMapping("/listarBloqueados")
    public List<Contato> listarBloqueados(HttpSession session){
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuario");
        if(usuarioLogado != null){
            return contatoService.buscarBloqueados(usuarioLogado.getId());
        }
        return null;
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarContato(@PathVariable("id") String id, HttpSession session){
        UUID idContato = UUID.fromString(id);
        Usuario usuario = (Usuario) session.getAttribute("usuario");
        boolean contatoDeletado = contatoService.deletar(idContato, usuario);
        if (contatoDeletado) {
            session.setAttribute("usuario", usuarioService.findById(usuario.getId()));

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
            return ResponseEntity.status(401).build();
        }
        Contato contato = contatoService.buscarPorId(id, usuario);
        if (contato != null) {
            return ResponseEntity.ok(contato);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/buscar-por-nome")
    public List<Contato> buscarPorNome(@RequestParam String nome) {
        return contatoRepository.buscarPorNome(nome);
    }

    @GetMapping("/buscar-por-email")
    public List<Contato> buscarPorEmail(@RequestParam String email) {
        return contatoRepository.buscarPorEmail(email);
    }

}
