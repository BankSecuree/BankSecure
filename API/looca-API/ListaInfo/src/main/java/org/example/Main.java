package org.example;


import java.time.LocalDateTime;
import java.util.Date;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.processos.Processo;
import com.github.britooo.looca.api.group.rede.Rede;
import com.github.britooo.looca.api.group.sistema.Sistema;
import com.mysql.cj.jdbc.StatementImpl;

import javax.swing.plaf.nimbus.State;
import java.sql.SQLException;
import java.sql.SQLOutput;
import java.sql.Statement;
import java.util.List;

import static java.lang.Math.ceil;
import static java.lang.Math.round;


public class Main {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_YELLOW = "\u001B[33m";


    public static void main(String[] args) throws SQLException, InterruptedException {
        try {
            Conexao con =  new Conexao();
            Statement st = con.conexao.createStatement();

            //Inserindo as unidades respectivas aos valores que serao inseridos no banco
            st.executeUpdate("INSERT INTO componente (nome, unidadeMedida) values ('Uso de disco', 'Gb')");
            st.executeUpdate("INSERT INTO componente (nome, unidadeMedida) values ('Frequencia de CPU', 'GHz')");
            st.executeUpdate("INSERT INTO componente (nome, unidadeMedida) values ('Uso de memoria', 'Gb')");
        } catch (SQLException e) {
            System.out.println("Não foi possível conectar ao MySQL" + e);
        }


        while (true) {

            Looca looca = new Looca();

            System.out.println(ANSI_YELLOW + "₊❏❜ ⋮LISTA DE INFORMAÇÕES LOOCA ⌒" + ANSI_RESET);


            System.out.println(ANSI_YELLOW + " ★・・・・・・★ ★・・・・・・★ ★・・・・・・★ \n" + ANSI_RESET);

            System.out.println(ANSI_YELLOW + " ╰┈➤ INFORMAÇÕES DO SISTEMA: \n" + ANSI_RESET);
            Sistema sistema = looca.getSistema();
            sistema.getPermissao();
            sistema.getFabricante();
            sistema.getArquitetura();
            sistema.getInicializado();
            sistema.getSistemaOperacional();
            sistema.getArquitetura();
            sistema.getTempoDeAtividade();
            System.out.println("╭── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╮");
            System.out.println(sistema);
            System.out.println("╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╯\n");

            System.out.println(ANSI_YELLOW + " ╰┈➤ INFORMAÇÔES DO PROCESSADOR: \n" + ANSI_RESET);
            Processador processador = looca.getProcessador();
            processador.getFabricante();
            processador.getFrequencia();
            processador.getId();
            processador.getIdentificador();
            processador.getNumeroCpusFisicas();
            processador.getNumeroCpusLogicas();
            processador.getNumeroPacotesFisicos();
            processador.getMicroarquitetura();
            processador.getUso();
            processador.getNome();
            System.out.println("╭── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╮");
            System.out.println(processador);
            System.out.println("╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╯\n");


            System.out.println(ANSI_YELLOW + " ╰┈➤ INFORMAÇÕES DE MEMÓRIA : \n" + ANSI_RESET);

            Memoria memoria = looca.getMemoria();
            memoria.getDisponivel();
            memoria.getEmUso();
            memoria.getTotal();
            System.out.println("╭── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╮");
            System.out.println(memoria);
            System.out.println("╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╯\n");

            System.out.println(ANSI_YELLOW + " ╰┈➤  INFORMAÇÕES DOS DISCOS : \n " + ANSI_RESET);
            DiscoGrupo grupoDeDiscos = looca.getGrupoDeDiscos();
            List<Disco> discos = grupoDeDiscos.getDiscos();
            System.out.println("╭── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╮");
            for (Disco disco : discos) {
                System.out.println(disco);
            }
            System.out.println("╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╯\n");

            //Tratando informacoes antes de inserir no banco
            DiscoGrupo disco = looca.getGrupoDeDiscos();
            List<Volume> volumes = disco.getVolumes();
            Long volumeTotal = 0L;
            Long volumeDisponivel = 0L;
            Long volumeEmUsoProvisorio = 0L;
            for (Volume volume : volumes) {
                volumeTotal = volume.getTotal();
                volumeDisponivel = volume.getDisponivel();
            }

            volumeEmUsoProvisorio = (volumeTotal - volumeDisponivel);
            Double UsoDisco = ceil((double) volumeEmUsoProvisorio / 1073741824);
            Double freqCpu = ceil((double) processador.getFrequencia() / 1000000000);
            Double usoCpu = Math.round(processador.getUso() * 100.0) / 100.0;
            Double usoMemoria = ceil((double) memoria.getEmUso() / 1073741824);

            //Obtendo a data e a hora em que as informacoes foram adquiridas
            LocalDateTime dataHoraAtual = LocalDateTime.now();


            Integer dia = dataHoraAtual.getDayOfMonth();
            Integer mes = dataHoraAtual.getMonthValue();
            Integer ano = dataHoraAtual.getYear();
            Integer hora = dataHoraAtual.getHour();
            Integer minuto = dataHoraAtual.getMinute();
            Integer segundo = dataHoraAtual.getSecond();

            //Variaveis para pegar os Serviços - Mateus
            String sistemaAtual = looca.getSistema().toString();

            String frase = sistemaAtual;
            String array[] = new String[1];

            array = frase.split(":");
            frase = array[1];
            array = frase.split("F");
            System.out.println("=".repeat(15));
            System.out.println(array[0]);


            Integer servicoAtivo = looca.getGrupoDeServicos().getTotalServicosAtivos();
            Integer servicoInativo = looca.getGrupoDeServicos().getTotalServicosInativos();
            //Fim - Mateus


            //Inserindo os dados no banco
            try {
                Conexao con2 = new Conexao();
                Statement st2 = con2.conexao.createStatement();

                //Criando variavel de string para a data atual
                String dataAtualInterpolado = ano + "-" + mes + "-" + dia + " " + hora + ":" + minuto + ":" + segundo;

                //Serviços - Mateus
//                String select = "SELECT COUNT(idMaquina) FROM maquina";
//                st2.execute(select);

//                System.out.println("Esse é o select: " + st2.executeUpdate(select));

                String processosMI1Ativo = "INSERT INTO processo (fkMaquina, valor, dataHora, statusProcesso) VALUES (1, " + servicoAtivo + ", '" + dataAtualInterpolado + "', 'Ativo')";
                st2.executeUpdate(processosMI1Ativo);

                String processosMI1Inativo = "INSERT INTO processo (fkMaquina, valor, dataHora, statusProcesso) VALUES (1, " + servicoInativo + ", '" + dataAtualInterpolado + "', 'Inativo')";
                st2.executeUpdate(processosMI1Inativo);

//                System.out.println("ESSA MERDA: " + sistemaAtual);
                String soMI2 = "UPDATE maquina SET so = '" + array[0] + "' WHERE idMaquina = 1";
                st2.executeUpdate(soMI2);

                String processosMI2Ativo = "INSERT INTO processo (fkMaquina, valor, dataHora, statusProcesso) VALUES (2, " + (servicoAtivo + 50) + ", '" + dataAtualInterpolado + "', 'Ativo')";
                st2.executeUpdate(processosMI2Ativo);

                String processosMI2Inativo = "INSERT INTO processo (fkMaquina, valor, dataHora, statusProcesso) VALUES (2, " + (servicoInativo + 50) + ", '" + dataAtualInterpolado + "', 'Inativo')";
                st2.executeUpdate(processosMI2Inativo);
                //Fim - Mateus

                //Insert uso de CPU
                String queryUsoCpu = "INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES (1, 1, " + usoCpu + ", '" + dataAtualInterpolado + "')";
                st2.executeUpdate(queryUsoCpu);


                //Insert freq de CPU
                String queryFreqCpu = "INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES (1, 5, " + freqCpu + ", '" + dataAtualInterpolado + "')";
                st2.executeUpdate(queryFreqCpu);


                //Insert uso de memoria
                String queryUsoMemoria = "INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES (1, 6, " + usoMemoria + ", '" + dataAtualInterpolado + "')";
                st2.executeUpdate(queryUsoMemoria);


                //Inserindo volume em uso de disco
                String queryVolumeDisco = "INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES (1, 4, " + UsoDisco + ", '" + dataAtualInterpolado + "')";
                st2.executeUpdate(queryVolumeDisco);

            } catch (SQLException e) {
                System.out.println("Erro ao tentar conexao com MySQL: " + e);
            }

            Thread.sleep(5000);

        }
    }
}
