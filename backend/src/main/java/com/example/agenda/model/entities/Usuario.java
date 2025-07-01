package com.example.agenda.model.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nome;
    private String login;
    private String senha;
    private String telefone;
    @OneToMany (mappedBy = "dono", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Contato> contatos;

    public Usuario(String nome, String login, String senha, String telefone) {
       this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.telefone = telefone;
        contatos = new ArrayList<>();
    }

}
