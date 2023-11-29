var database = require('../database/config')

function dadosKpi(idEmpresa, periodo, componente, agencias) {
  agencias = agencias.split(",")
  let filtroPorAgencia = " ";

  for(let i = 0; i < agencias.length; i++){
      filtroPorAgencia += `idAgencia = ${agencias[i]} OR `
      console.log(agencias[i] + "  " + i)
  }
  filtroPorAgencia = filtroPorAgencia.slice(0, -3)
    var instrucao = '';

    // console.log("Estamos no dashGerenteModel")

    instrucao = `
    select avg(valor) as media from registros join maquina on fkMaquina = idMaquina 
    join agencia on fkAgencia = idAgencia 
    join empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
    and ${periodo}(dataHora) = ${periodo}(getdate())
    WHERE
    ${filtroPorAgencia};`;

    console.log("Executando a instrução MySql:" + instrucao)
    return database.executar(instrucao);
}

function buscarUltimasMedidas(idEmpresa, periodo, componente, agencias) {
  agencias = agencias.split(",")
  let filtroPorAgencia = " ";

  for(let i = 0; i < agencias.length; i++){
      filtroPorAgencia += `idAgencia = ${agencias[i]} OR `
      console.log(agencias[i] + "  " + i)
  }
  filtroPorAgencia = filtroPorAgencia.slice(0, -3)
    instrucao = ``

    // console.log("Estamos no buscarUltimasMedias")

    //Instrucao para dia
    if (periodo == 'day') {
        instrucao = `SELECT
    DATEPART(HOUR, dataHora) AS hora,
    AVG(valor) AS media_valor,
    MAX(idRegistro) as id
FROM
    registros
JOIN
    maquina ON fkMaquina = idMaquina
JOIN
    agencia ON fkAgencia = idAgencia
JOIN
    empresa ON fkEmpresa = idEmpresa
WHERE
    fkEmpresa = ${idEmpresa}
    AND fkComponente = ${componente}
    AND dataHora >= DATEADD(DAY, -1, GETDATE())
    AND ${filtroPorAgencia}
GROUP BY
    DATEPART(HOUR, dataHora)
ORDER BY
    id DESC;
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
        AND DATE_FORMAT(dataHora, '%Y-%m') = DATE_FORMAT(getdate(), '%Y-%m') AND
        (${filtroPorAgencia})

    GROUP BY hora
    ORDER BY hora DESC;
    
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
        AND dataHora >= getdate() - INTERVAL 1 YEAR
        AND
        (${filtroPorAgencia})
        GROUP BY hora
        ORDER BY hora DESC;`
    }

    // console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);
}




function horarioDePico(idEmpresa){
  instrucao = `
  select hour(dataHora) as hora, sum(valor) as porcentagemUso from registros
    join maquina on fkMaquina = idMaquina
    join agencia on fkAgencia = idAgencia
    join empresa on fkEmpresa = idEmpresa
    where idEmpresa = ${idEmpresa} and fkComponente BETWEEN 1 and  2
    group by hora order by hora;
  `
  // console.log(`Executando a instrucao SQL \n` + instrucao);
  return database.executar(instrucao)
}


module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    horarioDePico
}