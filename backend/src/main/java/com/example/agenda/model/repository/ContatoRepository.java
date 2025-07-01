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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    Contato findContatoByDono_Id(UUID donoId);
=======
>>>>>>> Stashed changes

    @Query("SELECT c FROM Contato c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Contato> buscarPorNome(@Param("nome") String nome);

    @Query("SELECT c FROM Contato c WHERE LOWER(c.email) LIKE LOWER(CONCAT('%', :email, '%'))")
    List<Contato> buscarPorEmail(@Param("email") String email);
<<<<<<< Updated upstream
=======
>>>>>>> 5544fad20b0f2c703a762bcbc8cc5a0be0e99b62
>>>>>>> Stashed changes
}
