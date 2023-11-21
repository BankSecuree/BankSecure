var database = require("../database/config")

function dadosAnalista(agencia,componente) {
    console.log("ACESSEI O dashAnalistaModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    SELECT TOP 7 * FROM registros WHERE fkComponente = ${componente} AND fkMaquina = ${agencia} ORDER BY dataHora DESC;
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
module.exports = {
    dadosAnalista,
    verificarNivel
};