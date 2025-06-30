package com.example.agenda.model.controller.dto;

public class UsuarioLogarDto {
    private String login;
    private String senha;

    public UsuarioLogarDto(String senha, String login) {
        this.senha = senha;
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
