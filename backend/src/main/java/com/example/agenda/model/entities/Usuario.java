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
    @OneToMany (fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Contato> contatos;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Contato> bloqueados;

    public Usuario(String nome, String login, String senha) {
       this.nome = nome;
        this.login = login;
        this.senha = senha;
        contatos = new ArrayList<>();
    }

}
