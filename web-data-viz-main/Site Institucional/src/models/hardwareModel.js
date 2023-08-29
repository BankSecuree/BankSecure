var database = require("../database/config");

function cadastrarNomeMaquina(nomeMaquina, fkAgencia){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO maquina (nome, fkAgencia) VALUES("${nomeMaquina}",${fkAgencia})
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarComponente(nomeMaquina, fkComponente){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO maquinaComponente (fkMaquina, fkComponente) VALUES((SELECT idMaquina FROM maquina WHERE nome = "${nomeMaquina}"),${fkComponente})
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarNomeMaquina,
    cadastrarComponente
};