var database = require("../database/config");

function cadastrarNomeMaquina(nomeMaquina, fkAgencia){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO maquina (nome, fkAgencia) VALUES("${nomeMaquina}",${fkAgencia})
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



function cadastrarHardwareCpu(cpu){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO componente (nome, unidadeMedida) VALUES ("${cpu}", "GHz");
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrarHardwareMemoria(memoria){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO componente (nome, unidadeMedida) VALUES("${memoria}", "GB)
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarHardwareDisco(disco){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO componente (nome, unidadeMedida) VALUES("${disco}", "KB")
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarHardwareTemperatura(temperatura){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO componente (nome, unidadeMedida) VALUES("${temperatura}", "°C")
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    cadastrarNomeMaquina,
    cadastrarHardwareCpu
};