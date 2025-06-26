package com.example.agenda.model.controller;

import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.services.ContatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    public Contato  salvarContato(@RequestBody Contato contato){
        contatoService.salvar(contato);
        return contato;
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
}
