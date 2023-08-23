-- Active: 1692322487627@@127.0.0.1@3306@bankSecure
/* Comandos para mysql - banco local - ambiente de desenvolvimento */
DROP DATABASE IF EXISTS bankSecure;
CREATE DATABASE bankSecure;
USE bankSecure;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpjEmpresa CHAR (14),
razaoSocial VARCHAR(45),
cep CHAR(8),
logradouro VARCHAR(150),
numero INT,
telefone VARCHAR(11)
);

CREATE TABLE agencia(
idAgencia INT PRIMARY KEY AUTO_INCREMENT,
cnpjAgencia CHAR (14),
apelido VARCHAR (45),
logradouro VARCHAR(150),
numero INT,
CEP CHAR(8),
telefone VARCHAR(11),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
	senha VARCHAR(16),
	nome VARCHAR(50),
    cpf CHAR(11),
    telefone CHAR(11),
    dataNascimento DATE,
	foto VARCHAR(255),
    dataInicio DATE,
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

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	fkAgencia INT,
    nome VARCHAR(45), 
	FOREIGN KEY (fkAgencia) REFERENCES agencia(idAgencia)
);

CREATE TABLE registros(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
fkMaquina INT,
fkComponente INT,
valor INT,
dataHora DATETIME,
FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina)
);

CREATE TABLE componente (
	idComponente INT PRIMARY KEY,
    nome VARCHAR(45),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE maquinaComponente (
	fkMaquina INT,
    fkComponente INT,
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina),
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente),
    PRIMARY KEY (fkMaquina, fkComponente)
);

-- PROCEDURE PARA CADASTRAR AGENCIAS
DELIMITER //
CREATE PROCEDURE cadastrarAgencia(IN 
    agencia_apelido VARCHAR(45),
    agencia_CNPJ CHAR(14),
	agencia_logradouro VARCHAR(150),
	agencia_numero INT,
	agencia_CEP CHAR(8),
	agencia_telefone VARCHAR(11)
)
BEGIN
	INSERT INTO agencia (CNPJ, apelido, logradouro, numero, CEP, telefone) 
		VALUES (agencia_apelido, agencia_CNPJ, agencia_logradouro, agencia_numero, agencia_CEP, agencia_telefone);
END//
DELIMITER ;

-- CHAMAR PROCEDURE
DELIMITER //
CREATE PROCEDURE cadastrarAgencia(IN 
    emp_CNPJ CHAR(14),
=======
CREATE PROCEDURE cadastrar_empresaGerente(IN 
    emp_cnpjEmpresa CHAR(14),
>>>>>>> 9ac6d1cba34fe2b6f43d8af445715be0b3db789c
	emp_razaoSocial VARCHAR(50),
	emp_logradouro VARCHAR(150),
	emp_numero INT,
	emp_CEP CHAR(8),
	emp_telefone VARCHAR(11),
	us_email VARCHAR(50),
	us_senha VARCHAR(16),
	us_nome VARCHAR(50),
    us_cpf CHAR(11),
    us_telefone VARCHAR(11),
    us_dataNascimento DATE
    -- us_gerente INT,
	-- us_foto VARCHAR(255),
)
BEGIN
	INSERT INTO empresa (cnpjEmpresa, razaoSocial, logradouro, numero, CEP, telefone) 
		VALUES (emp_cnpjEmpresa, emp_razaoSocial, emp_logradouro, emp_numero, emp_CEP, emp_telefone);
	INSERT INTO usuario (email, senha, nome, cpf, telefone, dataNascimento, fkEmpresa) 
		VALUES (us_email, us_senha, us_nome, us_cpf, us_telefone, us_dataNascimento, (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = emp_cnpjEmpresa));
END//
DELIMITER ;

<<<<<<< HEAD
-- CALL cadastrar_usuario ("bruno","");

=======
>>>>>>> 9ac6d1cba34fe2b6f43d8af445715be0b3db789c
DROP USER IF EXISTS 'user_bankSecure'@'localhost';
CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_empresaGerente to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

-- ADMIN
INSERT INTO empresa (razaoSocial, cnpjEmpresa, idEmpresa) VALUES ('Bank Secure', 12345678901234, 1);
INSERT INTO usuario (email, senha, nome, fkEmpresa) VALUES ('banksecure@contato.com', '12345', 'Admin Bank Secure', 1);
-- GERENTES
INSERT INTO empresa (razaoSocial, cnpjEmpresa) VALUES ('Itau', 17192451000170);
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('gerenteitau@contato.com', '12345', 'Fernando Brandão', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 1);
-- ANALISTAS
<<<<<<< HEAD
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('lider1itau@contato.com', '12345', 'Julia Lima', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 12345678901234), 2);
=======
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('lider1itau@contato.com', '12345', 'Julia Lima', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 12345678901234), 2);

SELECT * FROM usuario;
SELECT * FROM empresa;


>>>>>>> 9ac6d1cba34fe2b6f43d8af445715be0b3db789c
