var database = require("../database/config")

function exibirTabelaAgencias(idEmpresa) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT apelido, cnpjAgencia, idAgencia, 
    (select count(fkUsuario) from funcionarioAgencia Where fkAgencia = idAgencia) as funcionarios, 
    (select count(idMaquina) from maquina Where fkAgencia = idAgencia)  as maquinas, CEP, logradouro, numero, telefoneAgencia
        FROM agencia WHERE fkEmpresa = ${idEmpresa};    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone, fkEmpresa) {
    console.log("ACESSEI A AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAgencia()");
    var instrucao = `
    INSERT INTO agencia (cnpjAgencia, apelido, logradouro, numero, CEP, telefoneAgencia, fkEmpresa) VALUES 
    ('${cnpj}', '${apelido}', '${logradouro}', '${numLogradouro}', '${cep}', '${telefone}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database
        .executar(instrucao);
}

function excluirAgencia(idAgencia) {
    console.log("ACESSEI O AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirAgencia()");
    var instrucao = `
    DELETE FROM agencia WHERE idAgencia = ${idAgencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAgencia(idAgencia) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT * FROM agencia WHERE idAgencia = ${idAgencia};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarAgencia(idAgencia, apelido, cnpj, cep, logradouro, numLogradouro, telefone) {
    console.log("ACESSEI A AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarAgencia()");
    var instrucao = `
    UPDATE agencia SET apelido = '${apelido}', cnpjAgencia = '${cnpj}', CEP = '${cep}', logradouro = '${logradouro}', numero = ${numLogradouro}, telefoneAgencia = '${telefone}' WHERE idAgencia = ${idAgencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database
        .executar(instrucao);
}

module.exports = {
    exibirTabelaAgencias,
    cadastrarAgencia,
    excluirAgencia,
    listarAgencia,
    atualizarAgencia

};