var database = require("../database/config")

function exibirDonut(fkEmpresa,fkComponente) {
    console.log("ACESSEI O DashDonutModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `select count(id) as qtd, nivel from alertas where fkComponente = ${fkComponente} and fkEmpresa = ${fkEmpresa} group by nivel order by nivel;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    exibirDonut
};