let arrayAgencias = []
let arrayMaquinas = []
let arrayNomeMaquinas = []

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
          for (let i = 0; i < resposta.length; i++) {

            //   var lista = document.getElementById("listaAgencias");
            var publicacao = resposta[i];
            console.log(i);
            console.log(publicacao);

            arrayAgencias.push(resposta[i].idAgencia)

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

function listaMaquinas(){

  let agencia = document.getElementById("listaAgencias").value;

  if(agencia == "" || agencia == undefined || agencia == null){
    agencia = 1
  }

  fetch(`/dashAgencias/exibirListaMaquinas/${agencia}`)
    .then(function (resposta) {
      if (resposta.ok) {

        if (resposta.status == 204) {
          var lista = document.getElementById("listaMaquinas");
          var mensagem = document.createElement("p");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          lista.innerHTML = "";
          lista.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          var contId = 0;
          var lista = document.getElementById("listaMaquinas");
          console.log(resposta[0].idMaquina)
          for (let i = 0; i <= resposta.length; i++) {

              // var lista = document.getElementById("listaAgencias");
            var publicacao = resposta[i];
            console.log(i);
            console.log(publicacao);

            var opcao = document.createElement("option");
            opcao.value = resposta[i].idMaquina
            opcao.innerHTML = resposta[i].nome
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
  // alert("rpda")
  console.log("RODOU")
  let dados = []
  let textos = []

  let agencia = document.getElementById("listaMaquinas").value
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


  atualizarCards()
}

function atualizarCards(){
  dadoCpu = document.getElementById("h4-cpu");
  alertaCpu = document.getElementById("msg-cpu");

  dadoMemoria = document.getElementById("h4-memoria");
  alertaMemoria = document.getElementById("msg-memoria");

  dadoDisco = document.getElementById("h4-disco");
  alertaDisco = document.getElementById("msg-disco");

  let maquina = document.getElementById("listaMaquinas").value

  console.log("maquina: ", maquina);

  fetch("/dashAgencias/dadosCards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      maquinaServer: maquina,
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar dados dos cards()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")

        let cpu = json[0].cpuu;
        let memoria = json[0].memoria
        let disco = json[0].disco

        dadoCpu.innerHTML = cpu + " %"
        dadoMemoria.innerHTML = memoria + " %"
        dadoDisco.innerHTML = disco + " %"

        if(cpu <= 20){
          alertaCpu.innerHTML = "Estável"
          alertaCpu.style.color = "rgb(25, 135, 84)"
        }else if(cpu <= 70){
          alertaCpu.innerHTML = "Atenção"
          alertaCpu.style.color = "rgb(255, 193, 7)"
        }else{
          alertaCpu.innerHTML = "Problema"
          alertaCpu.style.color = "rgb(220, 53, 69)"
        }
        
        if(memoria <= 20){
          alertaMemoria.innerHTML = "Estável"
          alertaMemoria.style.color = "rgb(25, 135, 84)"
        }else if(memoria <= 50){
          alertaMemoria.innerHTML = "Atenção"
          alertaMemoria.style.color = "rgb(255, 193, 7)"
        }else{
          alertaMemoria.innerHTML = "Problema"
          alertaMemoria.style.color = "rgb(220, 53, 69)"
        }

        if(disco <= 20){
          alertaDisco.innerHTML = "Estável"
          alertaDisco.style.color = "rgb(25, 135, 84)"
        }else if(disco <= 70){
          alertaDisco.innerHTML = "Atenção"
          alertaDisco.style.color = "rgb(255, 193, 7)"
        }else{
          alertaDisco.innerHTML = "Problema"
          alertaDisco.style.color = "rgb(220, 53, 69)"
        }

      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  setTimeout(atualizarGrafico,5000)
}

function pegarMaquinas(){
  arrayMaquinas = [];
  arrayNomeMaquinas = [];

  let repetcao = " or fkAgencia = " //sql de repetição
  let sql = "Select * from maquina where fkAgencia = " //sql inicial base

  sql += arrayAgencias[0] //adiciono a primeira agencia

  if(arrayAgencias.length > 1){//se tiver mais de uma agencia

    for(let i = 1; i < arrayAgencias.length; i++){ //for que vai percorrer mais de uma agencia
          sql += repetcao
          sql += arrayAgencias[i]
      }
      
  }

  sql += ";"

  alert(sql)

  fetch("/dashAgencias/pegarMaquinas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sqlServer: sql,
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar dados das maquinas()!")

    if (resposta.ok) {
      console.log("================================")
      console.log(resposta);
      console.log("================================")

      resposta.json().then(json => {

        console.log(JSON.stringify(json));
        console.log(json);

        console.log(json[0])
        for (let i = 0; i < json.length; i++) {
          arrayMaquinas.push(json[i].idMaquina);
          arrayNomeMaquinas.push(json[i].nome);
        }
        
        
      });
      

    } else {
      console.log("Houve um erro ao tentar pegar os dados das maquinas!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  pegarDadosGerais()
}

function criarCard(cpu,memoria,disco,nome){
  var div = document.querySelector("#divAlertas")
  var tela = document.createElement("div");
  tela.innerHTML = `CPU: ${cpu}, Memoria: ${memoria}, Disco: ${disco}, Nome: ${nome}`;
  div.appendChild(tela)
}

function pegarDadosGerais(){
  alert(arrayMaquinas[0])
  for (let i = 0; i < arrayMaquinas.length; i++) {
    
    fetch("/dashAgencias/pegarDadosGerais", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idMaquinaServer: arrayMaquinas[i],
      })
    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO pegar dados GERAI()!")
  
      if (resposta.ok) {
        console.log(resposta);
        
        resposta.json().then(json => {
  
          console.log(JSON.stringify(json));
          console.log(json);  

        let cpu = json[0].cpuu;
        let memoria = json[0].memoria
        let disco = json[0].disco



        criarCard(cpu,memoria,disco,arrayNomeMaquinas[i])
          
        });
        
  
      } else {
        console.log("Houve um erro ao tentar pegar os dados GERAIS das maquinas!");
      }
  
    }).catch(function (erro) {
      console.log(erro);
    })
    
  }
}

function abrirAlertas(){
  alert("EU")
}