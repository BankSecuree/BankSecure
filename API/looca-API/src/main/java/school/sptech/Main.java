package school.sptech;


import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.ProcessoGrupo;
import com.github.britooo.looca.api.group.servicos.ServicoGrupo;
import com.github.britooo.looca.api.group.sistema.Sistema;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static java.lang.Math.pow;
import static java.lang.Math.round;

public class Main {
    public static void main(String[] args) {
        Looca looca = new Looca();

        ConexaoMysql conexao = new ConexaoMysql();
        JdbcTemplate con = conexao.getConexaoBanco();


        Sistema sistema = looca.getSistema();
        Memoria memoria = looca.getMemoria();
        Processador processador = looca.getProcessador();
        DiscoGrupo discoGrupo = looca.getGrupoDeDiscos();
        ServicoGrupo servicoGrupo = looca.getGrupoDeServicos();
        ProcessoGrupo processosGrupo = looca.getGrupoDeProcessos();
        DiscoGrupo grupoDeDiscos = new DiscoGrupo();
        List<Disco> discos = grupoDeDiscos.getDiscos();
        List<Volume> volumes = grupoDeDiscos.getVolumes();
        Integer qtdVolumes = grupoDeDiscos.getQuantidadeDeVolumes();
        System.out.println("qtd " + qtdVolumes);
        for (Disco disco : discos) {
        System.out.println(round(disco.getTamanho()/pow(10,9)) + " GB");
        }
        for (Volume volume : volumes){
            System.out.println(round(volume.getDisponivel()/pow(10,9)) + " GB livres");
        }

        con.execute("INSERT INTO registros(fkComponente, valor) VALUES (?, ?)");

    }
}