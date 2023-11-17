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
        instrucao = `SELECT
        ag.idAgencia,
        ag.apelido AS nomeAgencia,
        r.valor
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
        r.dataHora DESC;`
    }

    console.log("Executando a instrucao mysql: " + instrucao)
    return database.executar(instrucao);
}

module.exports = {
    obterKpiAgencia,
    buscarUltimasMedidas
}