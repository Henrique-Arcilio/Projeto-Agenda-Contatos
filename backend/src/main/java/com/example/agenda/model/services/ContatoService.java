package com.example.agenda.model.services;

import com.example.agenda.model.dto.ContatoEditarDTO;
import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public boolean deletar(UUID id){
        if (contatoRepository.existsById(id)){
            contatoRepository.deleteById(id);
            return true;
        }
        return false;

    public boolean editar(UUID id, ContatoEditarDTO contatoEditarDTO){
        Contato contato = contatoRepository.findById(id).get();
        contato.setNome(contatoEditarDTO.getNome());
        contato.setTelefone(contatoEditarDTO.getTelefone());
        contato.setEmail(contatoEditarDTO.getEmail());
        contatoRepository.save(contato);
        return true;
    }
}
