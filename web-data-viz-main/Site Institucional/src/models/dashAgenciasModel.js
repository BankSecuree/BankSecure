var database = require("../database/config")

function exibirListaAgencias(idUsuario) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT a.idAgencia, a.apelido, a.cnpjAgencia FROM funcionarioAgencia as f JOIN agencia as a On fkAgencia = idAgencia AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getDadosMaquina(){
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getDadosMaquina()");
    var instrucao = `
      SELECT MAX(Cpu), MAX(Memória), MAX(Disco)
      FROM vw_registrosEstruturados
      WHERE dataHora = CURRENT_TIMESTAMP
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirView(idMaquina) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT * FROM vw_registrosEstruturados WHERE id = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirListaAgencias,
    exibirView,
};