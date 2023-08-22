-- Active: 1692279316574@@127.0.0.1@3306@bankSecure
/* Comandos para mysql - banco local - ambiente de desenvolvimento */
DROP DATABASE IF EXISTS bankSecure;
CREATE DATABASE bankSecure;
USE bankSecure;

CREATE TABLE empresa(
CNPJ CHAR (14) PRIMARY KEY,
-- idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(50),
logradouro VARCHAR(150),
numero INT,
CEP CHAR(8),
telefone VARCHAR(11)
);

CREATE TABLE agencia(
CNPJ CHAR (14) PRIMARY KEY,
-- idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
apelido VARCHAR (45),
logradouro VARCHAR(150),
numero INT,
CEP CHAR(8),
telefone VARCHAR(11),
fkEmpresa CHAR(14),
FOREIGN KEY (fkEmpresa) REFERENCES empresa(CNPJ)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
	senha VARCHAR(16),
	nome VARCHAR(50),
    cpf CHAR(11),
    telefone CHAR(11),
    dataNascimento DATE,
    fkGerente INT,
	foto VARCHAR(255),
    fkEmpresa CHAR(14),
    dataInicio DATE,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(CNPJ),
    FOREIGN KEY (fkGerente) REFERENCES usuario(idUsuario)
);

CREATE TABLE funcionarioAgencia(
	fkUsuario INT,
	fkAgencia CHAR(14),
	FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario), 
	FOREIGN KEY (fkAgencia) REFERENCES agencia (CNPJ),
    PRIMARY KEY (fkUsuario, fkAgencia)
);

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45), 
	fkAgencia CHAR(14),
	FOREIGN KEY (fkAgencia) REFERENCES agencia(CNPJ)
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
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

DELIMITER //
CREATE PROCEDURE cadastrar_empresaGerente(IN 
    emp_CNPJ CHAR(14),
	emp_razaoSocial VARCHAR(50),
	emp_nomeFantasia VARCHAR(100),
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
	INSERT INTO empresa (CNPJ, razaoSocial, nomeFantasia, logradouro, numero, CEP, telefone) 
		VALUES (emp_CNPJ, emp_razaoSocial, emp_nomeFantasia, emp_logradouro, emp_numero, emp_CEP, emp_telefone);
	INSERT INTO usuario (email, senha, nome, cpf, telefone, dataNascimento, fkEmpresa) 
		VALUES (us_email, us_senha, us_nome, us_cpf, us_telefone, us_dataNascimento, emp_CNPJ);
END//
DELIMITER ;

-- CHAMAR PROCEDURE

-- CALL cadastrar_usuario ("bruno","");

DROP USER IF EXISTS 'user_bankSecure'@'localhost';
CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'Urubu_100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_empresaGerente to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

-- ADMIN
INSERT INTO empresa (razaoSocial, CNPJ) VALUES ('Bank Secure', 12345678901234);
INSERT INTO usuario (email, senha, nome, fkEmpresa) VALUES ('banksecure@contato.com', '12345', 'Admin Bank Secure', 12345678901234);
-- GERENTES
INSERT INTO empresa (razaoSocial, CNPJ) VALUES ('Itau', 17192451000170);
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('gerenteitau@contato.com', '12345', 'Fernando Brandão', 17192451000170, 1);
-- ANALISTAS
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('lider1itau@contato.com', '12345', 'Julia Lima', 17192451000170, 2);




