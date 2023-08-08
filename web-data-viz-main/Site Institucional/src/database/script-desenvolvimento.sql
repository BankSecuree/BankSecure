/* Comandos para mysql - banco local - ambiente de desenvolvimento */

CREATE DATABASE bankSecure;

USE bankSecure;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE USER 'user_bankSecure'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL ON bankSecure.* TO 'user_bankSecure'@'localhost';
FLUSH PRIVILEGES;

