function exibirPerfil() {
    var scrFoto = "profile.png"
    if (sessionStorage.FOTO_USUARIO != "null" && sessionStorage.FOTO_USUARIO != "undefined") {
        scrFoto = sessionStorage.FOTO_USUARIO;
    }
    let fotoPerfil = document.getElementById("foto-perfil");
    fotoPerfil.setAttribute("src", `assets/img/usuario/${scrFoto}`);
    let nomePerfil = document.getElementById("nome-perfil");
    nomePerfil.innerHTML = sessionStorage.NOME_USUARIO;
    let cargoPerfil = document.getElementById("cargo-perfil");
    cargoPerfil.innerHTML = sessionStorage.CARGO_USUARIO;

    let nomeGeral = document.getElementById("nome-geral");
    nomeGeral.innerHTML = sessionStorage.NOME_USUARIO;
    let cpfGeral = document.getElementById("cpf-geral");
    let cpf = (sessionStorage.CPF_USUARIO).replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3-');
    cpfGeral.innerHTML = cpf;
    let dataNascimentoGeral = document.getElementById("dataNascimento-geral");
    dataNascimentoGeral.innerHTML = sessionStorage.DATA_NASCIMENTO_USUARIO;
    let telefoneGeral = document.getElementById("telefone-geral");
    telefoneGeral.innerHTML = sessionStorage.TELEFONE_USUARIO;
    let emailGeral = document.getElementById("email-geral");
    emailGeral.innerHTML = sessionStorage.EMAIL_USUARIO;
    let empresaGeral = document.getElementById("empresa-geral");
    empresaGeral.innerHTML = sessionStorage.NOME_EMPRESA;
    let cnpjGeral = document.getElementById("cnpj-geral");
    let cnpj = (sessionStorage.CNPJ_EMPRESA).replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, '$1.$2.$3/$4-');
    cnpjGeral.innerHTML = cnpj;
    let cargoGeral = document.getElementById("cargo-geral");
    cargoGeral.innerHTML = sessionStorage.CARGO_USUARIO;

    let fotoEditar = document.getElementById("foto-editar");
    fotoEditar.setAttribute("src", `assets/img/usuario/${scrFoto}`);
    let nomeEditar = document.getElementById("nome-editar");
    nomeEditar.value = sessionStorage.NOME_USUARIO;
    let cpfEditar = document.getElementById("cpf-editar");
    cpfEditar.value = cpf;
    let dataNascimentoEditar = document.getElementById("dataNascimento-editar");
    dataNascimentoEditar.value = sessionStorage.DATA_NASCIMENTO_USUARIO;
    let telefoneEditar = document.getElementById("telefone-editar");
    telefoneEditar.value = sessionStorage.TELEFONE_USUARIO;
    let emailEditar = document.getElementById("email-editar");
    emailEditar.value = sessionStorage.EMAIL_USUARIO;
    let cargoEditar = document.getElementById("cargo-editar");
    cargoEditar.value = sessionStorage.CARGO_USUARIO;
}

function novaImagem() {
    const formData = new FormData();
    formData.append('imgNova', imgNova.files[0])

    fetch(`/perfil/alterarImagem/${sessionStorage.ID_USUARIO}`, {
        method: "POST",
        body: formData
    })
        .then(res => {
            atualizarFoto()
        })
        .catch(err => {
            console.log(err);
        })
}

function atualizarFoto() {
    fetch(`/perfil/atualizarFoto/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                // console.log(JSON.stringify(json));
                sessionStorage.FOTO_USUARIO = json[0].foto;
                cardMsg.style.display = "block"
                cardMsg.style.border = "2px solid greenyellow"
                cardMsg.style.color = "greenyellow"
                cardMsg.innerHTML = "✅Foto Atualizada! Atualizando...✅";
                setTimeout(function () {
                    location.reload();
                }, 2000);

            });
        } else {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.innerHTML = "❌Erro ao atualizar a foto! Tente novamente...";
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}

function atualizarDados() {
    let nomeVar = (document.getElementById("nome-editar")).value;
    let cpfVar = (document.getElementById("cpf-editar")).value;
    let dataNascimentoVar = ((document.getElementById("dataNascimento-editar")).value).split("/").reverse().join("-");
    let telefoneVar = (document.getElementById("telefone-editar")).value;
    let emailVar = (document.getElementById("email-editar")).value;
    let cargoVar = (document.getElementById("cargo-editar")).value;
    fetch(`/perfil/atualizarDados/${sessionStorage.ID_USUARIO}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            cpfServer: cpfVar,
            dataNascimentoServer: dataNascimentoVar,
            telefoneServer: telefoneVar,
            emailServer: emailVar,
            cargoServer: cargoVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            sessionStorage.NOME_USUARIO = nomeVar
            sessionStorage.CPF_USUARIO = cpfVar
            sessionStorage.DATA_NASCIMENTO_USUARIO = dataNascimentoVar
            sessionStorage.TELEFONE_USUARIO = telefoneVar
            sessionStorage.EMAIL_USUARIO = emailVar
            sessionStorage.CARGO_USUARIO = cargoVar
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid greenyellow"
            cardMsg.style.color = "greenyellow"
            cardMsg.innerHTML = "✅Dados alterados! Atualizando...✅";
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else {
            cardMsg.style.display = "block"
            cardMsg.style.border = "2px solid red"
            cardMsg.style.color = "red"
            cardMsg.innerHTML = "❌Erro ao alterar os dados! Tente novamente...";
            setTimeout(function () {
                location.reload();
            }, 3000);
            console.log("Houve um erro ao tentar atualizar os dados!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


function atualizarSenha() {
    var idUsuario = sessionStorage.ID_USUARIO;
    let senhaAtual = (document.getElementById("ipt_senha_atual")).value;
    let senhaNovaServer = (document.getElementById("ipt_senha_nova")).value;
    let senhaNovaConfirma = (document.getElementById("ipt_senha_nova_c")).value;
    if (senhaAtual != sessionStorage.SENHA_USUARIO) {
        alert("Senha atual incorreta!")
    } else if (senhaNovaServer != senhaNovaConfirma) {
        alert("Senhas diferentes!") 
    } else {
         fetch(`/perfil/atualizarSenha/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senhaNovaServer: senhaNovaServer
            })
        })
        .then(function (resposta) {
        if (resposta.ok) {
                // console.log(JSON.stringify(json));
                sessionStorage.SENHA_USUARIO = senhaNovaServer;
                cardMsg.style.display = "block"
                cardMsg.style.border = "2px solid greenyellow"
                cardMsg.style.color = "greenyellow"
                cardMsg.innerHTML = "✅Senha alterada! Atualizando...✅";
                console.log("CArregando")
                setTimeout(function () {
                    location.reload();
                }, 3000);
            } else {
                console.log(resposta);
                cardMsg.style.display = "block"
                cardMsg.style.border = "2px solid red"
                cardMsg.style.color = "red"
                cardMsg.innerHTML = "❌Erro ao alterar a senha! Tente novamente...";
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
            // finalizarAguardar();
        });
    }
}