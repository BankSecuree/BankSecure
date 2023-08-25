DROP DATABASE IF EXISTS bankSecure;
CREATE DATABASE bankSecure;
USE bankSecure;

select * from agencia;

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

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	fkAgencia INT,
    nome VARCHAR(45), 
	FOREIGN KEY (fkAgencia) REFERENCES agencia(idAgencia)
);

CREATE TABLE servidor(
	idServidor INT PRIMARY KEY AUTO_INCREMENT,
	fkMaquina INT,
    nome VARCHAR(45), 
	FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina)
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
	idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    unidadeMedida VARCHAR(10)
);

INSERT INTO componente (nome, unidadeMedida) VALUES
('CPU', 'GHZ'),
('Memória', 'GB'),
('Disco', 'KB');

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
	INSERT INTO agencia (CNPJ, apelido, logradouro, numero, CEP, telefoneAgencia) 
		VALUES (agencia_CNPJ, agencia_apelido, agencia_logradouro, agencia_numero, agencia_CEP, agencia_telefone);
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

DROP USER IF EXISTS 'user_bankSecure'@'localhost';
CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_empresaGerente to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

-- ADMIN
INSERT INTO empresa (razaoSocial, cnpjEmpresa, idEmpresa) VALUES ('Bank Secure', 12345678901234, 1);
INSERT INTO usuario (email, senha, nome, fkEmpresa, cargo) VALUES ('banksecure@contato.com', '12345', 'Admin Bank Secure', 1, 'Admin');

-- GERENTES
INSERT INTO empresa (razaoSocial, cnpjEmpresa, cep, logradouro, numero, telefoneEmpresa) VALUES ('BANCO ITAUCARD S.A.', 17192451000170, '04344902', 'PRACA ALFREDO EGYDIO DE SOUZA ARANHA 100', 100, '(11) 4004-4828');
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('gerenteitau@bs.com', '12345', 'Fernando Brandão', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 1);

-- ANALISTAS
INSERT INTO usuario (email, senha, nome, fkEmpresa, fkGerente) VALUES ('analista1itau@bs.com', '12345', 'Julia Lima', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = 17192451000170), 2);

-- AGENCIA
INSERT INTO agencia (cnpjAgencia, apelido, logradouro, numero, CEP, telefoneAgencia, fkEmpresa) VALUES
('60701190031328', 'Agência Itau Rudge Ramos', 'Rua Rudge Ramos', 80, '09772040', '1130034828', 2);

-- MAQUINA
INSERT INTO maquina (nome, fkAgencia) VALUES ('HPP00', 1);
INSERT INTO maquina (nome, fkAgencia) VALUES ('FYUT-231', 1);
INSERT INTO maquina (nome, fkAgencia) VALUES ('TWE-981', 1);

-- SERVIDOR
INSERT INTO servidor (nome, fkMaquina) VALUES
('Servidor 1', 1);

-- MAQUINA COMPONENTE
INSERT INTO maquinaComponente (fkMaquina, fkComponente) VALUES (1, 1), (2, 2);
INSERT INTO maquinaComponente (fkMaquina, fkComponente) VALUES (3,3);