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
        AVG(valor) AS media_valor, MAX(idRegistro) as id
        FROM registros JOIN maquina on fkMaquina = idMaquina
        JOIN agencia on fkAgencia = idAgencia
        JOIN empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
        and dataHora >= NOW() - INTERVAL 1 DAY
        GROUP BY HOUR(dataHora)
        ORDER BY id DESC LIMIT 24;
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

    console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);
}


function buscarMedidasTempoReal(idEmpresa, periodo, componente) {
    let instrucao = ``

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

function kpiCorrelacao(idEmpresa,periodo){
  let instrucao = '';
    if(periodo == 'day'){
        instrucao = `SELECT
        (SUM((disco - medias.media_disco) * (memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*))
        / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2))
        / COUNT(*))) AS correlacao_disco_memoria_cpu,
        (
          SUM((disco - medias.media_disco) * (memoria - medias.media_memoria)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*))) AS correlacao_disco_memoria,
        
        (
          SUM((disco - medias.media_disco) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_disco_cpu,
        
        (
          SUM((memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_memoria_cpu
      FROM
        vw_registrosEstruturados JOIN
        (SELECT AVG(disco) AS media_disco, AVG(memoria) AS media_memoria, AVG(cpuu) AS media_cpu
        FROM vw_registrosEstruturados
                    JOIN maquina ON id = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND DATE(Data) = CURDATE()
        ) AS medias
                    JOIN maquina ON id = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND
        DATE(vw_registrosEstruturados.Data) = CURDATE();`
    }else if(periodo == 'month'){
        instrucao = `SELECT
        (
          SUM((disco - medias.media_disco) * (memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_disco_memoria_cpu,
        
        (
          SUM((disco - medias.media_disco) * (memoria - medias.media_memoria)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*))) AS correlacao_disco_memoria,
        
        (
          SUM((disco - medias.media_disco) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_disco_cpu,
        
        (
          SUM((memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_memoria_cpu
      FROM
        vw_registrosEstruturados JOIN
        (
          SELECT 
            AVG(disco) AS media_disco, 
            AVG(memoria) AS media_memoria, 
            AVG(cpuu) AS media_cpu 
          FROM 
            vw_registrosEstruturados
            JOIN maquina ON id = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND
            MONTH(Data) = MONTH(CURDATE()) AND YEAR(Data) = YEAR(CURDATE())
        ) AS medias
        JOIN maquina ON id = idMaquina
        JOIN agencia ON fkAgencia = idAgencia
        JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND
        MONTH(Data) = MONTH(CURDATE()) AND YEAR(Data) = YEAR(CURDATE());
      `
    }else if(periodo == 'year'){
        instrucao = `SELECT
        (
          SUM((disco - medias.media_disco) * (memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2))
        / COUNT(*))) AS correlacao_disco_memoria_cpu,
        
        (
          SUM((disco - medias.media_disco) * (memoria - medias.media_memoria)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*))) AS correlacao_disco_memoria,
        
        (
          SUM((disco - medias.media_disco) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(disco - medias.media_disco, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_disco_cpu,
        
        (
          SUM((memoria - medias.media_memoria) * (cpuu - medias.media_cpu)) / COUNT(*)
        ) / (SQRT(SUM(POW(memoria - medias.media_memoria, 2)) / COUNT(*)) * SQRT(SUM(POW(cpuu - medias.media_cpu, 2)) / COUNT(*))) AS correlacao_memoria_cpu
      FROM
        vw_registrosEstruturados
        JOIN (
          SELECT 
            AVG(disco) AS media_disco, 
            AVG(memoria) AS media_memoria, 
            AVG(cpuu) AS media_cpu 
          FROM 
            vw_registrosEstruturados
            JOIN maquina ON id = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND
            Data >= CURDATE() - INTERVAL 1 YEAR
        ) AS medias
        JOIN maquina ON id = idMaquina
            JOIN agencia ON fkAgencia = idAgencia
            JOIN empresa ON fkEmpresa = idEmpresa
          WHERE 
          fkEmpresa = ${idEmpresa} AND
          Data >= CURDATE() - INTERVAL 1 YEAR;
        `
    }
    console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);

}


module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    buscarMedidasTempoReal,
    kpiCorrelacao
}