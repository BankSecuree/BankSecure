var database = require('../database/config')

function obterKpiAgencia(idGerente) {
    var instrucao = '';

    console.log('Estamos no dashBoosModel')

    instrucao = `    SELECT
    ag.idAgencia,
    ag.apelido as nomeAgencia,
    COUNT(r.idRegistro) AS totalProblemas
FROM
    agencia ag
JOIN
    funcionarioAgencia fa ON ag.idAgencia = fa.fkAgencia
JOIN
    usuario u ON fa.fkUsuario = u.idUsuario
LEFT JOIN
    registros r ON r.fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkAgencia = ag.idAgencia) 
                 AND (
                       (r.fkComponente = 1 AND (r.valor < 30 OR r.valor > 60)) OR
                       (r.fkComponente = 2 AND (r.valor < 50 OR r.valor > 70)) OR
                       (r.fkComponente = 3 AND (r.valor < 60 OR r.valor > 80))
                     )
WHERE
    u.fkGerente = ${idGerente}
GROUP BY
    ag.idAgencia
ORDER BY
    totalProblemas DESC;`

    console.log("Executando a instrucao mysql: " + instrucao)
    return database.executar(instrucao);
}

function buscarUltimasMedidas(idGerente, componente, tipoAgencia, selectTipoAgencia) {
    instrucao = ""

    

    console.log("Estou no buscarUltimasMedidas da dashBoosModel")

    if (selectTipoAgencia === "todas") {
        instrucao = `SELECT
        ag.idAgencia,
        ag.apelido AS nomeAgencia,
        AVG(r.valor) AS mediaValor
    FROM
        agencia ag
    JOIN
        funcionarioAgencia fa ON ag.idAgencia = fa.fkAgencia
    JOIN
        usuario u ON fa.fkUsuario = u.idUsuario
    LEFT JOIN
        registros r ON r.fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkAgencia = ag.idAgencia) 
                     AND r.fkComponente = ${componente}
    WHERE
        u.fkGerente = ${idGerente}
    GROUP BY
        ag.idAgencia, ag.apelido
    ORDER BY
        mediaValor DESC;`
    }
    else {
        instrucao = `SELECT * FROM (
            SELECT
                ag.idAgencia,
                ag.apelido AS nomeAgencia,
                r.valor AS mediaValor,
                DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS dataHora
            FROM
                agencia ag
            JOIN
                funcionarioAgencia fa ON ag.idAgencia = fa.fkAgencia
            JOIN
                usuario u ON fa.fkUsuario = u.idUsuario
            JOIN
                registros r ON r.fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkAgencia = ag.idAgencia) 
                             AND r.fkComponente = ${componente}
            WHERE
                u.fkGerente = ${idGerente}
                AND ag.idAgencia = ${tipoAgencia}
            ORDER BY
                r.dataHora DESC
            LIMIT 10
        ) AS subquery
        ORDER BY
            dataHora ASC;
        
    `
    }

    console.log("Executando a instrucao mysql: " + instrucao)
    return database.executar(instrucao);
}

function buscarMedidasEmTempoReal(grafico, dados, selectTipoAgencia) {
    instrucao = ""

    if(selectTipoAgencia == "todas") {
        instrucao = `SELECT
        ag.idAgencia,
        ag.apelido AS nomeAgencia,
        AVG(r.valor) AS mediaValor
    FROM
        agencia ag
    JOIN
        funcionarioAgencia fa ON ag.idAgencia = fa.fkAgencia
    JOIN
        usuario u ON fa.fkUsuario = u.idUsuario
    LEFT JOIN
        registros r ON r.fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkAgencia = ag.idAgencia)
                     AND r.fkComponente = ${componente}
                     AND r.dataRegistro = (
                        SELECT MAX(dataRegistro)
                        FROM registros
                        WHERE fkMaquina = r.fkMaquina
                          AND fkComponente = r.fkComponente
                     )
    WHERE
        u.fkGerente = ${idGerente}
    GROUP BY
        ag.idAgencia, ag.apelido
    ORDER BY
        mediaValor DESC;
    `
    } else {
        instrucao = `SELECT * FROM (
            SELECT
                ag.idAgencia,
                ag.apelido AS nomeAgencia,
                r.valor AS mediaValor,
                DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS dataHora
            FROM
                agencia ag
            JOIN
                funcionarioAgencia fa ON ag.idAgencia = fa.fkAgencia
            JOIN
                usuario u ON fa.fkUsuario = u.idUsuario
            JOIN
                registros r ON r.fkMaquina IN (SELECT idMaquina FROM maquina WHERE fkAgencia = ag.idAgencia) 
                             AND r.fkComponente = ${componente}
            WHERE
                u.fkGerente = ${idGerente}
                AND ag.idAgencia = ${tipoAgencia}
            ORDER BY
                r.dataHora DESC
            LIMIT 1
        ) AS subquery
        ORDER BY
            dataHora ASC;`
    }
}

module.exports = {
    obterKpiAgencia,
    buscarUltimasMedidas
}