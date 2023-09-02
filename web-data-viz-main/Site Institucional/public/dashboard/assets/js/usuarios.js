var temErros;
var idUsuario = 0;

function eliminarNumeros(id) {
    const input = document.getElementById(id)
    var listaLetras = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    for (var i = 0; i <= 9; i++) {
        if (input.value[input.value.length - 1] == Number(listaLetras[i]) && input.value[input.value.length - 1] != ' ') {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Números`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
    }
    for (var letra = 0; letra <= input.value.length - 1; letra++) {
        if (isNaN(input.value[letra]) == false && input.value[letra] != ' ') {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Números`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
    }
}

function eliminarLetras(id) {
    const input = document.getElementById(id)
    var listaLetras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@;,?|{}[]~^'

    for (var i = 0; i <= 62; i++) {
        if (input.value[input.value.length - 1] == listaLetras[i]) {
            msg_alertas.style.display = "block"
            Erro = document.getElementById("mensagemErro")
            Erro.classList.add("erro")
            mensagemErro.innerHTML = `Este campo não pode ter Letras`
            input.value = ''
            setTimeout(desaparecerCard, 5000);
        }
        for (var letra = 0; letra <= input.value.length - 1; letra++) {
            if (input.value[letra] == listaLetras[i]) {
                msg_alertas.style.display = "block"
                Erro = document.getElementById("mensagemErro")
                Erro.classList.add("erro")
                mensagemErro.innerHTML = `Este campo não pode ter Letras`
                input.value = ''
                setTimeout(desaparecerCard, 5000);
            }
        }
    }

}

function mascaraCPF() {
    var tamanhoCpf = iptCPF.value.length

    if (tamanhoCpf == 3) {
        iptCPF.value += "."
    }
    if (tamanhoCpf == 7) {
        iptCPF.value += "."
    }
    if (tamanhoCpf == 11) {
        iptCPF.value += "-"
    }
}

function mascaraTelefone() {
    var tamanhoTelefone = iptCelular.value.length

    if (tamanhoTelefone == 0) {
        iptCelular.value += "("
    }
    if (tamanhoTelefone == 3) {
        iptCelular.value += ")"
    }
    if (tamanhoTelefone == 9) {
        iptCelular.value += "-"
    }
}

function eliminarMascaras() {
    var cpfFormatado;
    var celularFormatado;

    var cpfMascarado = iptCnpj.value
    var celularMascarado = iptCelular.value

    // Retirando a máscara do CPF

    cpfFormatado = cpfMascarado.replaceAll("-", "")
    cpfFormatado = cpfFormatado.replaceAll(".", "")

    // Retirando a máscara do telefone

    celularFormatado = celularMascarado.replaceAll("-", "")
    celularFormatado = celularFormatado.replaceAll("(", "")
    celularFormatado = celularFormatado.replaceAll(")", "")

    return { cpfFormatado, celularFormatado }
}

function desaparecerCard() {
    msg_alertas.style.display = "none"
    msg_alertas2.style.display = "none"
}

function validar() {
    var nomeCompleto = iptNomeCompleto.value;
    var cpf = iptCPF.value
    var celular = iptCelular.value;
    var nascimento = iptNascimento.value;
    var cargo = iptCargo.value;
    var email = iptEmail.value;
    var senha = iptSenha.value;


    if (cpf.length < 14) {
        msg_alertas.style.display = "block"
        Erro.classList.add("erro")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `Digite um CPF válido`
        temErro = true;
    }
    else if (celular < 14) {
        msg_alertas.style.display = "block"
        Erro.classList.add("erro")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `Digite um celular válido`
        temErro = true;
    }
    else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        msg_alertas.style.display = "block"
        Erro.classList.add("erro")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `Digite um e-mail válido`
        temErro = true;
    }
    else if (nomeCompleto == "" && cpf == "" && celular == "" && nascimento == "" && cargo == "" && email == "" && senha == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("erro")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `Todos os campos estão vazios`
        temErro = true;
    }
    else if (nomeCompleto == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O nome não pode ser vazio`
        temErro = true;
    }
    else if (cpf == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O CPF não pode ser vazio`
        temErro = true;
    }
    else if (celular == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O celular não pode estar vazio`
        temErro = true;
    }
    else if (nascimento == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O nascimento não pode estar vazio`
        temErro = true;
    }
    else if (cargo == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O cargo não pode estar vazio`
        temErro = true;
    }
    else if (email == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O email não pode estar vazio`
        temErro = true;
    }
    else if (senha == "") {
        msg_alertas.style.display = "block"
        Erro.classList.add("alerta")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `A senha não pode estar vazia`
        temErro = true;
    }
}



function exibirTabelaUsuarios() {
    var lista = document.getElementById("tabela-usuarios");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thNome = document.createElement("th");
    thNome.setAttribute("scope", "row");
    thNome.innerHTML = "Nome";
    var thEmpresa = document.createElement("th");
    thEmpresa.setAttribute("scope", "row");
    thEmpresa.innerHTML = "Empresa";
    var thDataInicio = document.createElement("th");
    thDataInicio.setAttribute("scope", "row");
    thDataInicio.innerHTML = "Data de Início";
    var thExcluir = document.createElement("th");
    thExcluir.setAttribute("scope", "row");
    thExcluir.innerHTML = "Editar/Excluir";

    trColunas.appendChild(thId);
    trColunas.appendChild(thNome);
    trColunas.appendChild(thEmpresa);
    trColunas.appendChild(thDataInicio);
    trColunas.appendChild(thExcluir);
    thead.appendChild(trColunas);
    lista.appendChild(thead);

    fetch(`/usuarios/exibirTabelaUsuarios/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-usuarios");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                var contId = 0;
                for (let i = resposta.length - 1; i >= 0; i--) {
                    console.log(i)
                    console.log(publicacao)
                    var lista = document.getElementById("tabela-usuarios");
                    var publicacao = resposta[i];

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = contId + 1;
                    thNumero.setAttribute("scope", "row");
                    var tdNome = document.createElement("td");
                    tdNome.innerHTML = publicacao.nome;
                    var tdEmpresa = document.createElement("td");
                    tdEmpresa.innerHTML = publicacao.empresa;
                    var tdInicio = document.createElement("td");
                    var dataInicio = new Date(publicacao.dataInicio)
                    dataInicio = `${dataInicio.getDate().toString().padStart(2, '0')}/${(dataInicio.getMonth() + 1).toString().padStart(2, '0')}/${dataInicio.getFullYear().toString()}`
                    tdInicio.innerHTML = dataInicio;
                    var tdButton = document.createElement("td");
                    tdButton.innerHTML = `
                    <a onclick="editarUsuario(${publicacao.idUsuario})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
                    class="bi bi-person-lines-fill"></i></a>
                    <a onclick="excluirUsuario(${publicacao.idUsuario})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
                    class="bi bi-trash"></i></a>
                    `;
                    var tr = document.createElement("tr");
                    tr.setAttribute("onclick", `redirecionarVincularAgencia(${publicacao.idUsuario})`);
                    var tbody = document.createElement("tbody");

                    tr.appendChild(thNumero);
                    tr.appendChild(tdNome);
                    tr.appendChild(tdEmpresa);
                    tr.appendChild(tdInicio);
                    tr.appendChild(tdButton);
                    tbody.appendChild(tr);
                    lista.appendChild(tbody);

                    contId++;
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}


function excluirUsuario(idUsuario) {
    console.log(`Excluindo usuário ${idUsuario} funcionando `)
}

function obterLogin() {
    iptLogin.value = iptEmail.value;
}

function obterDadosCNPJ() {
    fetch(`https://publica.cnpj.ws/cnpj/${iptCnpj.value}`)
        .then(data => {
            return data.json();
        })
        .then(post => {

            dadosCNPJ = post;
            // console.log(dadosCNPJ)

            iptRazaoSocial.value = dadosCNPJ.razao_social;;
            iptLogradouro.value = `${dadosCNPJ.estabelecimento.tipo_logradouro} ${dadosCNPJ.estabelecimento.logradouro}`;
            iptNumLogradouro.value = dadosCNPJ.estabelecimento.numero;
            iptCEP.value = dadosCNPJ.estabelecimento.cep;

        })
        .catch(error => {
            console.log("CNPJ não localizado na base de dados!")
        })

}

function cadastrarEmpresaGerente() {
    validar();
    setTimeout(desaparecerCard, 5000);
    const retorno = eliminarMascaras();


    var cnpjVar = iptCnpj.value;
    var razaoSocialVar = iptRazaoSocial.value;
    var logradouroVar = iptLogradouro.value;
    var numLogradouroVar = iptNumLogradouro.value;
    var cepVar = iptCEP.value;
    var telefoneVar = iptTelefone.value;
    var nomeCompletoVar = iptNomeCompleto.value;
    var cpfVar = retorno.cpfFormatado
    var celularVar = retorno.celularFormatado;
    var nascimentoVar = iptNascimento.value;
    var cargoVar = iptCargo.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    var dataInicioVar = new Date();
    dataInicioVar = `${dataInicioVar.getFullYear().toString()}-${(dataInicioVar.getMonth() + 1).toString().padStart(2, '0')}-${dataInicioVar.getDate().toString().padStart(2, '0')}`
    var fkGerenteVar;
    if (sessionStorage.GERENTE_USUARIO == "null") {
        fkGerenteVar = 1;
    } else {
        fkGerenteVar = sessionStorage.GERENTE_USUARIO;
    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrarEmpresaGerente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js

            cnpjServer: cnpjVar,
            razaoSocialServer: razaoSocialVar,
            logradouroServer: logradouroVar,
            numLogradouroServer: numLogradouroVar,
            cepServer: cepVar,
            telefoneServer: telefoneVar,
            nomeCompletoServer: nomeCompletoVar,
            cpfServer: cpfVar,
            celularServer: celularVar,
            nascimentoServer: nascimentoVar,
            cargoServer: cargoVar,
            fkGerenteServer: fkGerenteVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            dataInicioServer: dataInicioVar

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            alert("Cadastro realizado com sucesso!");

            window.location = "conta_usuarios.html";


            // limparFormulario();
            // finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });
    selectfkEmpresa();
    return false;
}

var fkEmpresaGlobal;
function selectfkEmpresa() {
    var fkEmpresa;
    fetch('/usuarios/listarUltimoIdEmpresa').then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                var fkEmpresaArray = resposta[0];
                fkEmpresa = fkEmpresaArray.idEmpresa;
                fkEmpresaGlobal = fkEmpresa;
                console.log(fkEmpresaGlobal);
                sessionStorage.ID_EMPRESA = fkEmpresaGlobal;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ ultimo idEmpresa: ${error.message}`);
        });
    return fkEmpresa;
}

function cadastrarFuncionario() {
    validar()
    setTimeout(desaparecerCard, 5000);
    const retorno = eliminarMascaras()

    var nomeCompletoVar = iptNomeCompleto.value;
    var cpfVar = retorno.cpfFormatado
    var celularVar = retorno.celularFormatado;
    var nascimentoVar = iptNascimento.value;
    var cargoVar = iptCargo.value;
    var emailVar = iptEmail.value;
    var senhaVar = iptSenha.value;
    var dataInicioVar = new Date();
    dataInicioVar = `${dataInicioVar.getFullYear().toString()}-${(dataInicioVar.getMonth() + 1).toString().padStart(2, '0')}-${dataInicioVar.getDate().toString().padStart(2, '0')}`
    var cnpjVar = iptCnpj.value;
    var fkGerenteVar;

    if (sessionStorage.GERENTE_USUARIO == "null") {
        fkGerenteVar = 1;
    } else {
        fkGerenteVar = sessionStorage.ID_USUARIO;
    }
    if (temErros == false) {

        fetch("/usuarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeCompletoServer: nomeCompletoVar,
                cpfServer: cpfVar,
                celularServer: celularVar,
                nascimentoServer: nascimentoVar,
                cargoServer: cargoVar,
                fkGerenteServer: fkGerenteVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                dataInicioServer: dataInicioVar,
                cnpjServer: cnpjVar,
            })
        }).then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                msg_alertas.style.display = "block"
                Erro = document.getElementById("mensagemErro")
                Erro.classList.add("ok")
                mensagemErro.innerHTML = `Cadastro Realizado!`
                setTimeout(function () {
                    location.reload();
                }, 2000);
            } else {
                msg_alertas.style.display = "block"
                Erro = document.getElementById("mensagemErro")
                Erro.classList.add("erro")
                mensagemErro.innerHTML = `Houve um erro ao realizar o cadastro`
                throw ('Houve um erro ao tentar realizar o cadastro');
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        return false;
    }
    else {
        msg_alertas2.style.display += "block"
        Erro2 = document.getElementById("mensagemErro2")
        Erro2.classList.add("erro")
        mensagemErro2.innerHTML += `Corrija seus erros para prosseguir`
    }
}


function exibirCadastro() {
    if (sessionStorage.ID_USUARIO != 1) {
        iptCnpj.value = sessionStorage.CNPJ_EMPRESA;
        iptCnpj.setAttribute('disabled', '');
        obterDadosCNPJ()
        iptRazaoSocial.setAttribute('disabled', '');
        iptCEP.setAttribute('disabled', '');
        iptLogradouro.setAttribute('disabled', '');
        iptNumLogradouro.setAttribute('disabled', '');
        iptTelefone.value = sessionStorage.TELEFONE_EMPRESA;
        iptTelefone.setAttribute('disabled', '');
    }
    if (sessionStorage.ID_USUARIO == 1) {
        document.getElementById("botao-cadastrar").setAttribute("onclick", "cadastrarEmpresaGerente()")
    } else {
        document.getElementById("botao-cadastrar").setAttribute("onclick", "cadastrarFuncionario()")
    }
}

function exibirAgenciasVinculadas(){
    var lista = document.getElementById("tabela-agenciasVinculadas");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thAgencia = document.createElement("th");
    thAgencia.setAttribute("scope", "row");
    thAgencia.innerHTML = "Agencia";
    var thLogradouro = document.createElement("th");
    thLogradouro.setAttribute("scope", "row");
    thLogradouro.innerHTML = "Logradouro";
    var thCNPJ = document.createElement("th");
    thCNPJ.setAttribute("scope", "row");
    thCNPJ.innerHTML = "CNPJ";
    var thDesvincular = document.createElement("th");
    thDesvincular.setAttribute("scope", "row");
    thDesvincular.innerHTML = "Desvincular";

    trColunas.appendChild(thId);
    trColunas.appendChild(thAgencia);
    trColunas.appendChild(thLogradouro);
    trColunas.appendChild(thCNPJ);
    trColunas.appendChild(thDesvincular);
    thead.appendChild(trColunas);
    lista.appendChild(thead);
}

function exibirAgenciasNaoVinculadas(){
    var lista = document.getElementById("tabela-agenciasNaoVinculadas");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thAgencia = document.createElement("th");
    thAgencia.setAttribute("scope", "row");
    thAgencia.innerHTML = "Agencia";
    var thLogradouro = document.createElement("th");
    thLogradouro.setAttribute("scope", "row");
    thLogradouro.innerHTML = "Logradouro";
    var thCNPJ = document.createElement("th");
    thCNPJ.setAttribute("scope", "row");
    thCNPJ.innerHTML = "CNPJ";
    var thVincular = document.createElement("th");
    thVincular.setAttribute("scope", "row");
    thVincular.innerHTML = "Vincular";

    trColunas.appendChild(thId);
    trColunas.appendChild(thAgencia);
    trColunas.appendChild(thLogradouro);
    trColunas.appendChild(thCNPJ);
    trColunas.appendChild(thVincular);
    thead.appendChild(trColunas);
    lista.appendChild(thead);
}

function redirecionarVincularAgencia(par_idUsuario){
    

    const urlParams = new URLSearchParams(window.location.search);
urlParams.set('conta_funcionarioAgencia.html', 'par_idUsuario');
window.location.search = urlParams;
    
}

