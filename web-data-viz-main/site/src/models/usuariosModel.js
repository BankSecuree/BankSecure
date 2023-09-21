var database = require("../database/config")

function exibirTabelaUsuarios(idUsuario) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT us.idUsuario, us.nome, em.razaoSocial as empresa,  us.dataInicio, us.fkEmpresa, (SELECT count(fkAgencia) FROM funcionarioAgencia WHERE fkUsuario = idUsuario) as agencias
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


function listarUltimoIdEmpresa(){
    var instrucao = ` 
    select idEmpresa from empresa order by idEmpresa desc LIMIT 1;
    `
    return database.executar(instrucao);
}

function excluirUsuario(idUsuario) {
    console.log("ACESSEI O AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirAgencia()");
    var instrucao = `
    DELETE FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFuncionario(idUsuario){
    var instrucao = ` 
    SELECT * FROM usuario WHERE idUsuario = ${idUsuario};
    `
    return database.executar(instrucao);
}

function listarAgenciasVinculadas(idUsuario){
    var instrucao = ` 
    SELECT a.* FROM usuario AS u JOIN funcionarioAgencia ON fkUsuario = idUsuario JOIN agencia AS a ON fkAgencia = idAgencia AND u.idUsuario = ${idUsuario};
    `
    return database.executar(instrucao);
}

function listarAgenciasNaoVinculadas(idUsuario, fkEmpresa){
    var instrucao = ` 
    SELECT * FROM funcionarioAgencia RIGHT JOIN agencia ON fkAgencia = idAgencia AND fkEmpresa = ${fkEmpresa} AND fkUsuario = ${idUsuario};
    `
    return database.executar(instrucao);
}

function desvincularAgencia(idUsuario, idAgencia) {
    console.log("ACESSEI O AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirAgencia()");
    var instrucao = `
    DELETE FROM funcionarioAgencia WHERE fkUsuario = ${idUsuario} AND fkAgencia = ${idAgencia};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function vincularAgencia(idUsuario, idAgencia) {
    console.log("ACESSEI O AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirAgencia()");
    var instrucao = `
    INSERT INTO funcionarioAgencia VALUES (${idUsuario}, ${idAgencia});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaUsuarios,
    cadastrarEmpresaGerente,
    cadastrarFuncionario,
    listarUltimoIdEmpresa,
    excluirUsuario,
    listarFuncionario,
    listarAgenciasVinculadas,
    listarAgenciasNaoVinculadas,
    desvincularAgencia,
    vincularAgencia
};