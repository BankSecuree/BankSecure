var database = require("../database/config")

function exibirListaAgencias(idUsuario) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT a.idAgencia, a.apelido, a.cnpjAgencia,
    (select count(idMaquina) from maquina Where fkAgencia = idAgencia AND fkTipoMaquina = 2) as maquinas
    FROM funcionarioAgencia as f JOIN agencia as a On fkAgencia = idAgencia AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirListaMaquinas(idMaquina) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `select * from maquina where fkAgencia = ${idMaquina};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirView(idUsuario, idMaquina) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT * FROM registros JOIN componente ON idComponente = fkComponente WHERE fkMaquina = ${idMaquina} ORDER BY idRegistro DESC LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoAgencia(idAgencia) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT * FROM vw_registrosEstruturados WHERE id = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosAnalista(agencia,componente) {
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select * from registros where fkComponente = ${componente} and fkMaquina = ${agencia} order by dataHora desc limit 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarMaquinas(idAgencia){
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select * from maquina where fkAgencia = ${idAgencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarPeloTempo(idMaquina, inicio, fim){
    console.log("ACESSEI O consultarPeloTempo \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultarPeloTempo()");

    var comando = `
    SELECT * FROM registros JOIN componente ON idComponente = fkComponente WHERE fkMaquina = ${idMaquina} AND dataHora > "${inicio}" AND dataHora < "${fim}";
    `
    console.log("Executando a instrução SQL: \n" + comando);
    return database.executar(comando);
}

// function dadosAnalista(agencia,componente) {
//     console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

//     var instrucao = `
//     select * from registros where fkComponente = ${componente} and fkMaquina = ${agencia} order by dataHora desc limit 7;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

module.exports = {
    exibirListaMaquinas,
    dadosAnalista,
    // dadosCards,
    exibirListaAgencias,
    graficoAgencia,
    exibirView,
    consultarMaquinas,
    consultarPeloTempo
};