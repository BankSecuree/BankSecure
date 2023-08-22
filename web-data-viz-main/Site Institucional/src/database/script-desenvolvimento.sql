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
    gerente INT,
	foto VARCHAR(255),
    fkEmpresa CHAR(14),
    dataInicio DATE,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(CNPJ),
    FOREIGN KEY (gerente) REFERENCES usuario(idUsuario)
);

<<<<<<< HEAD
=======
CREATE TABLE FuncionarioAgencia(
	fkUsuario INT,
	fkAgencia CHAR(14),
	FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario), 
	FOREIGN KEY (fkAgencia) REFERENCES agencia (CNPJ),
    PRIMARY KEY (fkUsuario, fkAgencia)
);

>>>>>>> cbc43265e27f7a8d4f4b7c29b18c0cc42e8dbcc8
CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45), 
	fkAgencia CHAR(14),
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
	idRegistro INT PRIMARY KEY,
    nome VARCHAR(45),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE maquinaComponente (
	fkMaquina INT,
    fkComponente INT,
);

DELIMITER //
CREATE PROCEDURE cadastrar_usuario(IN 
	us_nome VARCHAR(50), us_cpf CHAR(11), us_telefone CHAR(15), us_dataNascimento DATE,
    em_nomeEmpresa VARCHAR (50), em_cnpj CHAR(14),
    us_email VARCHAR(50), us_senha VARCHAR(16)
)
BEGIN
	INSERT INTO usuario (nome, cpf, telefone, dataNascimento, email, senha) 
		VALUES (us_nome, us_cpf, us_telefone, us_dataNascimento, us_email, us_senha);
	INSERT INTO empresa (nomeEmpresa, cnpj) 
		VALUES (em_nomeEmpresa, em_cnpj);
END//
DELIMITER ;

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
GRANT EXECUTE ON PROCEDURE cadastrar_usuario to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

INSERT INTO empresa (razaoSocial, nomeFantasia, CNPJ) VALUES ('Bank Secure', 'Bank Secure', 12345678901234);
INSERT INTO usuario (email, senha, nome, fkEmpresa) VALUES ('banksecure@contato.com', '12345', 'Admin Bank Secure', 12345678901234);




