-- Use bankSecure;
-- DROP DATABASE IF EXISTS bankSecure;
-- CREATE DATABASE bankSecure;

USE bankSecure;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY IDENTITY(1,1),
    cnpjEmpresa CHAR(14),
    razaoSocial VARCHAR(100),
    cep CHAR(8),
    logradouro VARCHAR(150),
    numero INT,
    telefoneEmpresa VARCHAR(14)
);

CREATE TABLE agencia (
    idAgencia INT PRIMARY KEY IDENTITY(1,1),
    cnpjAgencia CHAR(14),
    apelido VARCHAR(45),
    logradouro VARCHAR(150),
    numero INT,
    CEP CHAR(8),
    telefoneAgencia VARCHAR(14),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
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

CREATE TABLE funcionarioAgencia (
    fkUsuario INT,
    fkAgencia INT,
    PRIMARY KEY (fkUsuario, fkAgencia),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkAgencia) REFERENCES agencia(idAgencia)
);

CREATE TABLE tipoMaquina (
    idTipoMaquina INT PRIMARY KEY IDENTITY(1,1),
    nomeTipo VARCHAR(45)
);

-- SELECT * FROM tipoMaquina;

CREATE TABLE maquina (
    idMaquina INT PRIMARY KEY IDENTITY(1,1),
    fkAgencia INT,
    fkTipoMaquina INT,
    macAddress VARCHAR(100) UNIQUE,
    localizacao VARCHAR(200),
    nome VARCHAR(45) UNIQUE,
    so VARCHAR(100),
    FOREIGN KEY (fkAgencia) REFERENCES agencia(idAgencia) ON DELETE CASCADE,
    FOREIGN KEY (fkTipoMaquina) REFERENCES tipoMaquina(idTipoMaquina) ON DELETE CASCADE
);

CREATE TABLE registros (
    idRegistro INT PRIMARY KEY IDENTITY(1,1),
    fkMaquina INT,
    fkComponente INT,
    valor FLOAT,
    dataHora DATETIME,
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE
);

CREATE TABLE processo (
    idProcesso INT PRIMARY KEY IDENTITY(1,1),
    fkMaquina INT,
    valor INT,
    dataHora DATETIME,
    statusProcesso VARCHAR(10),
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE
);

-- SELECT p1.valor AS processoAtivo, p2.valor AS processoInativo, so FROM processo p1
-- INNER JOIN processo p2 ON p1.dataHora = p2.dataHora
-- INNER JOIN maquina ON p1.fkMaquina = idMaquina
-- WHERE p1.statusProcesso = 'Ativo' AND p2.statusProcesso = 'Inativo' AND p1.fkMaquina = 1 AND p2.fkMaquina = 1
-- ORDER BY p1.dataHora DESC LIMIT 1;

-- SELECT * FROM processo;
-- SELECT * FROM maquina;

CREATE TABLE componente (
    idComponente INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45),
    unidadeMedida VARCHAR(60),
    usoCPU FLOAT,
    temperatura FLOAT
);

CREATE TABLE alertas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nivel INT,
    fkEmpresa INT,
    fkComponente INT,
    fkMaquina INT,
    dtHora DATETIME
);

CREATE TABLE maquinaComponente (
    fkMaquina INT,
    fkComponente INT,
    PRIMARY KEY (fkMaquina, fkComponente),
    FOREIGN KEY (fkMaquina) REFERENCES maquina(idMaquina) ON DELETE CASCADE,
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente) ON DELETE CASCADE
);

-- PROCEDURE PARA CADASTRAR AGENCIAS
-- CREATE PROCEDURE cadastrarAgencia (
--     @agencia_apelido VARCHAR(45),
--     @agencia_CNPJ CHAR(14),
--     @agencia_CEP CHAR(8),
--     @agencia_logradouro VARCHAR(150),
--     @agencia_numero VARCHAR(20),
--     @agencia_telefone VARCHAR(11),
--     @agencia_fkEmpresa INT
-- )
-- AS
-- BEGIN
--     INSERT INTO agencia (apelido, cnpjAgencia, CEP, logradouro, numero, telefoneAgencia, fkEmpresa) 
--         VALUES (@agencia_apelido, @agencia_CNPJ, @agencia_cep, @agencia_logradouro, @agencia_numero, @agencia_telefone, @agencia_fkEmpresa);
-- END;

-- CREATE PROCEDURE inserirDadosMaquina (
--     @ma_user VARCHAR(45),
--     @co1_nome VARCHAR(45),
--     @re1_valor FLOAT,
--     @co2_nome VARCHAR(45),
--     @re2_valor FLOAT,
--     @co3_nome VARCHAR(45),
--     @re3_valor FLOAT,
--     @re_data DATETIME
-- )
-- AS
-- BEGIN
--     INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
--         ((SELECT idMaquina FROM vw_maquina WHERE nome = @ma_user), (SELECT idComponente FROM componente WHERE nome = @co1_nome), @re1_valor, @re_data);
--     INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
--         ((SELECT idMaquina FROM vw_maquina WHERE nome = @ma_user), (SELECT idComponente FROM componente WHERE nome = @co2_nome), @re2_valor, @re_data);
--     INSERT INTO registros (fkMaquina, fkComponente, valor, dataHora) VALUES 
--         ((SELECT idMaquina FROM vw_maquina WHERE nome = @ma_user), (SELECT idComponente FROM componente WHERE nome = @co3_nome), @re3_valor, @re_data);
-- END;

-- CREATE PROCEDURE cadastrar_empresaGerente (
--     @emp_cnpjEmpresa CHAR(14),
--     @emp_razaoSocial VARCHAR(100),
--     @emp_logradouro VARCHAR(150),
--     @emp_numero INT,
--     @emp_CEP CHAR(8),
--     @emp_telefone VARCHAR(14),
--     @us_email VARCHAR(50),
--     @us_senha VARCHAR(16),
--     @us_nome VARCHAR(50),
--     @us_cpf CHAR(11),
--     @us_telefone VARCHAR(14),
--    
