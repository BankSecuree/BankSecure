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
          var contId = 0;
          for (let i = 0; i <= resposta.length; i++) {
            console.log(i);
            console.log(publicacao);

            var lista = document.getElementById("listaAgencias");
            var publicacao = resposta[i];

            var thNumero = document.createElement("th");
            thNumero.innerHTML = publicacao.idAgencia;
            var tdApelido = document.createElement("td");
            tdApelido.innerHTML = publicacao.apelido;
            // var tdCnpj = document.createElement("td");
            // tdCnpj.innerHTML = publicacao.cnpjAgencia;
            var tdButton = document.createElement("td");
            tdButton.innerHTML = `<a onclick="graficoAgencia(${publicacao.idAgencia},${publicacao.maquinas})" class="btn btn-primary btn-sm" title="Exibir gráfico da agência"><i class="bi bi-graph-up"></i></a>`;
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

function graficoAgencia(idAgencia, maquinas) {
  var vt_cpu = [];
  var vt_memoria = [];
  var vt_data = [];
  fetch(`/dashAgencias/exibirView/${sessionStorage.ID_USUARIO}`).then(function (
    resposta
  ) {
    resposta.json().then(function (resposta) {
      for (let i = 0; i < resposta.length; i++) {
        var publi = resposta[i];
        vt_memoria.push(publi.Memoria);
        vt_cpu.push(publi.Cpu);
        var data = new Date(publi.Data);
        data = `${data.getHours()}:${data
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${data.getSeconds().toString().padStart(2, "0")}`;
        vt_data.push(data);
        console.log(publi);
      }
      console.log(vt_cpu);

      var options = {
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

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      // Cria um gráfico de barras para cada máquina
      for (let i = 0; i < maquinas; i++) {
        graficoBarras(
          `progress${i + 1}`,
          `Máquina <span class="math-inline">\{i \+ 1\}\`, 'CPU', \[vt\_cpu\[i\]\]\);
graficoBarras\(\`progress</span>{i + 1}`,
          `Máquina ${i + 1}`,
          "Memória",
          [vt_memoria[i]]
        );
      }
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
