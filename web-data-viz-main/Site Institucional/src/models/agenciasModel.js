var database = require("../database/config")

function exibirTabelaAgencias(idEmpresa) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT apelido, cnpjAgencia, idAgencia FROM agencia WHERE fkEmpresa = 2;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirQuantidadeFuncionariosAgencia(idAgencia) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    select (select count(fkUsuario) from funcionarioAgencia Where fkAgencia = ${idAgencia}) as funcionarios, (select count(idMaquina) from maquina Where fkAgencia = ${idAgencia}) as agencias;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone) {
    console.log("ACESSEI A AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAgencia()");
    var instrucao = `
    CALL cadastrarAgencia ('${apelido}', '${cnpj}', '${cep}', '${logradouro}', '${numLogradouro}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaAgencias,
    exibirQuantidadeFuncionariosAgencia,
    cadastrarAgencia
};