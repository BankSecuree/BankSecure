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

function atualizarGrafico() {
  console.log("RODOU")
  let dados = []
  let textos = []

  let agencia = document.getElementById("listaAgencias").value
  let componente = document.getElementById("selectComponente").value

  console.log("Componente: ", componente);
  console.log("Agencia: ", agencia);

  fetch("/dashAgencias/dadosAnalista", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      agenciaServer: agencia,
      componenteServer: componente
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar dados analista()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)
        
        for (let i = 0; i < json.length; i++) {
          dados.push(json[i].valor)
          textos.push(json[i].dataHora)
        }
        grafico.updateSeries(
          [
            {
              data: dados
            }
          ]
        )
        grafico.updateOptions({
          xaxis: {
            categories: textos
          },
        })

        if(componente == 1){
          grafico.updateOptions({
            colors: ['#4154f1'],
          })

        }else if(componente == 2){

          grafico.updateOptions({
            colors: ['#2eca6a'],
          })

        }else{
          
          grafico.updateOptions({
            colors: ['#ff771d'],
          })

        }
      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })


  //arrays que vai armazenar os dados e os textos pegados do banco
  

  //Mudar valor dos dados

  //Mudar valor das "Labels" os textos
  

  setTimeout(atualizarGrafico,5000)
}