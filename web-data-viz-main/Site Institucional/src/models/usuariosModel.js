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

<<<<<<< HEAD
function cadastrarFuncionario(nomeCompleto, cpf, celular, nascimento, email, senha, cargo, fkGerente, dataInicio) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresaGerente()");
    var instrucao = `
    CALL cadastrar_empresaGerente ('${cnpj}', '${razaoSocial}', '${logradouro}', ${numLogradouro}, '${cep}', '${telefone}', '${email}', '${senha}', '${nomeCompleto}', '${cpf}', '${celular}', '${nascimento}', '${cargo}', ${fkGerente}, '${dataInicio}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAgencia() {
    console.log("ACESSEI A AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
=======
function cadastrarAgencia(apelido, cnpj, cep, logradouro, numLogradouro, telefone) {
    console.log("ACESSEI A AGÊNCIA  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAgencia()");
>>>>>>> caff6a723fb52b4109512b552409ab3aa5fc61e0
    var instrucao = `
    CALL cadastrarAgencia ('${apelido}', '${cnpj}', '${cep}', '${logradouro}', '${numLogradouro}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirTabelaUsuarios,
    cadastrarEmpresaGerente,
    cadastrarFuncionario,
    cadastrarAgencia
};