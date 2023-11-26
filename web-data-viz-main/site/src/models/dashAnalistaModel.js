var database = require("../database/config")

function dadosAnalista(agencia,componente) {
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    SELECT * FROM registros WHERE fkComponente = ${componente} AND fkMaquina = ${agencia} ORDER BY dataHora DESC LIMIT 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function verificarNivel(fkMaquina,fkEmpresa,nivel,fkComponente){
    console.log("======================================================Testar======================================================")
    var instrucao = `CALL verificarNivel(${fkEmpresa},${fkMaquina},${nivel},${fkComponente})`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosTemperatura(idEmpresa, fkMaquina){
    if (idEmpresa === undefined) {
        return Promise.reject("idEmpresa ou idAgencia é undefined");
    }else{
        var instrucao = `select valor, unidadeMedida, dataHora, fkAgencia, fkEmpresa, fkMaquina from registros join componente on idComponente = fkComponente 
        join maquina on idMaquina = fkMaquina
        join agencia on idAgencia = fkAgencia
        join empresa on idEmpresa = fkEmpresa where idEmpresa = ${idEmpresa} and fkMaquina = ${fkMaquina} and fkComponente = 4 ORDER BY dataHora DESC LIMIT 7;`;
        return database.executar(instrucao);
    } 
}

function dadosPorcentagem(idEmpresa, fkMaquina){
    console.log("Acessei a dadosPorcentagem model")
    console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    var instrucao = `select valor, unidadeMedida, dataHora, fkAgencia, fkEmpresa from registros join componente on idComponente = fkComponente 
    join maquina on idMaquina = fkMaquina
    join agencia on idAgencia = fkAgencia
    join empresa on idEmpresa = fkEmpresa where idEmpresa = ${idEmpresa} and fkMaquina = ${fkMaquina} and fkComponente = 1 ORDER BY dataHora DESC LIMIT 7;`
    return database.executar(instrucao);
}


function kpiDadosTemperatura(idEmpresa,idAgencia){
    console.log("Acessei a kpiDadosTemperatura model")
    console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    var instrucao = `select valor, unidadeMedida, dataHora, fkAgencia, fkEmpresa from registros join componente on idComponente = fkComponente 
    join maquina on idMaquina = fkMaquina
    join agencia on idAgencia = fkAgencia
    join empresa on idEmpresa = fkEmpresa where idEmpresa = ${idEmpresa} and idAgencia = ${idAgencia} and fkComponente =4 ORDER BY dataHora DESC LIMIT 1;`
    return database.executar(instrucao);
}


function kpiDadosUso(idEmpresa,idAgencia){
    console.log("Acessei a kpiDadosUso model")
    console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    var instrucao = `select valor, unidadeMedida, dataHora, fkAgencia, fkEmpresa from registros join componente on idComponente = fkComponente 
    join maquina on idMaquina = fkMaquina
    join agencia on idAgencia = fkAgencia
    join empresa on idEmpresa = fkEmpresa where idEmpresa = ${idEmpresa} and idAgencia = ${idAgencia} and unidadeMedida = "%" ORDER BY dataHora DESC LIMIT 1;`
    return database.executar(instrucao);
}

function maiorTemperaturaRel(idEmpresa, idAgencia) {
    console.log("Acessei a maiorTemperatura model");
    var instrucao = `
    SELECT ROUND(MAX(valor), 2) AS maior_temperatura
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = 2 AND idAgencia = 1 AND unidadeMedida = "°C"
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`
    return database.executar(instrucao);
}


function maiorUsoRel(idEmpresa,idAgencia){
    console.log("Acessei a maiorUsomodel")

    var instrucao = `SELECT ROUND(MAX(valor), 2) AS maior_uso
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = ${idEmpresa} AND idAgencia = ${idAgencia} AND unidadeMedida = "%"
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`

    return database.executar(instrucao);
}


function menorTemperaturaRel(idEmpresa,fkMaquina){
    console.log("Acessei a menorTemp model")

    var instrucao = `SELECT ROUND(MIN(valor), 2) AS menor_temperatura
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = ${idEmpresa} AND fkMaquina = ${fkMaquina} AND fkComponente = 4
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`

    return database.executar(instrucao);
}



function menorUsoRel(idEmpresa,idAgencia){
    console.log("Acessei a menorUso model")

    var instrucao = `SELECT ROUND(MIN(valor), 2) AS menor_uso
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = ${idEmpresa} AND idAgencia = ${idAgencia} AND unidadeMedida = "%"
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`

    return database.executar(instrucao);
}

function mediaTemperaturaRel(idEmpresa,idAgencia){
    console.log("Acessei a mediaTemp model")

    var instrucao = `SELECT ROUND(AVG(valor), 2) AS media_valores_temperatura
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = ${idEmpresa} AND idAgencia = ${idAgencia} AND fkComponente = 4
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`

    return database.executar(instrucao);
}


function mediaUsoRel(idEmpresa,idAgencia){
    console.log("Acessei a mediaUso model")

    var instrucao = `SELECT ROUND(AVG(valor), 2) AS media_valores_uso
    FROM (
        SELECT valor
        FROM registros
        JOIN componente ON idComponente = fkComponente
        JOIN maquina ON idMaquina = fkMaquina
        JOIN agencia ON idAgencia = fkAgencia
        JOIN empresa ON idEmpresa = fkEmpresa
        WHERE idEmpresa = ${idEmpresa} AND idAgencia = ${idAgencia} AND unidadeMedida = "%"
        ORDER BY dataHora DESC
        LIMIT 7
    ) AS ultimos_registros;`

    return database.executar(instrucao);
}


function pegarNomeMaquina(idEmpresa,idAgencia,fkMaquina) {
    console.log("Acessei a pegarNomeMaquina model");
    var instrucao = `select
    maquina.nome as nomeMaquina
    from registros
    join componente on idComponente = fkComponente
    join maquina on idMaquina = fkMaquina
    join agencia on idAgencia = fkAgencia
    join empresa on idEmpresa = fkEmpresa
    where idEmpresa = ${idEmpresa} and idAgencia = ${idAgencia} and fkMaquina = ${fkMaquina}
    ORDER BY dataHora DESC
    LIMIT 1;
    `
    return database.executar(instrucao);
}

module.exports = {
    dadosAnalista,
    verificarNivel,
    dadosTemperatura,
    dadosPorcentagem, 
    kpiDadosTemperatura,
    kpiDadosUso,
    maiorTemperaturaRel,
    maiorUsoRel,
    menorTemperaturaRel,
    menorUsoRel,
    mediaTemperaturaRel,
    mediaUsoRel,
    pegarNomeMaquina
};