/* Comandos para mysql - banco local - ambiente de desenvolvimento */

CREATE DATABASE bankSecure;

USE bankSecure;


CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR (50),
cnpj CHAR (14)
);

CREATE TABLE Login(
idLogin INT PRIMARY KEY AUTO_INCREMENT,
emailFunc VARCHAR(50),
senhaFunc VARCHAR(50)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    cpfFunc CHAR(14),
    gerente INT,
	foto VARCHAR(255),
    fkEmpresa INT,
    fkLogin INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (fkLogin) REFERENCES login(idLogin)
);

CREATE TABLE maquina(
idMaquina INT PRIMARY KEY AUTO_INCREMENT,
MaquinaCpu INT,
MaquinaDemoria INT,
MaquinaDisco INT, 
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES empresa(fkEmpresa)
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

CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

