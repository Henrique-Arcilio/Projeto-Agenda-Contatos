package com.example.agenda.model.services;

import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {
    private ContatoRepository contatoRepository;

    public ContatoService(ContatoRepository contatoRepository) {
        this.contatoRepository = contatoRepository;
    }

    public Contato salvar(Contato contato){
        Optional<Contato> existente = contatoRepository.findByTelefone(contato.getTelefone());
        if (existente.isEmpty()) {
            return contatoRepository.save(contato);
        }
        return null;
    }

    public List<Contato> listar(){
        return contatoRepository.findAll();
    }
}
