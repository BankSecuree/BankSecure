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

function exibirView(idMaquina) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirListaAgencias()");
    var instrucao = `
    SELECT * FROM vw_registrosEstruturados WHERE id = 1;
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

function dadosCards(maquina) {
    console.log("ACESSEI O dadosCards \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select sum(valorM) as memoria, sum(valorc) as cpuu, sum(valord) as disco from (
        (select valor as valor, dataHora, 'M' as tipo , valor as valorM, 0 AS valorC, 0 as valorD
        from registros where fkComponente = 2 and fkMaquina = ${maquina} order by dataHora desc limit 1)
    union
        (select valor as valor, dataHora, 'C' as tipo, 0 as valorM, valor AS valorC, 0 as valorD
        from registros where fkComponente = 1 and fkMaquina = ${maquina} order by dataHora desc limit 1)
    union
        (select valor as valor, dataHora, 'D' as tipo, 0 as valorM, 0 AS valorC, valor as valorD
        from registros where fkComponente = 3 and fkMaquina = ${maquina} order by dataHora desc limit 1) 
    ) as retorno ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirListaMaquinas,
    dadosAnalista,
    dadosCards,
    exibirListaAgencias,
    graficoAgencia,
    exibirView
};