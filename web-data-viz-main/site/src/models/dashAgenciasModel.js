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

function dadosAnalista(agencia, componente) {
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    SELECT * FROM registros WHERE fkComponente = ${componente} AND fkMaquina = ${agencia} ORDER BY dataHora DESC LIMIT 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarMaquinas(idAgencia) {
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select * from maquina where fkAgencia = ${idAgencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultarPeloTempo(idMaquina, inicio, fim) {
    console.log("ACESSEI O consultarPeloTempo \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultarPeloTempo()");

    var comando = `
    SELECT * FROM registros JOIN componente ON idComponente = fkComponente WHERE fkMaquina = ${idMaquina} AND dataHora > "${inicio}" AND dataHora < "${fim}";
    `
    console.log("Executando a instrução SQL: \n" + comando);
    return database.executar(comando);
}

function dadosCards(maquina) {
    console.log("ACESSEI O dadosCards \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    SELECT
    SUM(CASE WHEN tipo = 'M' THEN valor ELSE 0 END) as memoria,
    SUM(CASE WHEN tipo = 'C' THEN valor ELSE 0 END) as cpuu,
    SUM(CASE WHEN tipo = 'D' THEN valor ELSE 0 END) as disco
FROM (
    SELECT valor, dataHora, 'M' as tipo, valor as valorM, 0 AS valorC, 0 as valorD
    FROM registros
    WHERE fkComponente = 2 AND fkMaquina = ${maquina}
    ORDER BY dataHora DESC
    OFFSET 0 ROWS
    FETCH FIRST 1 ROWS ONLY

    UNION ALL

    SELECT valor, dataHora, 'C' as tipo, 0 as valorM, valor AS valorC, 0 as valorD
    FROM registros
    WHERE fkComponente = 1 AND fkMaquina = ${maquina}
    ORDER BY dataHora DESC
    OFFSET 0 ROWS
    FETCH FIRST 1 ROWS ONLY

    UNION ALL

    SELECT valor, dataHora, 'D' as tipo, 0 as valorM, 0 AS valorC, valor as valorD
    FROM registros
    WHERE fkComponente = 3 AND fkMaquina = ${maquina}
    ORDER BY dataHora DESC
    OFFSET 0 ROWS
    FETCH FIRST 1 ROWS ONLY
) as retorno;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarDadosGerais(idMaquina) {
    console.log("ACESSEI O pegarDadosGerais \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select sum(valorM) as memoria, sum(valorC) as UsoCpu, sum(valorD) as disco, sum(valort) as temperatura
from (
    (select valor, dataHora, 'M' as tipo, valor as valorM, 0 AS valorC, 0 as valorD, valor as valort
    from registros where fkComponente = 2 and fkMaquina = ${idMaquina} order by dataHora desc limit 1)
union
    (select valor, dataHora, 'C' as tipo, 0 as valorM, valor AS valorC, 0 as valorD, valor as valort
    from registros where fkComponente = 1 and fkMaquina = ${idMaquina} order by dataHora desc limit 1)
union
    (select valor, dataHora, 'D' as tipo, 0 as valorM, 0 AS valorC, valor as valorD, valor as valort
    from registros where fkComponente = 3 and fkMaquina = ${idMaquina} order by dataHora desc limit 1)
union
    (select valor, dataHora, 'T' as tipo, 0 as valorM, 0 AS valorC, valor as valorD, valor as valort
    from registros where fkComponente = 4 and fkMaquina = ${idMaquina} order by dataHora desc limit 1)
) as retorno;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function pegarMaquinas(sql) {
    console.log("ACESSEI O pegarMaquinas \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = sql;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    pegarDadosGerais,
    pegarMaquinas,
    exibirListaMaquinas,
    dadosAnalista,
    dadosCards,
    exibirListaAgencias,
    graficoAgencia,
    exibirView,
    consultarMaquinas,
    consultarPeloTempo
};