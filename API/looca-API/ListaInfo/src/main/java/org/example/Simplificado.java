package org.example;

import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.sistema.Sistema;

public class Simplificado {
    public static void main(String[] args) {
        Looca luquinhas = new Looca();

        System.out.println(" - LISTA DE INFORMAÇÕES SIMPLIFICADA - \n");

        System.out.println("- INFORMAÇÕES BÁSICAS DO SISTEMA ");
        Sistema sistema = luquinhas.getSistema();
        sistema.getPermissao();
        sistema.getArquitetura();
        sistema.getSistemaOperacional();
        System.out.println(sistema);

        System.out.println("- PROCESSADOR EM USO: ");
        Processador processador =  luquinhas.getProcessador();
        System.out.println(Math.floor(processador.getUso())+ "% \n");

        Memoria memoria =  luquinhas.getMemoria();
        memoria.getDisponivel();
        memoria.getEmUso();
        memoria.getTotal();
        System.out.println(" - INFORMAÇÕES BÁSICAS DE MEMÓRIA: ");
        System.out.println(memoria);

    }
}
