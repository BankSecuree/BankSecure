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

        fetch("/login/entrar", {
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
                    sessionStorage.CARGO_USUARIO = json.cargo;
                    sessionStorage.CPF_USUARIO = json.cpf;
                    sessionStorage.TELEFONE_USUARIO = json.telefone;
                    let dataNascimento = new Date(json.dataNascimento);
                    sessionStorage.DATA_NASCIMENTO_USUARIO = `${dataNascimento.getDate().toString().padStart(2, '0')}/${(dataNascimento.getMonth() + 1).toString().padStart(2, '0')}/${dataNascimento.getFullYear().toString()}`
                    sessionStorage.FOTO_USUARIO = json.foto;
                    sessionStorage.GERENTE_USUARIO = json.fkGerente;
                    sessionStorage.ID_EMPRESA = json.idEmpresa;
                    sessionStorage.NOME_EMPRESA = json.razaoSocial;
                    sessionStorage.CNPJ_EMPRESA = json.cnpjEmpresa;
                    sessionStorage.TELEFONE_EMPRESA = json.telefoneEmpresa;
                    
                   
                    setTimeout(function () {
                        if (sessionStorage.GERENTE_USUARIO == 'null') {//Interno
                            window.location = "./dashboard/index.html";
                        }else if (sessionStorage.GERENTE_USUARIO == 1) {//Gerente de TI
                            window.location = "./dashboard/indexGerente.html";
                        }else{

                            window.location = "./dashboard/indexAnalista\.html";
                        }
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