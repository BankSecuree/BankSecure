function exibirListaAgencias() {
    fetch(`/dashAgencias/exibirListaAgencias/${sessionStorage.ID_USUARIO}`)
      .then(function (resposta) {
        if (resposta.ok) {
  
          if (resposta.status == 204) {
            var lista = document.getElementById("listaAgencias");
            var mensagem = document.createElement("p");
            mensagem.innerHTML = "Nenhum resultado encontrado.";
            lista.innerHTML = "";
            lista.appendChild(mensagem);
            throw "Nenhum resultado encontrado!!";
          }
          resposta.json().then(function (resposta) {
            var contId = 0;
            var lista = document.getElementById("listaAgencias");
            console.log(resposta[0].idAgencia)
            for (let i = 0; i <= resposta.length; i++) {
                
                //   var lista = document.getElementById("listaAgencias");
                var publicacao = resposta[i];
                console.log(i);
                console.log(publicacao);

                var opcao = document.createElement("option");
                opcao.value = resposta[i].idAgencia
                opcao.innerHTML = resposta[i].apelido
                lista.appendChild(opcao)
            }
          });
        } else {
          throw "Houve um erro na API!";
        }
      })
      .catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
      });
  }