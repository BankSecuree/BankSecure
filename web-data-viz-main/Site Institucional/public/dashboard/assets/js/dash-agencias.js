function exibirListaAgencias() {
    fetch(`/usuarios/exibirListaAgencias/${sessionStorage.ID_USUARIO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var lista = document.getElementById("campo-agencias");
                var mensagem = document.createElement("p");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                lista.innerHTML = "";
                lista.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }
            resposta.json().then(function (resposta) {
                var contId = 0;
                for (let i = resposta.length - 1; i >= 0; i--) {
                    console.log(i)
                    console.log(publicacao)

                    var lista = document.getElementById("campo-agencias");
                    var publicacao = resposta[i];

                    var divCol = createElement("div");
                    divCol.setAttribute("class", "col-lg-6")
                    var divCard = createElement("div");
                    divCard.setAttribute("class", "card")
                    var divCardBody = createElement("div");
                    divCardBody.setAttribute("class", "card-body")
                    var h5 = createElement("h5");
                    h5.setAttribute("class", "card-title")
                
                    divCardBody.appendChild(h5);
                    divCard.appendChild(divCardBody);
                    divCol.appendChild(divCard);
                    lista.appendChild(divCol);
                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
    });
}


function graficoAgencia() {
    var options = {
        series: [{
          name: 'CPU',
          data: [1, 5, 3, 9]
        }, {
          name: 'Memória',
          data: [50, 67, 63, 60]
        }, {
          name: 'Disco',
          data: [50, 50, 53, 52]
        }],
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
          },
        },
        xaxis: {
          ype: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        // tooltip: {
        //   shared: true
        // },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
          offsetX: -10
        }
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
}