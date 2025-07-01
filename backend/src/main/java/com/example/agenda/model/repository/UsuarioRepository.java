package com.example.agenda.model.repository;

import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    Optional<Usuario> findUsuariosByLogin(String login);
    Optional<Usuario> findByTelefone(String telefone);
}