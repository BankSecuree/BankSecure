package org.example;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    //Inserindo informacoes da conexao mysql
    String serverName = "banksecure";
    String mydb = "banksecure";
    String url = "jdbc:mysql://" + serverName + "/" + mydb;
    String username = "banksecure";
    String password = "";
    Connection conexao;

    Conexao() throws SQLException {
        conexao = DriverManager.getConnection(url,username,password);
    }
}
