/* Comandos para mysql - banco local - ambiente de desenvolvimento */
DROP DATABASE IF EXISTS bankSecure;
CREATE DATABASE bankSecure;
USE bankSecure;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR (50),
cnpj CHAR (18)
);

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
	senha VARCHAR(16),
	nome VARCHAR(50),
    cpf CHAR(14),
    telefone CHAR(14),
    dataNascimento DATE,
    gerente INT,
	foto VARCHAR(255),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	MaquinaCpu INT,
	MaquinaDemoria INT,
	MaquinaDisco INT, 
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
CREATE TABLE registros(
dataHora DATETIME PRIMARY KEY,
usoMemoria INT,
usoDisco INT,
usoCPU INT,
tempCPU VARCHAR(10),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

select * from usuario;

DELIMITER //
CREATE PROCEDURE cadastrar_usuario(IN 
	us_nome VARCHAR(50), us_cpf CHAR(14), us_telefone CHAR(14), us_dataNascimento DATE,
    em_nomeEmpresa VARCHAR (50), em_cnpj CHAR(18),
    us_email VARCHAR(50), us_senha VARCHAR(16)
)
BEGIN
	INSERT INTO usuario (nome, cpf, telefone, dataNascimento, email, senha) 
		VALUES (us_nome, us_cpf, us_telefone, us_dataNascimento, us_email, us_senha);
	INSERT INTO empresa (nomeEmpresa, cnpj) 
		VALUES (em_nomeEmpresa, em_cnpj);
END//
DELIMITER ;

DROP USER 'user_bankSecure'@'localhost';
CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
GRANT EXECUTE ON PROCEDURE cadastrar_usuario to 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

