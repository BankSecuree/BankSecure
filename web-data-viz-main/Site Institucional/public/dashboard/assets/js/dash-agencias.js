const sql = require("sql");

const conn = sql.createConnection({
  host: "localhost",
  database: "bankSecure",
  user: "user_bankSecure",
  password: "Urubu_100",
});

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
            tdButton.innerHTML = `<a onclick="exibirGrafico(${publicacao.idAgencia})" class="btn btn-primary btn-sm" title="Exibir gráfico da agência"><i class="bi bi-graph-up"></i></a>`;
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

function graficoAgencia() {
  // var options = {
  //     series: [{
  //       name: 'CPU',
  //       data: [1, 5, 3, 9]
  //     }, {
  //       name: 'Memória',
  //       data: [50, 67, 63, 60]
  //     }, {
  //       name: 'Disco',
  //       data: [50, 50, 53, 52]
  //     }],
  //     chart: {
  //       type: 'area',
  //       stacked: false,
  //       height: 350,
  //       zoom: {
  //         enabled: false
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     markers: {
  //       size: 0,
  //     },
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         shadeIntensity: 1,
  //         inverseColors: false,
  //         opacityFrom: 0.45,
  //         opacityTo: 0.05,
  //         stops: [20, 100, 100, 100]
  //       },
  //     },
  //     xaxis: {
  //       ype: 'datetime',
  //       categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
  //     },
  //     // tooltip: {
  //     //   shared: true
  //     // },
  //     legend: {
  //       position: 'top',
  //       horizontalAlign: 'center',
  //       offsetX: -10
  //     }
  //   };

  //   var chart = new ApexCharts(document.querySelector("#chart"), options);
  //   chart.render();

  window.Apex = {
    chart: {
      foreColor: "black",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FCCF31", "#17ead9", "#f02fc2"],
    stroke: {
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#40475D",
    },
    xaxis: {
      axisTicks: {
        color: "#333",
      },
      axisBorder: {
        color: "#333",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#F55555", "#6078ea", "#6094ea"],
      },
    },
    yaxis: {
      decimalsInFloat: 2,
      opposite: true,
      labels: {
        offsetX: -10,
      },
    },
  };

  function getDadosMaquina(yrange) {
    const query = `
      SELECT MAX(Cpu), MAX(Memória), MAX(Disco)
      FROM vw_registrosEstruturados
      WHERE dataHora = CURRENT_TIMESTAMP
      `;

    conn.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const cpu = result[0].Cpu;
        const memoria = result[0].Memória;
        const disco = result[0].Disco;
        console.log(`CPU: ${cpu}, Memória: ${memoria}, Disco: ${disco}`);
      }
    });
  }

  var optionsProgress1 = {
    chart: {
      height: 70,
      type: "bar",
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
        name: "CPU",
        data: [44],
      },
    ],
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "CPU",
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "44%",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: ["CPU"],
    },
    yaxis: {
      max: 100,
    },
    fill: {
      opacity: 1,
    },
  };

  var chartProgress1 = new ApexCharts(
    document.querySelector("#progress1"),
    optionsProgress1
  );
  chartProgress1.render();

  var optionsProgress2 = {
    chart: {
      height: 70,
      type: "bar",
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
    colors: ["#17ead9"],
    stroke: {
      width: 0,
    },
    series: [
      {
        name: "Memória",
        data: [80],
      },
    ],
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Memória",
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "80%",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: ["Memória"],
    },
    yaxis: {
      max: 100,
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: false,
        gradientToColors: ["#6078ea"],
      },
    },
  };

  var chartProgress2 = new ApexCharts(
    document.querySelector("#progress2"),
    optionsProgress2
  );
  chartProgress2.render();

  var optionsProgress3 = {
    chart: {
      height: 70,
      type: "bar",
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
    colors: ["#f02fc2"],
    stroke: {
      width: 0,
    },
    series: [
      {
        name: "Disco",
        data: [74],
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        gradientToColors: ["#6094ea"],
      },
    },
    title: {
      floating: true,
      offsetX: -10,
      offsetY: 5,
      text: "Disco",
    },
    subtitle: {
      floating: true,
      align: "right",
      offsetY: 0,
      text: "74%",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: ["Disco"],
    },
    yaxis: {
      max: 100,
    },
  };

  var chartProgress3 = new ApexCharts(
    document.querySelector("#progress3"),
    optionsProgress3
  );
  chartProgress3.render();

  window.setInterval(function () {
    //mexer aqui para passar as variaveis do banco com parametro

    var p1Data = getDadosMaquina({ min: 10, max: 100 });
    chartProgress1.updateOptions({
      series: [
        {
          data: [p1Data],
        },
      ],
      subtitle: {
        text: p1Data + "%",
      },
    });

    var p2Data = getDadosMaquina({ min: 10, max: 100 });
    chartProgress2.updateOptions({
      series: [
        {
          data: [p2Data],
        },
      ],
      subtitle: {
        text: p2Data + "%",
      },
    });

    var p3Data = getDadosMaquina({ min: 10, max: 100 });
    chartProgress3.updateOptions({
      series: [
        {
          data: [p3Data],
        },
      ],
      subtitle: {
        text: p3Data + "%",
      },
    });
  }, 3000);
}
