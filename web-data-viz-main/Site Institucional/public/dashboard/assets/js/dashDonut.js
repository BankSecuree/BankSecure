
function exibirGraficoDonut(option) {
    var critico;
    var alerta;
    var ideal;
    var grafico;
    span = document.getElementById("optionSelecionada")
    if (option == 1) {
        span.innerHTML = '| CPU'
        critico = 2;
        alerta = 1;
        ideal = 7;
    } else if (option == 2) {
        span.innerHTML = '| Memória'
        critico = 4;
        alerta = 2;
        ideal = 4;
    } else if (option == 3) {
        span.innerHTML = '| Disco'
        critico = 1;
        alerta = 0;
        ideal = 9;
    }


    grafico = echarts.init(document.querySelector("#graficoDonut")).setOption({
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