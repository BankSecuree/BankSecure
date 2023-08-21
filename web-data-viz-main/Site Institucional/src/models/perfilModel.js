var database = require("../database/config")

function exibirPerfil(idUsuario) {
    console.log("ACESSEI O PERFIL  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirPerfil()");
    var instrucao = `
    SELECT idUsuário,
            nome,
            foto
            FROM funcionario WHERE idFuncionario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterarImagem(foto, idUsuario) {
    console.log("ACESSEI O PERFIL  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterarImagem():", foto, idUsuario);
    var instrucao = `
    UPDATE usuario SET foto = '${foto}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFoto(idUsuario) {
    console.log("ACESSEI O USUARIOS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT foto FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarDados(nome,cpf,dataNascimento,telefone,email,cargo,idUsuario) {
    console.log("ACESSEI O PERFIL  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarDados():", nome, cpf, dataNascimento, telefone, email, cargo, idUsuario);
    var instrucao = `
    UPDATE usuario SET 
        nome = '${nome}', 
        cpf = '${cpf}',
        dataNascimento = '${dataNascimento}', 
        telefone = '${telefone}',  
        email = '${email}', 
        cargo = '${cargo}'
            WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSenha(senhaNova,idUsuario) {
    console.log("ACESSEI O PERFIL  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSenha():", nome, cpf, dataNascimento, telefone, email, cargo, idUsuario);
    var instrucao = `
    UPDATE usuario SET 
        senha = '${senhaNova}', 
            WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    exibirPerfil,
    alterarImagem,
    atualizarFoto,
    atualizarDados,
    atualizarSenha
};