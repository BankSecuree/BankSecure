-- Active: 1692322487627@@127.0.0.1@3306@bankSecure
DROP DATABASE IF EXISTS bankSecure;
CREATE DATABASE bankSecure;
USE bankSecure;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpjEmpresa CHAR (14),
razaoSocial VARCHAR(100),
cep CHAR(8),
logradouro VARCHAR(150),
numero INT,
telefoneEmpresa VARCHAR(14)
);

CREATE TABLE agencia(
idAgencia INT PRIMARY KEY AUTO_INCREMENT,
cnpjAgencia CHAR (14),
apelido VARCHAR (45),
logradouro VARCHAR(150),
numero INT,
CEP CHAR(8),
telefoneAgencia VARCHAR(14),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
	senha VARCHAR(16),
	nome VARCHAR(50),
    cpf CHAR(11),
    telefone CHAR(14),
    dataNascimento DATE,
	foto VARCHAR(255),
    dataInicio DATE,
    cargo VARCHAR(25),
    fkGerente INT,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkGerente) REFERENCES usuario(idUsuario)
);

CREATE TABLE funcionarioAgencia(
	fkUsuario INT,
	fkAgencia INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario), 
	FOREIGN KEY (fkAgencia) REFERENCES agencia (idAgencia),
    PRIMARY KEY (fkUsuario, fkAgencia)
);

CREATE TABLE tipoMaquina(
	idTipoMaquina INT PRIMARY KEY AUTO_INCREMENT,
	nomeTipo  VARCHAR(45)
);

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	fkAgencia INT,
    fkTipoMaquina INT,
    nome VARCHAR(45) UNIQUE, 
	FOREIGN KEY (fkAgencia) REFERENCES agencia(idAgencia) ON DELETE CASCADE,
	FOREIGN KEY (fkTipoMaquina) REFERENCES tipoMaquina(idTipoMaquina) ON DELETE CASCADE
);

CREATE TABLE registros(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
fkMaquina INT,
fkComponente INT,
valor DOUBLE,
dataHora DATETIME,
FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE
);


CREATE TABLE componente (
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),  
    unidadeMedida VARCHAR(10)
);

CREATE TABLE maquinaComponente (
	fkMaquina INT,
    fkComponente INT,
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE,
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente) ON DELETE CASCADE,
    PRIMARY KEY (fkMaquina, fkComponente)
);


-- PROCEDURE PARA CADASTRAR AGENCIAS
DELIMITER //
CREATE PROCEDURE cadastrarAgencia(IN 
    agencia_apelido VARCHAR(45),
    agencia_CNPJ CHAR(14),
    agencia_CEP CHAR(8),
	agencia_logradouro VARCHAR(150),
	agencia_numero VARCHAR(20),
	agencia_telefone VARCHAR(11),
    agencia_fkEmpresa int
)
BEGIN
	INSERT INTO agencia (apelido, cnpjAgencia, CEP, logradouro, numero, telefoneAgencia, fkEmpresa) 
		VALUES (agencia_apelido, agencia_CNPJ, agencia_cep, agencia_logradouro, agencia_numero, agencia_telefone, agencia_fkEmpresa);
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE inserirDadosMaquina(IN 
    ma_user VARCHAR(45),
    co1_nome VARCHAR(45),
    re1_valor DOUBLE,
    co2_nome VARCHAR(45),
    re2_valor DOUBLE,
    co3_nome VARCHAR(45),
    re3_valor DOUBLE,
    re_data DATETIME
)
BEGIN
	INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
	((SELECT idMaquina FROM vw_maquina WHERE nome = ma_user), (SELECT idComponente FROM componente WHERE nome = co1_nome), re1_valor, re_data);
    INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
	((SELECT idMaquina FROM vw_maquina WHERE nome = ma_user), (SELECT idComponente FROM componente WHERE nome = co2_nome), re2_valor, re_data);
    INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
	((SELECT idMaquina FROM vw_maquina WHERE nome = ma_user), (SELECT idComponente FROM componente WHERE nome = co3_nome), re3_valor, re_data);
END//
DELIMITER ;

-- CHAMAR PROCEDURE
DELIMITER //
CREATE PROCEDURE cadastrar_empresaGerente(IN 
    emp_cnpjEmpresa CHAR(14),
	emp_razaoSocial VARCHAR(100),
	emp_logradouro VARCHAR(150),
	emp_numero INT,
	emp_CEP CHAR(8),
	emp_telefone VARCHAR(14),
	us_email VARCHAR(50),	
	us_senha VARCHAR(16),
	us_nome VARCHAR(50),
    us_cpf CHAR(11),
    us_telefone VARCHAR(14),
    us_dataNascimento DATE,
    us_cargo VARCHAR(25),
    us_fkGerente INT,
    us_dataInicio DATE
)
BEGIN
	INSERT INTO empresa (cnpjEmpresa, razaoSocial, logradouro, numero, CEP, telefoneEmpresa) 
		VALUES (emp_cnpjEmpresa, emp_razaoSocial, emp_logradouro, emp_numero, emp_CEP, emp_telefone);
	INSERT INTO usuario (email, senha, nome, cpf, telefone, dataNascimento, fkEmpresa,cargo, fkGerente, dataInicio) 
		VALUES (us_email, us_senha, us_nome, us_cpf, us_telefone, us_dataNascimento, (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = emp_cnpjEmpresa), us_cargo, us_fkGerente, us_dataInicio);
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE cadastrar_tipoMaquina(
	maqn_fkTipoMaquina INT
)
BEGIN 
	INSERT INTO maquina (fkTipoMaquina) VALUES (maqn_fkTipoMaquina);
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE cadastrar_maquinaComponente(
	maco_fkComponente INT
)
BEGIN 
	INSERT INTO maquinaComponente (fkMaquina,fkComponente) VALUES ((SELECT MAX(idMaquina) FROM maquina),maco_fkComponente);
END//
DELIMITER ;

-- CONTA BANK SECURE 
DROP USER IF EXISTS 'user_bankSecure'@'localhost';
CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'Urubu_100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_empresaGerente to 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrarAgencia to 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_maquinaComponente to 'user_bankSecure'@'localhost';
GRANT EXECUTE ON  PROCEDURE cadastrar_tipoMaquina to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

-- CONTA ITAU
DROP USER IF EXISTS 'bs_itau'@'localhost';
CREATE USER 'bs_itau'@'localhost' IDENTIFIED BY 'Itau_100';
GRANT INSERT, SELECT ON bankSecure.registros TO 'bs_itau'@'localhost';
GRANT INSERT, SELECT ON bankSecure.maquinaComponente TO 'bs_itau'@'localhost';
GRANT INSERT, SELECT ON bankSecure.maquina TO 'bs_itau'@'localhost';
GRANT EXECUTE ON PROCEDURE inserirDadosMaquina to 'bs_itau'@'localhost';
FLUSH PRIVILEGES;



-- ADMIN
INSERT INTO empresa (razaoSocial, cnpjEmpresa, idEmpresa) VALUES ('Bank Secure', 12345678901234, 1);
INSERT INTO usuario (email, senha, nome, fkEmpresa, cargo, dataInicio) VALUES ('banksecure@contato.com', '12345', 'Admin Bank Secure', 1, 'Admin', '2023-08-01');

-- GERENTES
INSERT INTO empresa (razaoSocial, cnpjEmpresa, cep, logradouro, numero, telefoneEmpresa) VALUES ('BANCO ITAUCARD S.A.', 17192451000170, '04344902', 'PRACA ALFREDO EGYDIO DE SOUZA ARANHA 100', 100, '(11) 4004-4828');
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente,cpf, telefone, cargo, dataInicio) VALUES ('gerenteitau@bs.com', '12345', 'Fernando Brandão', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 1,12312312300, '(11)90000-1111', 'Gerente de TI', '2023-08-01');

-- ANALISTAS
INSERT INTO usuario (email, senha, nome, cpf, telefone, cargo, dataNascimento, fkEmpresa, fkGerente, dataInicio) VALUES ('analista1itau@bs.com', '12345', 'Julia Lima', '54779854112', '11985698741', 'Analista', '2000-10-24', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 2, '2023-08-01');
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente, dataInicio) VALUES ('analista1itau2@bs.com', '12345', 'Celso Fernandes', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 2, '2023-08-01');
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente, dataInicio) VALUES ('analista1itau3@bs.com', '12345', 'Carolina Barros', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 2, '2023-08-01');

-- AGENCIA
INSERT INTO agencia (cnpjAgencia, apelido, logradouro, numero, CEP, telefoneAgencia, fkEmpresa) VALUES ('60701190031328', 'Itau Rudge Ramos', 'Rua Rudge Ramos', 80, '09772040', '1130034828', 2);
INSERT INTO agencia (cnpjAgencia, apelido, logradouro, numero, CEP, telefoneAgencia, fkEmpresa) VALUES ('12658742036578', 'Itau Cidade Dutra', 'Av. Sen. Teotônio Vilela', 1192, '04801000', '1140028922', 2);
-- FUNCIONARIOAGENCIA
INSERT INTO funcionarioAgencia VALUES (3,1);
INSERT INTO funcionarioAgencia VALUES (2,1);
INSERT INTO funcionarioAgencia VALUES (2,2);
-- INSERT INTO funcionarioAgencia VALUES (3,2);

-- TIPOMAQUINA
INSERT INTO tipoMaquina VALUES (1,"Servidor"), (2,"Caixa Eletrônico");

-- MAQUINA
INSERT INTO maquina (nome, fkAgencia, fkTipoMaquina) VALUES ('MI-1', 1, 2);
INSERT INTO maquina (nome, fkAgencia, fkTipoMaquina) VALUES ('MI-2', 1, 2);
INSERT INTO maquina (nome, fkAgencia, fkTipoMaquina) VALUES ('MI-3', 1, 2);
INSERT INTO maquina (nome, fkAgencia, fkTipoMaquina) VALUES ('SI-1', 1, 1);

-- SERVIDOR
-- INSERT INTO servidor (nome, fkMaquina) VALUES ('SV-1', 1);

-- COMPONENTE
INSERT INTO componente (nome, unidadeMedida) VALUES
-- ('CPU', 'GHZ'), ('Memória', 'GB'), ('Disco', 'KB'),
('CPU', '%'), ('Memória', '%'), ('Disco', '%');

-- MAQUINA COMPONENTE
INSERT INTO maquinaComponente (fkMaquina, fkComponente) VALUES (1, 1), (2, 2);
INSERT INTO maquinaComponente (fkMaquina, fkComponente) VALUES (3,3);



-- VIEW
DROP VIEW IF EXISTS vw_maquina;
CREATE OR REPLACE VIEW vw_maquina AS SELECT * FROM maquina;

DROP VIEW IF EXISTS vw_componente;
CREATE OR REPLACE VIEW vw_componente AS SELECT * FROM componente;

DROP VIEW IF EXISTS vw_registrosEstruturados;
CREATE OR REPLACE VIEW vw_registrosEstruturados AS 
SELECT registros.fkMaquina as "ID", maquina.nome as "Nome", registros.dataHora as "Data",
MAX( CASE WHEN registros.fkComponente = 1 THEN registros.valor END ) "cpuu" ,
MAX( CASE WHEN registros.fkComponente = 2 THEN registros.valor END ) "memoria" ,
MAX( CASE WHEN registros.fkComponente = 3 THEN registros.valor END ) "disco"
FROM registros JOIN maquina ON fkMaquina = idMaquina
GROUP BY registros.fkMaquina, registros.dataHora
ORDER BY registros.fkMaquina, registros.dataHora ASC;


DROP VIEW IF EXISTS vw_donut_servidor;
CREATE OR REPLACE VIEW vw_donut_servidor AS 
SELECT (SELECT count(id) as critico FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 90) as s_cpu_critico,
	   (SELECT count(id) as alerta FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_cpu_alerta,
	   (SELECT count(id) as ideal FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_cpu_ideal,
	   (SELECT count(id) as critico FROM (SELECT id, avg(memoria) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 90) as s_mem_critico,
	   (SELECT count(id) as alerta FROM (SELECT id, avg(memoria) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_mem_alerta,
       (SELECT count(id) as ideal FROM (SELECT id, avg(memoria)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_mem_ideal,
       (SELECT count(id) as critico FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 90) as s_disco_critico,
       (SELECT count(id) as alerta FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_disco_alerta,
       (SELECT count(id) as ideal FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 1 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_disco_ideal;

DROP VIEW IF EXISTS vw_donut_maquina;
CREATE OR REPLACE VIEW vw_donut_maquina AS 
SELECT (SELECT count(id) as critico FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 90) as s_cpu_critico,
	   (SELECT count(id) as alerta FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_cpu_alerta,
	   (SELECT count(id) as ideal FROM (SELECT id, avg(cpuu) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_cpu_ideal,
	   (SELECT count(id) as critico FROM (SELECT id, avg(memoria) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 90) as s_mem_critico,
	   (SELECT count(id) as alerta FROM (SELECT id, avg(memoria) as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_mem_alerta,
       (SELECT count(id) as ideal FROM (SELECT id, avg(memoria)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_mem_ideal,
       (SELECT count(id) as critico FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 90) as s_disco_critico,
       (SELECT count(id) as alerta FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 70 AND media < 90) as s_disco_alerta,
       (SELECT count(id) as ideal FROM (SELECT id, avg(disco)as media FROM vw_registrosEstruturados, vw_maquina WHERE id = idMaquina AND fkTipoMaquina = 2 GROUP BY id) as m WHERE media >= 0 AND media < 70) as s_disco_ideal;
       
DROP VIEW IF EXISTS vw_servidor1;
CREATE OR REPLACE VIEW vw_servidor1 AS SELECT * FROM vw_registrosEstruturados WHERE id = 4;

-- SELECT * FROM usuario LEFT JOIN funcionarioAgencia ON fkUsuario = idUsuario WHERE fkAgencia IS NULL AND fkUsuario IS NOT NULL;
-- JOIN agencia ON fkAgencia = idAgencia and idUsuario = 3;


