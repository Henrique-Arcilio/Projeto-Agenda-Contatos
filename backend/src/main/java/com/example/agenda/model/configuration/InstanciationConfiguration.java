package com.example.agenda.model.configuration;

import com.example.agenda.model.entities.Contato;
import com.example.agenda.model.entities.Usuario;
import com.example.agenda.model.repository.ContatoRepository;
import com.example.agenda.model.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InstanciationConfiguration implements CommandLineRunner {
    private ContatoRepository contatoRepository;
    private UsuarioRepository usuarioRepository;

    public InstanciationConfiguration(ContatoRepository contatoRepository, UsuarioRepository usuarioRepository) {
        this.contatoRepository = contatoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Fazer isso quando o responsavel pelo login entregar o login com a section
        Usuario usuario = new Usuario("jjdja", "yasminsarinho", "41040242");
        Contato contato = new Contato("aldo djdjsj", "454", "yafsdfssjsj@hahsj");

        usuario.getContatos().add(contato);
        contatoRepository.save(contato);
        usuarioRepository.save(usuario);
    }
}
