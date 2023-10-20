
function exibirGraficoDonut(option) {
    var critico;
    var alerta;
    var ideal;
    span = document.getElementById("optionSelecionada")
    
    fetch(`/dashDonut/exibirDonut/${sessionStorage.ID_EMPRESA}/${option}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {

                if (option == 1) {
                    span.innerHTML = '| CPU'
                    critico = resposta[0].qtd;
                    alerta = resposta[1].qtd;
                    ideal = resposta[2].qtd;
                } else if (option == 2) {
                    span.innerHTML = '| Memória'
                    critico = resposta[0].qtd;
                    alerta = resposta[1].qtd;
                    ideal = resposta[2].qtd;
                } else if (option == 3) {
                    span.innerHTML = '| Disco'
                    critico = resposta[0].qtd;
                    alerta = resposta[1].qtd;
                    ideal = resposta[2].qtd;
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
