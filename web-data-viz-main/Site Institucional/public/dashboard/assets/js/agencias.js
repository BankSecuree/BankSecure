var temErro = false;
var fkEmpresaGlobal;

function exibirTabelaAgencias() { 
    var lista = document.getElementById("tabela-agencias");
    var trColunas = document.createElement("tr");
    var thead = document.createElement("thead");
    var thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.innerHTML = "#";
    var thApelido = document.createElement("th");
    thApelido.setAttribute("scope", "row");
    thApelido.innerHTML = "Apelido";
    var thCnpj = document.createElement("th");
    thCnpj.setAttribute("scope", "row");
    thCnpj.innerHTML = "CNPJ";
    var thFuncionarios = document.createElement("th");
    thFuncionarios.setAttribute("scope", "row");
    thFuncionarios.innerHTML = "Funcionários";
    var thCaixaEletronico = document.createElement("th");
    thCaixaEletronico.setAttribute("scope", "row");
    thCaixaEletronico.innerHTML = "Caixas Eletrônicos";
    trColunas.appendChild(thId);
    trColunas.appendChild(thApelido);
    trColunas.appendChild(thCnpj);
    trColunas.appendChild(thFuncionarios);
    trColunas.appendChild(thCaixaEletronico);
    if (sessionStorage.GERENTE_USUARIO == "1") {
        var thExcluir = document.createElement("th");
        thExcluir.setAttribute("scope", "row");
        thExcluir.innerHTML = "Editar/Excluir";
        trColunas.appendChild(thExcluir);
    }
    thead.appendChild(trColunas);
    lista.appendChild(thead);
    fetch(`/agencias/exibirTabelaAgencias/${sessionStorage.ID_EMPRESA}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("tabela-agencias");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    var lista = document.getElementById("tabela-agencias");

                    var thNumero = document.createElement("th");
                    thNumero.innerHTML = publicacao.idAgencia;
                    thNumero.setAttribute("scope", "row");
                    var tdApelido = document.createElement("td");
                    tdApelido.innerHTML = publicacao.apelido;
                    var tdCnpj = document.createElement("td");
                    tdCnpj.innerHTML = publicacao.cnpjAgencia;
                    
                    var tdFuncionarios = document.createElement("td");
                    var tdMaquinas = document.createElement("td");
                    fetch(`/agencias/exibirQuantidadeFuncionariosAgencia/${publicacao.idAgencia}`).then(function (respostaDois) {respostaDois.json().then(function (respostaDois) {
                        // console.log(respostaDois)
                        tdFuncionarios.innerHTML = respostaDois[0].funcionarios
                        tdMaquinas.innerHTML = respostaDois[0].agencias })
                    });
                    var tdButton = document.createElement("td");
                    tdButton.innerHTML = `<a onclick="editarAgencia(${publicacao.idAgencia})" class="btn btn-primary btn-sm" title="Remove my profile image"><i
                    class="bi bi-pencil-square"></i></a>
                    <a onclick="excluirAgencia(${publicacao.idAgencia})" class="btn btn-danger btn-sm" title="Remove my profile image"><i
                    class="bi bi-trash"></i></a>
                    `;
                    var tr = document.createElement("tr");
                    var tbody = document.createElement("tbody");


                    tr.appendChild(thNumero);
                    tr.appendChild(tdApelido);
                    tr.appendChild(tdCnpj);
                    tr.appendChild(tdFuncionarios);
                    tr.appendChild(tdMaquinas);
                    tr.appendChild(tdButton);
                    tbody.appendChild(tr);
                    lista.appendChild(tbody);
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

function editarAgencia(idAgencia) {
    
    
}

function excluirAgencia(idAgencia) {
    console.log(`Excluindo usuário ${idAgencia} funcionando `);   
}


function validar() {

    var ipt_apelido = iptApelido.value;
    var cnpj = iptCnpj.value;
    var cep = iptCep.value;
    var logradouro = iptLogradouro.value;
    var numero = iptNumero.value;

    if (ipt_apelido == '' && cnpj == '' && cep == '' && logradouro == '' && numero == '') {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("erro")
        mensagemErro.innerHTML = `Todos os campos estão vazios`
        temErro = true;
    }
    else if (ipt_apelido == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Apelido não pode ser vazio`
        temErro = true;
    }
    else if (cnpj == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CNPJ não pode ser vazio`
        temErro = true;
    }
    else if (cep == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O CEP não pode ser vazio`
        temErro = true;
    }
    else if (logradouro == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Logradouro não pode ser vazio`
        temErro = true;
    }
    else if (numero == "") {
        msg_alertas.style.display = "block"
        Erro = document.getElementById("mensagemErro")
        Erro.classList.add("alerta")
        mensagemErro.innerHTML = `O Número não pode ser vazio`
        temErro = true;
    }
    if (isNaN(numero)) {
        msg_alertas.style.display = "block"
        Erro.classList.add("erro")
        Erro = document.getElementById("mensagemErro")
        mensagemErro.innerHTML = `O número não pode ter letras`
        temErro = true;
    }
}

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

function mascaraCnpj() {
    var tamanhoCnpj = iptCnpj.value.length

    if (tamanhoCnpj == 2) {
        iptCnpj.value += '.'
    }
    if (tamanhoCnpj == 6) {
        iptCnpj.value += '.'
    }
    if (tamanhoCnpj == 10) {
        iptCnpj.value += '/'
    }
    if (tamanhoCnpj == 15) {
        iptCnpj.value += '-'
    }
}

function mascaraCep() {
    var tamanhoCep = iptCep.value.length

    if (tamanhoCep == 5) {
        iptCep.value += "-"
    }
}

function mascaraTelefone() {
    var tamanhoTelefone = iptTelefone.value.length

    if (tamanhoTelefone == 0) {
        iptTelefone.value += "("
    }
    if (tamanhoTelefone == 3) {
        iptTelefone.value += ")"
    }
    if (tamanhoTelefone == 9) {
        iptTelefone.value += "-"
    }
}

function eliminarMascaras() {
    var cepFormatado;
    var cnpjFormatado;
    var telefoneFormatado;

    var cepMascarado = iptCep.value
    var cnpjMascarado = iptCnpj.value
    var telefoneMascarado = iptTelefone.value

    //Retirando a máscara do cep  

    cepFormatado = cepMascarado.replace("-", "")

    // Retirando a máscara do CNPJ

    cnpjFormatado = cnpjMascarado.replaceAll(".", "")
    cnpjFormatado = cnpjFormatado.replaceAll("-", "")
    cnpjFormatado = cnpjFormatado.replaceAll("/", "")

    // Retirando a máscara do telefone

    telefoneFormatado = telefoneMascarado.replaceAll("-", "")
    telefoneFormatado = telefoneFormatado.replaceAll("(", "")
    telefoneFormatado = telefoneFormatado.replaceAll(")", "")

    return { cnpjFormatado, cepFormatado, telefoneFormatado }
}

function desaparecerCard() {
    msg_alertas.style.display = "none"
    msg_alertas2.style.display = "none"
}


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


function cadastrarAgencia() {
    selectfkEmpresa();
    validar();
    setTimeout(desaparecerCard, 5000);
    const retorno = eliminarMascaras()

    cnpjFormatado = retorno.cnpjFormatado
    cepFormatado = retorno.cepFormatado
    telefoneFormatado = retorno.telefoneFormatado


    if (temErro == false) {
        var agenciaApelidoVar = iptApelido.value;
        var agenciaCNPJVar = cnpjFormatado;
        var agenciaCEPVar = cepFormatado;
        var agenciaLogradouroVar = iptLogradouro.value;
        var agenciaNumeroVar = iptNumero.value;
        var agenciaTelefoneVar = telefoneFormatado;
        var fkEmpresaVar = fkEmpresaGlobal;

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrarAgencia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                agenciaCnpjServer: agenciaCNPJVar,
                agenciaApelidoServer: agenciaApelidoVar,
                agenciaLogradouroServer: agenciaLogradouroVar,
                agenciaNumeroServer: agenciaNumeroVar,
                agenciaCepServer: agenciaCEPVar,
                agenciaTelefoneServer: agenciaTelefoneVar,
                agenciaFkEmpresa: fkEmpresaVar

            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                alert("Cadastro realizado com sucesso!");

                window.location = "conta_agencias.html";


                // limparFormulario();
                // finalizarAguardar();
            } else {
                alert("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            // finalizarAguardar();
        });

        return false;

    }
    else{
        msg_alertas2.style.display += "block"
        Erro2 = document.getElementById("mensagemErro2")
        Erro2.classList.add("erro")
        mensagemErro2.innerHTML += `Corrija seus erros para prosseguir`
    }
}  
