var chart;
function exibirListaAgencias() {
  fetch(`/dashAgencias/exibirListaAgencias/${sessionStorage.ID_USUARIO}`)
    .then(function (resposta) {
      if (resposta.ok) {
        var lista = document.getElementById("listaAgencias");
        var trColunas = document.createElement("tr");
        var thead = document.createElement("thead");
        var thId = document.createElement("th");
        thId.setAttribute("scope", "row");
        thId.innerHTML = "#";
        var thApelido = document.createElement("th");
        thApelido.setAttribute("scope", "row");
        thApelido.innerHTML = "Apelido";
        var thExibir = document.createElement("th");
        thExibir.setAttribute("scope", "row");
        thExibir.innerHTML = "Exibir";

        trColunas.appendChild(thId);
        trColunas.appendChild(thApelido);
        trColunas.appendChild(thExibir);
        thead.appendChild(trColunas);
        lista.appendChild(thead);

        if (resposta.status == 204) {
          var lista = document.getElementById("listaAgencias");
          var mensagem = document.createElement("p");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          lista.innerHTML = "";
          lista.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log(resposta)
          var contId = 0;
          for (let i = 0; i < resposta.length; i++) {
            var publicacao = resposta[i];
            console.log(i);
            console.log(publicacao);

            var lista = document.getElementById("listaAgencias");

            var thNumero = document.createElement("th");
            thNumero.innerHTML = publicacao.idAgencia;
            var tdApelido = document.createElement("td");
            tdApelido.innerHTML = publicacao.apelido;
            // var tdCnpj = document.createElement("td");
            // tdCnpj.innerHTML = publicacao.cnpjAgencia;
            var tdButton = document.createElement("td");
            tdButton.innerHTML = `<a onclick="exibirMaquinas(${publicacao.idAgencia})" class="btn btn-primary btn-sm" title="Exibir maquinas da agência"><i class="bi bi-graph-up"></i></a>`;
            var tr = document.createElement("tr");
            var tbody = document.createElement("tbody");

            tr.appendChild(thNumero);
            tr.appendChild(tdApelido);
            // tr.appendChild(tdCnpj);
            tr.appendChild(tdButton);
            tbody.appendChild(tr);
            lista.appendChild(tbody);
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

function CriarGraficoBarras(idDiv, titulo, nomeSerie, dados) {
  var options = {
    chart: {
      type: "bar",
      height: 70,
      stacked: true,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "20%",
        colors: {
          backgroundBarColors: ["#40475D"],
        },
      },
    },
    stroke: {
      width: 0,
    },
    series: [
      {
        name: nomeSerie,
        data: dados,
      },
    ],
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: titulo,
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: dados[0] + "%",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: [nomeSerie],
    },
    yaxis: {
      max: 100,
    },
    fill: {
      opacity: 1,
    },
  };

  var chart = new ApexCharts(document.querySelector(`#${idDiv}`), options);
  chart.render();
}

function exibirMaquinas(idAgencia) {
  fetch(`/dashAgencias/consultarMaquinas/${idAgencia}`).then((resposta) => {
    resposta.json().then((valores) => {
      console.log(valores)
      document.getElementById("listaMaquinas").innerHTML = `<tr>
      <td>Id</td>
      <td>Nome da Máquina</td>
      <td>Gráfico</td>
    </tr>`
      for (let i = 0; i < valores.length; i++) {
        var publicacao = valores[i];
        console.log(i);
        console.log(publicacao);

        var lista = document.getElementById("listaMaquinas");

        var thNumero = document.createElement("th");
        thNumero.innerHTML = publicacao.idMaquina;
        var tdApelido = document.createElement("td");
        tdApelido.innerHTML = publicacao.nome;
        // var tdCnpj = document.createElement("td");
        // tdCnpj.innerHTML = publicacao.cnpjAgencia;
        var tdButton = document.createElement("td");
        tdButton.innerHTML = `<a onclick="graficoAgencia(${idAgencia},${publicacao.idMaquina})" class="btn btn-primary btn-sm" title="Exibir gráfico da agência"><i class="bi bi-graph-up"></i></a>`;
        var tr = document.createElement("tr");
        var tbody = document.createElement("tbody");

        tr.appendChild(thNumero);
        tr.appendChild(tdApelido);
        // tr.appendChild(tdCnpj);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
        lista.appendChild(tbody);
      }
    })
  })
}


function graficoAgencia(idAgencia, maquinas) {
  var vt_cpu = [0];
  var vt_memoria = [0];
  var vt_data = [0];
  fetch(`/dashAgencias/exibirView/${sessionStorage.ID_EMPRESA}/${maquinas}`).then(function (
    resposta
  ) {
	console.log(resposta)
    resposta.json().then(function (resposta) {
      for (let i = 0; i < resposta.length; i++) {
        var publi = resposta[i];
        
        if(publi.nome == "CPU"){
          vt_cpu.push(publi.valor);
        } else if(publi.nome == "Memória"){
          vt_memoria.push(publi.valor);
        } 
        
        var data = new Date(publi.dataHora);
        data = `${data.getHours()}:${data
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")}`;
        vt_data.push(data);
        console.log(publi);
      }
      console.log(vt_cpu);

      var options = {
        chart: {
          id: 'mychart'
         },
        series: [
          {
            name: "CPU",
            data: vt_cpu,
          },
          {
            name: "Memória",
            data: vt_memoria,
          },
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
        },
        xaxis: {
          ype: "datetime",
          categories: vt_data,
        },
        // tooltip: {
        //   shared: true
        // },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: -10,
        },
      };

      chart = new ApexCharts(document.querySelector("#plotGrafico"), options);
      chart.render();

      var areaInputs = document.getElementById("areaConsulta");
      areaInputs.innerHTML = `Inicio <input type='text' class="form-control" placeholder='dd/MM/yyyy hh:mm:ss' id='ipt_inicio'>
      Fim <input type='text' class="form-control" placeholder='dd/MM/yyyy hh:mm:ss' id='ipt_fim'>
      <button class="btn btn-outline-secondary" onclick='consultarTempo(${maquinas})'>Pesquisar</button>
      `

      // Cria um gráfico de barras para cada máquina
//       for (let i = 0; i < maquinas; i++) {
//         graficoBarras(
//           `progress${i + 1}`,
//           `Máquina <span class="math-inline">\{i \+ 1\}\`, 'CPU', \[vt\_cpu\[i\]\]\);
// graficoBarras\(\`progress</span>{i + 1}`,
//           `Máquina ${i + 1}`,
//           "Memória",
//           [vt_memoria[i]]
//         );
//       }
    });
  });

  for (let i = 0; i < maquinas; i++) {
    var card = document.getElementById("div");

    var cardTitle = document.createElement("h5");
    var colMd7 = document.createElement("div");
    var boxMt4 = document.createElement("div");
    var mt4 = document.createElement("div");
    var progress1 = document.createElement("div");
    var progress2 = document.createElement("div");
    var progress3 = document.createElement("div");

    cardTitle.setAttribute("class", "card-title");
    colMd7.setAttribute("class", "col-md-7");
    boxMt4.setAttribute("class", "box mt-4");
    mt4.setAttribute("class", "mt-4");
    progress1.setAttribute("class", "progress1");
    progress2.setAttribute("class", "progress2");
    progress3.setAttribute("class", "progress3");

    colMd7.appendChild(boxMt4);
    boxMt4.appendChild(mt4);
    mt4.appendChild(progress1, progress2, progress3);
    card.appendChild(colMd7);
  }
}

$('#ipt_inicio').mask('00/00/0000 00:00:00');
$('#ipt_fim').mask('00/00/0000 00:00:00');

function consultarTempo(idMaquina){
  var inicioNormal = document.getElementById("ipt_inicio").value;
  var fimNormal = document.getElementById("ipt_fim").value;

  var fim = "";
  var inicio = "";

  var inicioMoment = moment(inicioNormal, 'DD/MM/YYYY HH:mm:ss');
  var fimMoment = moment(fimNormal, 'DD/MM/YYYY HH:mm:ss');

  inicio = inicioMoment.format('YYYY-MM-DD HH:mm:ss');
  // alert(inicio);

  fim = fimMoment.format('YYYY-MM-DD HH:mm:ss');
  // alert(fim);


  fetch(`/dashAgencias/consultarPeloTempo/${idMaquina}/${inicio}/${fim}`).then((resposta) =>{
    resposta.json().then((valores) => {
      // alert(JSON.stringify(valores))
      valores.reverse()
      vt_cpu = []
      vt_memoria = []
      vt_disco = []
      vt_data = []
      for(let i = 0; i < valores.length; i++){
        var publi = valores[i];
        if(publi.nome == "CPU"){
          vt_cpu.push(publi.valor);
        } else if(publi.nome == "Memória"){
          vt_memoria.push(publi.valor);
        } else if(publi.nome == "Disco"){
          vt_disco.push(publi.valor);
        }
        var data = new Date(publi.dataHora);

        data =` ${data.getDate()}/${data.getMonth()}/${data.getFullYear()} ${data.getHours()}:${data
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")} `

        vt_data.push(data);
        
      }

      var options = {
        chart: {
          id: 'mychart'
         },
        series: [
          {
            name: "CPU",
            data: vt_cpu,
          },
          {
            name: "Memória",
            data: vt_memoria,
          },
          {
            name: "Disco",
            data: vt_disco,
          },
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
        },
        xaxis: {
          ype: "datetime",
          categories: vt_data,
            labels: {
              show: false,
            }
        },
        tooltip: {
          shared: true
        },
      };
      


      console.log(document.querySelector("#plotGraficos"))
      chart.updateOptions(options)
    })
  })
}