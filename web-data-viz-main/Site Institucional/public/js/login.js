function entrar() {
    // aguardar();
    
    var emailVar = yourUsername.value;
    var senhaVar = yourPassword.value;
    var erroEntrar = false

    // if (emailVar == '' || emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1 ) {
    //     erroEntrar = true;
    //     erroE1.style.display = 'block';
    //     ipt_email.style.border = '2px solid red';
    // } else {
    //     erroE1.style.display = 'none';
    //     ipt_email.style.border = '2px solid #32a7b1';
    // }
    // if (senhaVar == '' || senhaVar.length < 6) {
    //     erroEntrar = true;
    //     erroS1.style.display = 'block';
    //     ipt_senha.style.border = '2px solid red';
    // } else {
    //     erroS1.style.display = 'none';
    //     ipt_senha.style.border = '2px solid #32a7b1';
    // }

    if (erroEntrar == true) {
        // finalizarAguardar();
        return false;
    }
    else {
        // setInterval(sumirMensagem, 5000)

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    
                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.SENHA_USUARIO = json.senha;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.CPF_USUARIO = json.cpf;
                    sessionStorage.TELEFONE_USUARIO = json.telefone;
                    sessionStorage.FOTO_USUARIO = json.foto;
                    sessionStorage.GERENTE_USUARIO = json.gerente;
                    
                   
                    setTimeout(function () {
                        window.location = "./dashboard/index.html";
                    }, 2000); 

                });
                // cardErroLogin.style.display = "block"
                // cardErroLogin.style.border = "2px solid greenyellow"
                // cardErroLogin.style.color = "greenyellow"
                // mensagem_erroLogin.innerHTML = "✅Entrando! Aguarde...✅";
            } else {
                // cardErroLogin.style.display = "block"
                // cardErroLogin.style.border = "2px solid red"
                // cardErroLogin.style.color = "red"
                // mensagem_erroLogin.innerHTML = "❌Conta não cadastrada❌";
            
                console.log("Houve um erro ao tentar realizar o login!");

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
}