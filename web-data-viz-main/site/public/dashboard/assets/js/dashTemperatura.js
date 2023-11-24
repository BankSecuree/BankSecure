let arrayAgencias = []
let arrayMaquinas = []
let arrayNomeMaquinas = []
var idAgencia = -2;
var fkMaquina = -1;

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
            if (i == 0) {
              idAgencia = resposta[i].idAgencia;
            }
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
            atualizarMenorTemp(resposta[0].idAgencia);
            atualizarMaiorUso(resposta[0].idAgencia);
            atualizarMenorUso(resposta[0].idAgencia);
            atualizarMediaTemp(resposta[0].idAgencia);
            atualizarMediaUso(resposta[0].idAgencia);

            clearInterval(chamarFuncao)

            var chamarFuncao = setInterval(function () {
              atualizarMaiorTemp(resposta[0].idAgencia);
              atualizarMenorTemp(resposta[0].idAgencia);
              atualizarMaiorUso(resposta[0].idAgencia);
              atualizarMenorUso(resposta[0].idAgencia);
              atualizarMediaTemp(resposta[0].idAgencia);
              atualizarMediaUso(resposta[0].idAgencia);
              // atualizarGraficoTemperatura(resposta[0].idAgencia);
              // atualizarGraficoPorcentagem(resposta[0].idAgencia);
              atualizarKPITemp(resposta[0].idAgencia);
              atualizarKPIUso(resposta[0].idAgencia);
            }, 5000);

            chamarFuncao;


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

function atualizarGrafico(idAgencia) {
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



        atualizarCards()
      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })



}


function atualizarGraficoTemperatura(fkMaquina) {
  // alert("rpda")
  console.log("RODOU")
  let dados = []
  let textos = []
  //alert(idAgencia)
  //alert(sessionStorage.ID_EMPRESA)

  // Chama a função de atualização imediatamente

  // Define um intervalo para chamar a função de atualização a cada 5 segundos (5000 milissegundos)    
  

  fetch(`/dashAnalista/dadosTemperatura/${sessionStorage.ID_EMPRESA}/${fkMaquina}`
  ).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar dados de temperatura ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)
    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        // alert("opa, bao?")
        console.log(json[0].dataHora)
        // alert(JSON.stringify(json))

        for (let i = 0; i < json.length; i++) {
          dados.push(json[i].valor)
          textos.push(json[i].dataHora)
        }

        // alert("dados " + dados)
        // addData(grafico, textos, dados)

        // setInterval(function () {
        //   // atualizarGraficoPorcentagem(fkMaquina);
        //  // atualizarGraficoTemperatura(fkMaquina)
        // }, 5000);

        atualizarGraficoPorcentagem(fkMaquina,dados, textos);

      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

function atualizarGraficoPorcentagem(fkMaquina,dadosTemperatura,textosTemperatura) {
  // alert("rpda")
  console.log("RODOU")
  let dados = []
  let textos = []
  //alert(idAgencia)
  //alert(sessionStorage.ID_EMPRESA)


  fetch(`/dashAnalista/dadosPorcentagem/${sessionStorage.ID_EMPRESA}/${fkMaquina}`

  ).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar dados da porcentagem ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)
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

        addDataPorcentagem(grafico, textos, dados,dadosTemperatura,textosTemperatura)
      });

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })
}


function atualizarKPITemp(idAgencia) {
  // alert("rpda")
  console.log("RODOU")
  let dados = []
  let textos = []
  //alert(idAgencia)
  //alert(sessionStorage.ID_E



  fetch(`/dashAnalista/kpiDadosTemperatura/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  
  ).then(function (resposta) {
    console.log("ESTOU NO THEN DO pegar da KPI dados da temperatura ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)
    if (resposta.ok) {
      console.log(resposta);
      if (document.getElementById('tituloH5').innerText === 'Temperatura | Agora') {
        resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)
        for (let i = 0; i < json.length; i++) {
          dados.push(json[i].valor)
          textos.push(json[i].dataHora)

           csvCPU.style.display='none'

          csvPorcentagem.style.display = 'none';
          csvTemp.style.display='flex'

          atualizarCorTemp(json[0].valor);
          conteudoP2.style.display = 'block';
          
          conteudoP2.innerHTML = json[0].valor + "°C";
          conteudoP.style.display = 'none';
          conteudoOutro.style.display = 'none';

        }
      
      });
    }

    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })
}


function atualizarKPIUso(idAgencia) {
  // alert("rpda")
  console.log("RODOU")
  let dados = []
  let textos = []
  //alert(idAgencia)
  //alert(sessionStorage.ID_EMPRESA)
  
  fetch(`/dashAnalista/kpiDadosUso/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para a KPI  porcentagem ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)
    if (resposta.ok) {
      if (document.getElementById('tituloH5').innerText === 'Uso de CPU | Agora'){
      console.log(resposta);
      resposta.json().then(json => {
        // alert(JSON.stringify(json))
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)


        csvCPU.style.display='none'
        csvPorcentagem.style.display = 'flex';
        csvTemp.style.display='none'

        atualizarCorUso(json[0].valor);

        maiorTemp = json[0].valor;
        conteudoP.style.display = 'block';
        csvPorcentagem.style.display = 'flex';        
        conteudoP.innerHTML = maiorTemp + "%"
        conteudoP2.style.display = 'none';
        conteudoOutro.style.display = 'none'

      })
    }
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}


function atualizarMaiorTemp(idAgencia) {
  console.log("RODOU")
  let dados = []
  let textos = []
  
  fetch(`/dashAnalista/maiorTemperaturaRel/${sessionStorage.ID_EMPRESA}/${idAgencia}`


  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para a maior temperatura ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        // alert(JSON.stringify(json))
        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)

        atualizarCorRelMaiorTemp(json[0].maior_temperatura);
        var maiorTemperatura = json[0].maior_temperatura;
        console.log("Maior temperatura: " + maiorTemperatura)
        document.getElementById('maiorTemperatura').innerHTML = json[0].maior_temperatura + ' °C';

      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}


function atualizarMaiorUso(idAgencia) {
  console.log("RODOU")
  let dados = []
  let textos = []
  
  fetch(`/dashAnalista/maiorUsoRel/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para o maior uso ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
       // alert(JSON.stringify(json))

        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)

        atualizarCorRelMaiorUso(json[0].maior_uso);
        console.log(json[0].maior_uso);
            var maiorUso = json[0].maior_uso;
            document.getElementById('maiorUso').innerHTML = maiorUso + ' %';


      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

function atualizarMenorUso(idAgencia) {
  console.log("RODOU")
  let dados = []
  let textos = []
  
  fetch(`/dashAnalista/menorUsoRel/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para o menor uso ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
       // alert(JSON.stringify(json))

        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)

        console.log(json[0].menor_uso);
        atualizarCorRelMenorUso(json[0].menor_uso);
            var menorUso = json[0].menor_uso;
            document.getElementById('menorUso').innerHTML = menorUso + ' %';

      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}



function atualizarMediaTemp(idAgencia) {
  console.log("RODOU")
  let dados = []
  let textos = []
  
  fetch(`/dashAnalista/mediaTemperaturaRel/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para o maior uso ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        //alert(JSON.stringify(json))

        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)

        console.log(json[0].media_valores_temperatura);
 
        atualizarCorRelMediaTemp(json[0].media_valores_temperatura);
            var mediaTemp = json[0].media_valores_temperatura;
            document.getElementById('mediaTemperatura').innerHTML = mediaTemp + ' °C';
      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}


function atualizarMediaUso(idAgencia) {
  console.log("RODOU")
  
  fetch(`/dashAnalista/mediaUsoRel/${sessionStorage.ID_EMPRESA}/${idAgencia}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para o maior uso ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {

        console.log(json);
        console.log(JSON.stringify(json));
        console.log("")

        console.log(json[0].media_valores_uso);
        
        atualizarCorRelMediaUso(json[0].media_valores_uso);
        var mediaUso = json[0].media_valores_uso;
        document.getElementById('mediaUso').innerHTML = mediaUso + ' %';
      })
    
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
          atualizarGraficoTemperatura(json[0].idMaquina);
      }

      fkMaquina = json[0].idMaquina;

      
        console.log(JSON.stringify(json));
        console.log(json);

        console.log(json[0])

        

        for (let i = 0; i < json.length; i++) {
          arrayMaquinas.push(json[i].idMaquina);
          arrayNomeMaquinas.push(json[i].nome);
          document.getElementById('nomeMaquina').innerText = ` ${obterHorasAtuais()}`;
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

function criarCard(nomeMaquina, nomeComponente, valor, nivel) {
  soma++;
  $('.bell').attr('valor-alerta', soma);

  var div = document.querySelector(".divAlertas")
  var tela = document.createElement("div");

  tela.classList.add("divAlerta")

  if (nivel == 2) {
    tela.classList.add("divAtencao")
    tela.innerHTML = `ATENÇÃO | ${nomeComponente} em: ${valor}% | Máquina: ${nomeMaquina}`;

  } else {
    tela.classList.add("divProblema")
    tela.innerHTML = `PROBLEMA | ${nomeComponente} em: ${valor}% | Máquina: ${nomeMaquina}`;

  }
  div.appendChild(tela)
}


function atualizarMenorTemp(fkMaquina) {
  console.log("RODOU")
  let dados = []
  let textos = []
  
  fetch(`/dashAnalista/menorTemperaturaRel/${sessionStorage.ID_EMPRESA}/${fkMaquina}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados para a MENOR temperatura ()!")
    console.log("----------------------------------------------------------------------")
    console.log(resposta)


    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        // alert("Menor temp" + JSON.stringify(json));
        console.log("")
        console.log(json[0].dataHora)


        var menorTemp = json[0].menor_temperatura;
        atualizarCorRelMenorTemp(json[0].menor_temperatura);
        document.getElementById('menorTemperatura').innerHTML = menorTemp + ' °C';

      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

function pegarNomeMaquina(idAgencia,fkMaquina) {
  console.log("RODOU")

  let maquina = document.getElementById("listaMaquinas").value
  
  fetch(`/dashAnalista/pegarNomeMaquina/${sessionStorage.ID_EMPRESA}/${idAgencia}/${fkMaquina}`

  ).then(function (resposta) {

    console.log("ESTOU NO THEN DO pegar dados do nome da máquina ()!")
    console.log(resposta)

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        // alert("O nome da máquina é" + JSON.stringify(json));
        console.log("")
        // var nomeMaquina = json[0].nomeMaquina;
        // document.getElementById('nomeMaquina').innerHTML = nomeMaquina + " | Últimas 24h";
        document.getElementById('nomeMaquina').innerText = ` ${obterHorasAtuais()}`;

      })
    
    } else {
      console.log("Houve um erro ao tentar pegar os dados!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

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

          let cpu = json[0].cpuu;
          let memoria = json[0].memoria
          let disco = json[0].disco

          console.log(`----- Maquina ${arrayNomeMaquinas[i]} -----`)
          console.log(`Memoria: ${memoria}`)
          console.log(`Disco: ${disco}`)
          console.log(`Cpu: ${cpu}`)

          //atenção
          if (memoria > 60 && memoria < 70) {

            criarCard(arrayNomeMaquinas[i], 'Memoria', memoria, 2)
            // verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 2)
            atencaoMemoria += 1;

          } else if (memoria >= 70) {

            criarCard(arrayNomeMaquinas[i], 'Memoria', memoria, 3)
            //    verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 2)
            problemaMemoria += 1;

          } else {

            //  verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 2)
            okMemoria += 1;

          }

          if (cpu > 60 && cpu < 70) {

            criarCard(arrayNomeMaquinas[i], 'CPU', cpu, 2)
            //  verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 1)
            atencaoCpu += 1;

          } else if (cpu >= 70) {

            criarCard(arrayNomeMaquinas[i], 'CPU', cpu, 3)
            //    verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 1)
            problemaCpu += 1;

          } else {

            //  verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 1)
            okCpu += 1;

          }

          if (disco > 60 && disco < 70) {

            criarCard(arrayNomeMaquinas[i], 'Disco', disco, 2)
            //   verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 3)
            atencaoMemoria += 1;

          } else if (disco >= 70) {

            criarCard(arrayNomeMaquinas[i], 'Disco', disco, 3)
            //   verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 3)
            problemaMemoria += 1;

          } else {

            // verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 3)
            okMemoria += 1;

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

function automatizarGrafico() {
  setInterval(atualizarGraficoTemperatura(document.getElementById('listaMaquinas').value),5000)
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


function addData(chart, dataHora, temperatura) {


  let horaAtual = obterHorasAtuais();

  grafico.data.labels.push(horaAtual);

  // grafico.data.datasets[1].data.push(temperatura);
  grafico.data.datasets[1].data = temperatura;
  // alert(temperatura)
  const limiteHistorico = 7;


  if (grafico.data.labels.length > limiteHistorico) {
      grafico.data.labels.shift(); // Remove o rótulo mais antigo
      grafico.data.datasets[1].data.shift(); // Remove o dado mais antigo
  }
}


function addDataPorcentagem(chart, dataHora, porcentagem,dadosTemperatura,textosTemperatura) {

  let horaAtual = obterHorasAtuais();
  grafico.data.labels.push(horaAtual);
  grafico.data.datasets[1].data = dadosTemperatura;

  // alert(dadosTemperatura)

  grafico.data.datasets[0].data = porcentagem;

  // alert(porcentagem)

  // grafico.data.datasets[0].data.push(porcentagem);

  const limiteHistorico = 7;

  if(grafico.data.labels.length > limiteHistorico){
    grafico.data.labels.shift();
  }

  if (grafico.data.datasets[0].data.length > limiteHistorico) {
    // alert("Dentro do if")
      grafico.data.labels.shift();
      grafico.data.datasets[0].data.shift(); 
      grafico.data.datasets[1].data.shift();
      updateGrafico();
  }

}

setInterval(updateGrafico, 5000)

function updateGrafico() {
  atualizarGraficoTemperatura(fkMaquina)
  // alert("Grafico")
  grafico.update()
}

function alterarMaquina() {
  fkMaquina = document.getElementById("listaMaquinas").value;
  // alert(fkMaquina)
  grafico.data.labels=[];
  grafico.data.datasets[0].data = []; 
  grafico.data.datasets[1].data = [];

  updateGrafico();
}





