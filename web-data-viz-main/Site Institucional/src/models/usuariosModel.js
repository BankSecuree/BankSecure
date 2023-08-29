var database = require("../database/config")

function exibirTabelaUsuarios(idUsuario) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT us.idUsuario, us.nome, em.razaoSocial as empresa,  us.dataInicio
	    FROM usuario as us, empresa as em WHERE fkGerente = ${idUsuario} AND fkEmpresa = idEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresaGerente(cnpj, razaoSocial, logradouro, numLogradouro, cep, telefone, nomeCompleto, cpf, celular, nascimento, email, senha, cargo, fkGerente, dataInicio) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresaGerente()");
    var instrucao = `
    CALL cadastrar_empresaGerente ('${cnpj}', '${razaoSocial}', '${logradouro}', ${numLogradouro}, '${cep}', '${telefone}', '${email}', '${senha}', '${nomeCompleto}', '${cpf}', '${celular}', '${nascimento}', '${cargo}', ${fkGerente}, '${dataInicio}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeCompleto, cpf, celular, nascimento, email, senha, cargo, fkGerente, dataInicio, cnpjEmpresa) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresaGerente()");
    var instrucao = `
    INSERT INTO usuario (email, senha, nome, cpf, telefone, dataNascimento, fkEmpresa,cargo, fkGerente, dataInicio) 
		VALUES ('${email}', '${senha}', '${nomeCompleto}', '${cpf}', '${celular}', '${nascimento}', (SELECT idEmpresa FROM empresa WHERE cnpjEmpresa = '${cnpjEmpresa}'), '${cargo}', ${fkGerente}, '${dataInicio}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone, fkEmpresa) {
    console.log("ACESSEI A AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAgencia()");
    var instrucao = `
    CALL cadastrarAgencia ('${apelido}', '${cnpj}', '${cep}', '${logradouro}', '${numLogradouro}', '${telefone}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database
    .executar(instrucao);
}

function listarUltimoIdEmpresa(){
    var instrucao = ` 
    select idEmpresa from empresa order by idEmpresa desc LIMIT 1;
    `
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaUsuarios,
    cadastrarEmpresaGerente,
    cadastrarFuncionario,
    cadastrarAgencia,
    listarUltimoIdEmpresa
};