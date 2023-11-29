package org.example;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    //Inserindo informacoes da conexao mysql
    String serverName = "localhost:3306";
    String mydb = "bankSecure";
    String url = "jdbc:mysql://" + serverName + "/" + mydb;
    String username = "root";
    String password = "root";
    Connection conexao;

    Conexao() throws SQLException {
        conexao = DriverManager.getConnection(url,username,password);
    }
}
