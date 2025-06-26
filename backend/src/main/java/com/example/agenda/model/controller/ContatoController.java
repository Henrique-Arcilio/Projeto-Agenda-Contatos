package com.example.agenda.model.controller;

import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.services.ContatoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
