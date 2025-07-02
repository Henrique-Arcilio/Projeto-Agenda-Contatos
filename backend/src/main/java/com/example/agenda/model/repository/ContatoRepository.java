package com.example.agenda.model.repository;

import com.example.agenda.model.entities.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContatoRepository extends JpaRepository<Contato, UUID> {
    Optional<Contato> findByTelefone(String telefone);

    Contato findContatoByDono_Id(UUID donoId);

    @Query("SELECT c FROM Contato c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Contato> buscarPorNome(@Param("nome") String nome);

    @Query("SELECT c FROM Contato c WHERE LOWER(c.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<Contato> buscarPorEmail(@Param("email") String email);
}
