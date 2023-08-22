var database = require("../database/config")

function exibirTabelaUsuarios(gerente) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT us.idUsuario, us.nome, em.nomeFantasia as empresa, (SELECT COUNT(idUsuario) FROM usuario WHERE gerente = ${gerente}) as funcionarios, us.dataInicio
	    FROM usuario as us, empresa as em WHERE gerente = ${gerente};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresaGerente(cnpj, razaoSocial, nomeFantasia, logradouro, numLogradouro, cep, telefone, nomeCompleto, cpf, celular, nascimento, email, senha) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    CALL cadastrar_empresaGerente ('${cnpj}', '${razaoSocial}', '${nomeFantasia}', '${logradouro}', ${numLogradouro}, '${cep}', '${telefone}', '${email}', '${senha}', '${nomeCompleto}', '${cpf}', '${celular}', '${nascimento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaUsuarios,
    cadastrarEmpresaGerente
};