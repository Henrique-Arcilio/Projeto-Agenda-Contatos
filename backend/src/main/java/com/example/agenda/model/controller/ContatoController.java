package com.example.agenda.model.controller;

import com.example.agenda.model.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.repository.ContatoRepository;
import com.example.agenda.model.services.ContatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    private ContatoRepository contatoRepository;
    private ContatoService contatoService;

    public ContatoController(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    @PostMapping("/salvar")
    public Contato  salvarContato(@RequestBody Contato contato){
        contatoService.salvar(contato);
        return contato;
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Contato> editarContato(@PathVariable("id") String id, @RequestBody ContatoEditarDTO contatoEditarDTO){
        UUID idContato = UUID.fromString(id);
        boolean contatoEditado = contatoService.editar(idContato, contatoEditarDTO);
        if (contatoEditado) {
            return ResponseEntity.noContent().build();
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
