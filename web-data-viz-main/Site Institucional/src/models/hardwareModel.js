var database = require("../database/config");

function cadastrarHardware(cpu, memoria, disco, temperatura){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO maquina (maquinaCpu, maquinaMemoria, maquinaDisco, maquinaTemperatura) VALUES(
    "${cpu}",
    ${memoria},
    ${disco},
    ${temperatura}
    )
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}
module.exports = {
    cadastrarHardware
};