var database = require("../database/config")

function exibirTabelaUsuarios(gerente) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT us.idUsuario, us.nome, em.nomeEmpresa as empresa, (SELECT COUNT(idUsuario) FROM usuario WHERE gerente = ${gerente}) as funcionarios, us.dataInicio
	    FROM usuario as us, empresa as em WHERE gerente = ${gerente};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaUsuarios
};