let arrayAgencias = []
let arrayMaquinas = []
let arrayNomeMaquinas = []

function exibirListaAgencias(isTemperatura) {
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
            // alert(arrayAgencias[i])
          }
          pegarMaquinas(isTemperatura);

          if(isTemperatura == true){
            atualizarMaiorTemp(resposta[0].idAgencia);
            atualizarMaiorUso(resposta[0].idAgencia);
            atualizarMenorUso(resposta[0].idAgencia);
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

function listaMaquinas() {

  let agencia = document.getElementById("listaAgencias").value;

  if (agencia == "" || agencia == undefined || agencia == null) {
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

        if (componente == 1) {
          grafico.updateOptions({
            colors: ['#4154f1'],
          })

        } else if (componente == 2) {

          grafico.updateOptions({
            colors: ['#2eca6a'],
          })

        } else {

          grafico.updateOptions({
            colors: ['#ff771d'],
          })

        }

        atualizarCards()
      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })



}

function atualizarCards() {
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

        if (cpu < 60) {
          alertaCpu.innerHTML = "Estável"
          alertaCpu.style.color = "rgb(25, 135, 84)"
        } else if (cpu <= 70) {
          alertaCpu.innerHTML = "Atenção"
          alertaCpu.style.color = "rgb(255, 193, 7)"
        } else {
          alertaCpu.innerHTML = "Problema"
          alertaCpu.style.color = "rgb(220, 53, 69)"
        }

        if (memoria < 60) {
          alertaMemoria.innerHTML = "Estável"
          alertaMemoria.style.color = "rgb(25, 135, 84)"
        } else if (memoria <= 70) {
          alertaMemoria.innerHTML = "Atenção"
          alertaMemoria.style.color = "rgb(255, 193, 7)"
        } else {
          alertaMemoria.innerHTML = "Problema"
          alertaMemoria.style.color = "rgb(220, 53, 69)"
        }

        if (disco < 60) {
          alertaDisco.innerHTML = "Estável"
          alertaDisco.style.color = "rgb(25, 135, 84)"
        } else if (disco <= 70) {
          alertaDisco.innerHTML = "Atenção"
          alertaDisco.style.color = "rgb(255, 193, 7)"
        } else {
          alertaDisco.innerHTML = "Problema"
          alertaDisco.style.color = "rgb(220, 53, 69)"
        }

        pegarDadosGerais()
      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

function pegarMaquinas(isTemperatura) {
  arrayMaquinas = [];
  arrayNomeMaquinas = [];

  let repetcao = " or fkAgencia = " //sql de repetição
  let sql = "Select * from maquina where fkAgencia = " //sql inicial base

  sql += arrayAgencias[0] //adiciono a primeira agencia

  if (arrayAgencias.length > 1) {//se tiver mais de uma agencia

    for (let i = 1; i < arrayAgencias.length; i++) { //for que vai percorrer mais de uma agencia
      sql += repetcao
      sql += arrayAgencias[i]
    }

  }

  sql += ";"

  // alert(sql)

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
        if(isTemperatura == true){
          atualizarMenorTemp(json[0].idMaquina);
          pegarNomeMaquina(null,json[0].idMaquina);
      }

        console.log(JSON.stringify(json));
        console.log(json);

        console.log(json[0])
        for (let i = 0; i < json.length; i++) {
          arrayMaquinas.push(json[i].idMaquina);
          arrayNomeMaquinas.push(json[i].nome);
        }

        atualizarGrafico();

      });


    } else {
      console.log("Houve um erro ao tentar pegar os dados das maquinas!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

let soma = 0;

function criarCard(nomeMaquina, nomeComponente, valor, nivel, unidadeMedida) {
  soma++;
  $('.bell').attr('valor-alerta', soma);

  var div = document.querySelector(".divAlertas")
  var tela = document.createElement("div");

  tela.classList.add("divAlerta")

  if (nivel == 2) {
    tela.classList.add("divAtencao")
    tela.innerHTML = `
    <div class="alert alert-warning" role="alert">
                        <svg class='botaoAlertaAmarelo' xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>.botaoAlertaAmarelo{fill:#e5c706}</style><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                        ATENÇÃO | ${nomeComponente} em: ${valor}${unidadeMedida} | Máquina: ${nomeMaquina}
                    </div>
    `;

  } else {
    tela.classList.add("divProblema")
    tela.innerHTML = `
    <div class="alert alert-danger" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" class="botaoAlertaVermelho" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>.botaoAlertaVermelho{fill:#ae0a0a}</style><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                        PROBLEMA | ${nomeComponente} em: ${valor}${unidadeMedida} | Máquina: ${nomeMaquina}
    </div>
   `;


  }
  div.appendChild(tela)
}

function verificarNivel(fkMaquina, fkEmpresa, nivel, fkComponente) {

  fetch(`/dashAgencias/verificarNivel/${fkMaquina}/${fkEmpresa}/${nivel}/${fkComponente}`).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then(function (resposta) {

        // alert("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")

      });
    } else {
      throw ('Houve um erro na API!');
    }
  });

}

function pegarDadosGerais() {
  atencaoMemoria = 0;
  problemaMemoria = 0;
  okMemoria = 0;

  atencaoCpu = 0;
  problemaCpu = 0;
  okCpu = 0;

  atencaoDisco = 0;
  problemaDisco = 0;
  okDisco = 0;

  var div = document.querySelector(".divAlertas")
  div.innerHTML = ""

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

          let cpu = json[0].UsoCpu;
          let memoria = json[0].memoria
          let disco = json[0].disco
          let temperatura = json[0].temperatura

          console.log(`----- Maquina ${arrayNomeMaquinas[i]} -----`)
          console.log(`Memoria: ${memoria}`)
          console.log(`Disco: ${disco}`)
          console.log(`Cpu: ${cpu}`)
          
          //alert(temperatura, cpu)

          //atenção
          if (memoria > 60 && memoria < 70) {

            criarCard(arrayNomeMaquinas[i], 'Memoria', memoria, 2, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 2)
            atencaoMemoria += 1;

          } else if (memoria >= 70) {

            criarCard(arrayNomeMaquinas[i], 'Memoria', memoria, 3, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 2)
            problemaMemoria += 1;

          } else {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 2)
            okMemoria += 1;

          }

          if (cpu > 60 && cpu < 70) {

            criarCard(arrayNomeMaquinas[i], 'CPU', cpu, 2, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 1)
            atencaoCpu += 1;

          } else if (cpu >= 70) {

            criarCard(arrayNomeMaquinas[i], 'CPU', cpu, 3, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 1)
            problemaCpu += 1;

          } else {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 1)
            okCpu += 1;

          }

          if (disco > 60 && disco < 70) {

            criarCard(arrayNomeMaquinas[i], 'Disco', disco, 2, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 3)
            atencaoMemoria += 1;

          } else if (disco >= 70) {

            criarCard(arrayNomeMaquinas[i], 'Disco', disco, 3, "%")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 3)
            problemaMemoria += 1;

          } else {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 3)
            okMemoria += 1;

          }

          if(temperatura >= 80){
            criarCard(arrayNomeMaquinas[i], 'Temperatura', temperatura, 3, "ºC")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 4)
          } else if (temperatura >= 60){
            criarCard(arrayNomeMaquinas[i], 'Temperatura', temperatura, 3, "ºC")
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 4)
          } else{
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 4)
          }

          // criarCard(cpu,memoria,disco,arrayNomeMaquinas[i])

        });

      } else {
        console.log("Houve um erro ao tentar pegar os dados GERAIS das maquinas!");
      }

    }).catch(function (erro) {
      console.log(erro);
    })

  }
  soma = 0;
  setTimeout(atualizarGrafico, 5000)
}

function esconder() {
  $('.divAlertas').hide();
  if (soma == 0) {
    $('.bell').attr('valor-alerta', soma);
  }
}

$('#btnAlerta').on('click', function () {
  $('.divAlertas').slideToggle();
});




function exibirGraficoDonut(option) {

  span = document.getElementById("optionSelecionada")
  var critico = 0;
  var alerta = 0;
  var ideal = 0;
  var atencaoMemoria = 0;
  var problemaMemoria = 0;
  var okMemoria = 0;

  var atencaoCpu = 0;
  var problemaCpu = 0;
  var okCpu = 0;

  var atencaoDisco = 0;
  var problemaDisco = 0;
  var okDisco = 0;


  if (option == 1) {
    span.innerHTML = '| CPU'
    critico = problemaCpu
    alerta = atencaoCpu
    ideal = okCpu
  } else if (option == 2) {
    span.innerHTML = '| Memória'
    critico = problemaMemoria
    alerta = atencaoMemoria
    ideal = okMemoria
  } else if (option == 3) {
    span.innerHTML = '| Disco'
    critico = problemaDisco
    alerta = atencaoDisco
    ideal = okDisco
  }

  var grafico = echarts.init(document.querySelector("#graficoDonut")).setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [{
      name: 'Quantidade',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [{
        value: critico,
        name: 'Crítico',
        itemStyle: { color: '#FF7070' }
      },
      {
        value: alerta,
        name: 'Alerta',
        itemStyle: { color: '#FEDB5F' }
      },
      {
        value: ideal,
        name: 'Ideal',
        itemStyle: { color: '#91CC75' }
      }
      ],
    }]
  });
}