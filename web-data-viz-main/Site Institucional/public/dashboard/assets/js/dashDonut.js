
function exibirGraficoDonut(option) {
    var critico;
    var alerta;
    var ideal;
    span = document.getElementById("optionSelecionada")


    fetch(`/dashDonut/exibirDonut`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                var publi = resposta[0];
                if (option == 1) {
                    span.innerHTML = '| CPU'
                    critico = publi.s_cpu_critico;
                    alerta = publi.s_cpu_alerta;
                    ideal = publi.s_cpu_ideal;
                } else if (option == 2) {
                    span.innerHTML = '| Memória'
                    critico = publi.s_mem_critico;
                    alerta = publi.s_mem_alerta;
                    ideal = publi.s_mem_ideal;
                } else if (option == 3) {
                    span.innerHTML = '| Disco'
                    critico = publi.s_disco_critico;
                    alerta = publi.s_disco_alerta;
                    ideal = publi.s_disco_ideal;
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
            });
        } else {
            throw ('Houve um erro na API!');
        }
    });
}
