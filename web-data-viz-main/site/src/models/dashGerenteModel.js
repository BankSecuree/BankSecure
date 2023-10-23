var database = require('../database/config')

function dadosKpi(idEmpresa, periodo, componente) {
    var instrucao = '';

    console.log("Estamos no dashGerenteModel")

    instrucao = `
    select avg(valor) as media from registros join maquina on fkMaquina = idMaquina 
    join agencia on fkAgencia = idAgencia 
    join empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
    and ${periodo}(dataHora) = ${periodo}(now());`;

    console.log("Executando a instrução MySql:" + instrucao)
    return database.executar(instrucao);
}

function buscarUltimasMedidas(idEmpresa, periodo, componente) {

    instrucao = ``

    console.log("Estamos no buscarUltimasMedias")

    //Instrucao para dia
    if (periodo == 'day') {
        instrucao = `SELECT
        HOUR(dataHora) AS hora,
        AVG(valor) AS media_valor
        FROM registros JOIN maquina on fkMaquina = idMaquina
        JOIN agencia on fkAgencia = idAgencia
        JOIN empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
        and dataHora >= NOW() - INTERVAL 1 DAY
        GROUP BY HOUR(dataHora)
        ORDER BY hora DESC LIMIT 24;
`
    } else if (periodo == "month") {
        instrucao = `SELECT
        DAY(dataHora) AS hora,
        AVG(valor) AS media_valor
    FROM registros
    JOIN maquina ON fkMaquina = idMaquina
    JOIN agencia ON fkAgencia = idAgencia
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE fkEmpresa = ${idEmpresa}
        AND fkComponente = ${componente}
        AND DATE_FORMAT(dataHora, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')
    GROUP BY hora
    ORDER BY hora DESC LIMIT 30;
    
    ;
        `
    } else if (periodo == "year") {
        instrucao = `SELECT
        DATE_FORMAT(dataHora, '%Y-%m') AS hora,
        AVG(valor) AS media_valor
        FROM registros
        JOIN maquina ON fkMaquina = idMaquina
        JOIN agencia ON fkAgencia = idAgencia
        JOIN empresa ON fkEmpresa = idEmpresa
        WHERE fkEmpresa = ${idEmpresa}
        AND fkComponente = ${componente}
        AND dataHora >= NOW() - INTERVAL 1 YEAR
        GROUP BY hora
        ORDER BY hora DESC LIMIT 12;`
    }




    // instrucao = `select valor from registros
    // join  maquina on fkMaquina = idMaquina 
    // join agencia on fkAgencia = idAgencia
    // join empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
    // and ${periodo}(dataHora) = ${periodo}(now()) order by idRegistro desc limit ${limite_linhas};`;


    console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);
}


function buscarMedidasTempoReal(idEmpresa, periodo, componente) {
    instrucao = ``

    console.log("Estou no medida model")

    if (periodo == 'day') {
        instrucao = `SELECT
            HOUR(dataHora) AS hora,
            AVG(valor) AS media_valor
            FROM registros JOIN maquina on fkMaquina = idMaquina
            JOIN agencia on fkAgencia = idAgencia
            JOIN empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
            and dataHora >= NOW() - INTERVAL 1 DAY
            GROUP BY HOUR(dataHora)
            ORDER BY hora DESC LIMIT 1;
    `
    } else if (periodo == "month") {
        instrucao = `SELECT
            DATE_FORMAT(dataHora, '%Y-%m-%d') AS hora,
            AVG(valor) AS media_valor
            FROM registros JOIN maquina on fkMaquina = idMaquina
            JOIN agencia on fkAgencia = idAgencia
            JOIN empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
            and dataHora >= NOW() - INTERVAL 1 DAY
            GROUP BY DATE_FORMAT(dataHora, '%Y-%m-%d')
            ORDER BY hora DESC LIMIT 1;`
    } else if (periodo == "year") {
        instrucao = `SELECT
            DATE_FORMAT(dataHora, '%Y-%m') AS hora,
            AVG(valor) AS media_valor
            FROM registros
            JOIN maquina ON fkMaquina = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
            WHERE fkEmpresa = ${idEmpresa}
            AND fkComponente = ${componente}
            AND dataHora >= NOW() - INTERVAL 1 YEAR
            GROUP BY hora
            ORDER BY hora DESC LIMIT 1;`
    }

    console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);

}


module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    buscarMedidasTempoReal
}