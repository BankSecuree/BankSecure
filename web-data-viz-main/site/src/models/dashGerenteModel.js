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
    SELECT AVG(valor) AS media
    FROM registros
    JOIN maquina ON fkMaquina = idMaquina
    JOIN agencia ON fkAgencia = idAgencia
    JOIN empresa ON fkEmpresa = idEmpresa AND fkEmpresa = ${idEmpresa} AND fkComponente = ${componente}
    WHERE
        ${filtroPorAgencia}
        AND ${periodo}(dataHora) = ${periodo}(GETDATE());
    `;

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
        instrucao = `
        SELECT
            DATEPART(HOUR, dataHora) AS hora,
            AVG(valor) AS media_valor,
            MAX(idRegistro) as id
        FROM registros
        JOIN maquina on fkMaquina = idMaquina
        JOIN agencia on fkAgencia = idAgencia
        JOIN empresa on fkEmpresa = idEmpresa and fkEmpresa = ${idEmpresa} and fkComponente = ${componente}
        WHERE dataHora >= DATEADD(DAY, -1, GETDATE()) 
            AND (${filtroPorAgencia})
        GROUP BY DATEPART(HOUR, dataHora)
        ORDER BY id DESC;

`
    } else if (periodo == "month") {
        instrucao = `
        
        SELECT
        DAY(dataHora) AS hora,
        AVG(valor) AS media_valor
    FROM registros
    JOIN maquina ON fkMaquina = idMaquina
    JOIN agencia ON fkAgencia = idAgencia
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE fkEmpresa = ${idEmpresa}
        AND fkComponente = ${componente}
        AND CONVERT(VARCHAR(7), dataHora, 120) = CONVERT(VARCHAR(7), GETDATE(), 120)
        AND (${filtroPorAgencia})
    
    GROUP BY DAY(dataHora)
    ORDER BY hora DESC;
        `
    } else if (periodo == "year") {
        instrucao = `
        SELECT
            CONVERT(VARCHAR(7), dataHora, 120) AS hora,
            AVG(valor) AS media_valor
        FROM registros
        JOIN maquina ON fkMaquina = idMaquina
        JOIN agencia ON fkAgencia = idAgencia
        JOIN empresa ON fkEmpresa = idEmpresa
        WHERE fkEmpresa = ${idEmpresa}
            AND fkComponente = ${componente}
            AND dataHora >= DATEADD(YEAR, -1, GETDATE())
            AND (${filtroPorAgencia})
        GROUP BY CONVERT(VARCHAR(7), dataHora, 120)
        ORDER BY hora DESC;
`
    }

    // console.log(`Executando a instrucao SQL \n` + instrucao);
    return database.executar(instrucao);
}




function horarioDePico(idEmpresa){
  instrucao = `
      SELECT
      DATEPART(HOUR, dataHora) AS hora,
      SUM(valor) AS porcentagemUso
    FROM registros
    JOIN maquina ON fkMaquina = idMaquina
    JOIN agencia ON fkAgencia = idAgencia
    JOIN empresa ON fkEmpresa = idEmpresa
    WHERE idEmpresa = ${idEmpresa} AND fkComponente BETWEEN 1 AND 2
    GROUP BY DATEPART(HOUR, dataHora)
    ORDER BY hora;
  `
  // console.log(`Executando a instrucao SQL \n` + instrucao);
  return database.executar(instrucao)
}


module.exports = {
    dadosKpi,
    buscarUltimasMedidas,
    horarioDePico
}