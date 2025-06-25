package com.example.agenda.model.repository;

import com.example.agenda.model.entities.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ContatoRepository extends JpaRepository<Contato, UUID> {
    Optional<Contato> findByTelefone(String telefone);
}
