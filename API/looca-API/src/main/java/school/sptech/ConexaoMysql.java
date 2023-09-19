package school.sptech;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class ConexaoMysql {

    private JdbcTemplate conexaoBanco;

    public ConexaoMysql(){
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost/bankSecure");

        /*MUDAR PARA O SEU USUÁRIO MYSQL PARA TESTES*/
        dataSource.setUsername("root");
        dataSource.setPassword("Nino0911");

        conexaoBanco = new JdbcTemplate(dataSource);



    }
    public JdbcTemplate getConexaoBanco() {
        return conexaoBanco;
    }
}
