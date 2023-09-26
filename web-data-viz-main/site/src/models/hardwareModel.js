var database = require("../database/config");

function cadastrarNomeMaquina(nomeMaquina, fkAgencia, tipoMaquina){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    INSERT INTO maquina (nome, fkAgencia, fkTipoMaquina) VALUES('${nomeMaquina}',${fkAgencia}, ${tipoMaquina});
    
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function criarViewMaquina(nomeMaquina){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    CREATE VIEW vw_maquina_${nomeMaquina} AS SELECT * FROM vw_registrosEstruturados WHERE id = (SELECT idMaquina FROM maquina ORDER BY idMaquina DESC limit 1);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarComponente(componente){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarHardware()");
    var instrucao = `
    CALL cadastrar_maquinaComponente (${componente})
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirTabelaMaquinas(idEmpresa) {
    console.log("ACESSEI O AGENCIAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirTabelaUsuarios()");
    var instrucao = `
    SELECT m.idMaquina, m.nome, (SELECT nomeTipo FROM tipoMaquina WHERE idTipoMaquina = m.fkTipoMaquina) as tipo, a.apelido as agencia  FROM maquina as m JOIN agencia as a ON m.fkAgencia = a.idAgencia AND a.fkEmpresa = 2;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirOptionAgencia(idEmpresa){
    console.log("ACESSEI O HARDWARE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirOptionAgencia()");
    var instrucao = `
    SELECT * FROM agencia WHERE fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarMaquina(idMaquina){
    console.log("CHEGUEI AQUI");

    var comando = `
        DELETE FROM maquina WHERE idMaquina = ${idMaquina}
    `
    console.log(comando)
    return database.executar(comando);
}
function alterarMaquina(idMaquina, nome, tipo, agencia){
    console.log("CHEGUEI AQUI");

    var comando = `
    UPDATE maquina SET nome = '${nome}', fkTipoMaquina = (SELECT idTipoMaquina FROM tipoMaquina WHERE nomeTipo = '${tipo}'),
    fkAgencia = (SELECT idAgencia FROM agencia WHERE apelido = '${agencia}') WHERE idMaquina = ${idMaquina}
    `
    console.log(comando)
    return database.executar(comando);
}

module.exports = {
    cadastrarNomeMaquina,
    cadastrarComponente,
    exibirOptionAgencia,
    exibirTabelaMaquinas,
    criarViewMaquina,
    deletarMaquina,
    alterarMaquina
};