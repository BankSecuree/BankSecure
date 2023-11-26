var database = require("../database/config")

function dadosAnalista(agencia,processo) {
    console.log("ACESSEI O dashAnalistaProcessoModel \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    select top 7 * from processo where statusProcesso = '${processo}' and fkMaquina = ${agencia} order by dataHora desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosCards(maquina) {
    console.log("ACESSEI O dadosCards \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDonut()");

    var instrucao = `
    SELECT top 1 p1.valor AS processoAtivo, p2.valor AS processoInativo, so FROM processo p1
	INNER JOIN processo p2 ON p1.dataHora = p2.dataHora
		INNER JOIN maquina ON p1.fkMaquina = ${maquina}
		WHERE p1.statusProcesso = 'Ativo' AND p2.statusProcesso = 'Inativo' AND p1.fkMaquina = ${maquina} AND p2.fkMaquina = ${maquina}
			ORDER BY p1.dataHora DESC;   
  `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    dadosAnalista,
    dadosCards
}