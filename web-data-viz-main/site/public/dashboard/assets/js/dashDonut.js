
// function exibirGraficoDonut(option) {
//     var critico;
//     var alerta;
//     var ideal;
//     span = document.getElementById("optionSelecionada")
    
//     fetch(`/dashDonut/exibirDonut/${sessionStorage.ID_EMPRESA}/${option}`).then(function (resposta) {
//         if (resposta.ok) {
//             resposta.json().then(function (resposta) {

//                 if (option == 1) {
//                     span.innerHTML = '| CPU'
//                     critico = resposta[0].qtd;
//                     alerta = resposta[1].qtd;
//                     ideal = resposta[2].qtd;
//                 } else if (option == 2) {
//                     span.innerHTML = '| Memória'
//                     critico = resposta[0].qtd;
//                     alerta = resposta[1].qtd;
//                     ideal = resposta[2].qtd;
//                 } else if (option == 3) {
//                     span.innerHTML = '| Disco'
//                     critico = resposta[0].qtd;
//                     alerta = resposta[1].qtd;
//                     ideal = resposta[2].qtd;
//                 }
                
//                 var grafico = echarts.init(document.querySelector("#graficoDonut")).setOption({
//                     tooltip: {
//                         trigger: 'item'
//                     },
//                     legend: {
//                         top: '5%',
//                         left: 'center'
//                     },
//                     series: [{
//                         name: 'Quantidade',
//                         type: 'pie',
//                         radius: ['40%', '70%'],
//                         avoidLabelOverlap: false,
//                         itemStyle: {
//                             borderRadius: 10,
//                             borderColor: '#fff',
//                             borderWidth: 2
//                         },
//                         label: {
//                             show: false,
//                             position: 'center'
//                         },
//                         emphasis: {
//                             label: {
//                                 show: true,
//                                 fontSize: '18',
//                                 fontWeight: 'bold'
//                             }
//                         },
//                         labelLine: {
//                             show: false
//                         },
//                         data: [{
//                             value: critico,
//                             name: 'Crítico',
//                             itemStyle: { color: '#FF7070' }
//                         },
//                         {
//                             value: alerta,
//                             name: 'Alerta',
//                             itemStyle: { color: '#FEDB5F' }
//                         },
//                         {
//                             value: ideal,
//                             name: 'Ideal',
//                             itemStyle: { color: '#91CC75' }
//                         }
//                         ],
//                     }]
//                 });
//             });
//         } else {
//             throw ('Houve um erro na API!');
//         }
//     });
// }


let arrayAgencias = []
let arrayMaquinas = []
let arrayNomeMaquinas = []

function exibirListaAgencias() {
  fetch(`/dashAgencias/exibirListaAgencias/${sessionStorage.ID_USUARIO}`)
    .then(function (resposta) {
      if (resposta.ok) {

        resposta.json().then(function (resposta) {
          
          console.log(resposta[0].idAgencia)
          for (let i = 0; i < resposta.length; i++) {

            //   var lista = document.getElementById("listaAgencias");
            var publicacao = resposta[i];
            console.log(i);
            console.log(publicacao);

            arrayAgencias.push(resposta[i].idAgencia)

            
            // alert(arrayAgencias[i])
          }
          pegarMaquinas();
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

function pegarMaquinas() {
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

        console.log(JSON.stringify(json));
        console.log(json);

        console.log(json[0])
        for (let i = 0; i < json.length; i++) {
          arrayMaquinas.push(json[i].idMaquina);
          arrayNomeMaquinas.push(json[i].nome);
        }
        pegarDadosGerais(1);

      });


    } else {
      console.log("Houve um erro ao tentar pegar os dados das maquinas!");
    }

  }).catch(function (erro) {
    console.log(erro);
  })

}

function verificarNivel(fkMaquina, fkEmpresa, nivel, fkComponente) {

  fetch(`/dashAgencias/verificarNivel/${fkMaquina}/${fkEmpresa}/${nivel}/${fkComponente}`).then(function (resposta) {
    if (resposta.ok) {
      } else {
      throw ('Houve um erro na API!');
    }
  });

}

let vez1 = 0;

function pegarDadosGerais(option) {
  atencaoMemoria = 0;
  problemaMemoria = 0;
  okMemoria = 0;

  atencaoCpu = 0;
  problemaCpu = 0;
  okCpu = 0;

  atencaoDisco = 0;
  problemaDisco = 0;
  okDisco = 0;

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

          //atenção
          if (memoria > 60 && memoria < 70) {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 2)
            atencaoMemoria += 1;
            
        } else if (memoria >= 70) {
            
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 2)
            problemaMemoria += 1;
            
        } else {
            
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 2)
            okMemoria += 1;

          }

          if (cpu > 60 && cpu < 70) {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 1)
            atencaoCpu += 1;

          } else if (cpu >= 70) {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 1)
            problemaCpu += 1;

          } else {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 1)
            okCpu += 1;

          }

          if (disco > 60 && disco < 70) {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 2, 3)
            atencaoDisco += 1;

          } else if (disco >= 70) {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 3)
            problemaDisco += 1;

          } else {

            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 1, 3)
            okDisco += 1;

          }


          if(temperatura >= 80){
            verificarNivel(arrayMaquinas[i], sessionStorage.ID_EMPRESA, 3, 4)
          }
      
          
          // criarCard(cpu,memoria,disco,arrayNomeMaquinas[i])
          if(vez1 == 0){
            vez1 = 2
              exibirGraficoDonut(1)
          }else{
            exibirGraficoDonut(option)
          }

        });

      } else {
        console.log("Houve um erro ao tentar pegar os dados GERAIS das maquinas!");
      }

    }).catch(function (erro) {
      console.log(erro);
    })

  }
  soma = 0;
  
}

function mediaDadosComps(valorComp){
  if(valorComp == 1){
    optionSelecionadaMedia.innerHTML = " | CPU"
    dadosMediaGeral.innerHTML = `<div class="card" style="width: 85%; height: 60%">
    <div class="card-body">
      <h5 class="card-title">CPU</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Uso ideal de CPU: 50%</h6>
      <p class="card-text">Aqui consta a quantidade ideal que consideramos como bom para sua CPU.</p>
      <a href="#cpu_info" class="card-link">Visualizar a quantidade atual!</a>
    </div>
  </div>`
  }
  else if(valorComp == 2){
    optionSelecionadaMedia.innerHTML = " | Memória"
    dadosMediaGeral.innerHTML = `<div class="card" style="width: 85%; height: 60%">
    <div class="card-body">
      <h5 class="card-title">Memória RAM</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Uso ideal de Memória RAM: 40%</h6>
      <p class="card-text">Aqui consta a quantidade ideal que consideramos como bom para sua memória RAM.</p>
      <a href="#ram_info" class="card-link">Visualizar a quantidade atual!</a>
    </div>
  </div>`
  } else{
    optionSelecionadaMedia.innerHTML = " | Disco"
    dadosMediaGeral.innerHTML = `<div class="card" style="width: 85%; height: 60%">
    <div class="card-body">
      <h5 class="card-title">Disco</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Uso ideal de Disco: 20%</h6>
      <p class="card-text">Aqui consta a quantidade ideal que consideramos como bom para seu Disco.</p>
      <a href="#disco_info" class="card-link">Visualizar a quantidade atual!</a>
    </div>
  </div>`
  }
}



function exibirGraficoDonut(option) {
    var critico = 0;
    var alerta = 0;
    var ideal = 0;
  
  span = document.getElementById("optionSelecionada")
  
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