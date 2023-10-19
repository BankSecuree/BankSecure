const { default: Config } = require("chart.js/dist/core/core.config");



var valor = 0;
function alterarPeriodoVizualizacao(campoParaAlterar, periodo) {
    let periodos = {
        'day': "Hoje",
        'month': "Este Mês",
        'year': "Este Ano"
    }
    let periodoId = document.getElementById(campoParaAlterar + "_period_info")
    let periodoGrafico = document.getElementById("periodoGrafico")
    if (campoParaAlterar == 'cpu') {
        console.log(sessionStorage.ID_EMPRESA, periodo)
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 1)
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'ram') {
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 2)
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'hd') {
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 3)
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'graficoDonut') {
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'graficoPrincipal') {
        obterDadosGrafico(sessionStorage.ID_EMPRESA, periodo, 1)
        periodoGrafico.innerHTML = periodos[periodo]


    }


}

function exibirKpiGerente(idEmpresa, periodo, componente) {
    fetch(`/dashGerente/dadosKpi/${idEmpresa}/${periodo}/${componente}`)
        .then(function (resposta) {
            if (resposta.ok) {

                if (resposta.status == 204) {
                    throw "Nenhum resultado encontrado "
                }

                resposta.json().then(function (resposta) {
                    console.log(resposta[0].media)


                    valor = resposta[0].media;
                    if (componente == 1) {
                        cpu_info.innerHTML = `${valor.toFixed(2)}%`
                    } else if (componente == 2) {
                        ram_info.innerHTML = `${valor.toFixed(2)}%`
                    }
                    else if (componente == 3) {
                        hd_info.innerHTML = `${valor.toFixed(2)}%`
                    }



                })

            }
        })
}

function obterDadosGrafico(idEmpresa, periodo, componente) {


    fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (respostaCpu) {
                console.log(`Dados recebidos: ${JSON.stringify(respostaCpu)}`);
                respostaCpu.reverse();

                // plotarGrafico(respostaCpu, idEmpresa, periodo, componente)
                componente = 2
                fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (respostaDisco) {
                            console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
                            respostaDisco.reverse();

                            // plotarGrafico(respostaCpu, idEmpresa, periodo, componente)
                            componente = 3
                            fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (respostaMemoria) {
                                        console.log(`Dados recebidos: ${JSON.stringify(respostaMemoria)}`);
                                        respostaMemoria.reverse();

                                        plotarGrafico(respostaCpu, respostaDisco, respostaMemoria, idEmpresa, periodo, componente)


                                    });
                                } else {
                                    console.error('Nenhum dado encontrado ou erro na api');
                                }
                            })

                                .catch(function (error) {
                                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
                                })
                        });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na api');
                    }
                })

                    .catch(function (error) {
                        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
                    })
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na api');
        }
    })

        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
        })
}

function plotarGrafico(respostaCpu, respostaDisco, respostaMemoria, idEmpresa, periodo, componente) {
    console.log(`Iniciando a plotagem do gráfico`);

    const labels = [];
    const dados1 = [];
    const dados2 = [];
    const dados3 = [];

    // Extrair horas únicas dos dados de CPU
    respostaCpu.forEach((item) => {
        if (!labels.includes(item.hora)) {
            labels.push(item.hora);
        }
        dados1.push(item.media_valor);
    });

    // Extrair horas únicas dos dados de Disco
    respostaDisco.forEach((item) => {
        if (!labels.includes(item.hora)) {
            labels.push(item.hora);
        }
        dados3.push(item.media_valor);
    });

    // Extrair horas únicas dos dados de Memória
    respostaMemoria.forEach((item) => {
        if (!labels.includes(item.hora)) {
            labels.push(item.hora);
        }
        dados2.push(item.media_valor);
    });

    const grafico = document.getElementById("reportsChart4");

    if (Chart.getChart(grafico)) {
        Chart.getChart(grafico).destroy();
    }

    let dados = {
        labels: labels,
        datasets: [
            {
                label: 'CPU',
                data: dados1,
                borderWidth: 2,
                borderColor: "#4154f1",
                backgroundColor: "#4154f1",
                tension: 0.3
            },
            {
                label: 'Disco',
                data: dados2,
                borderWidth: 2,
                borderColor: "#2eca6a",
                backgroundColor: "#2eca6a",
                tension: 0.3
            },
            {
                label: 'Memória',
                data: dados3,
                borderWidth: 2,
                borderColor: "#ff771d",
                backgroundColor: "#ff771d",
                tension: 0.3
            }
        ]
    };

    new Chart(grafico, {
        type: 'line',
        data: dados,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                    },
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: "",
                    beginAtZero: true
                },
                x: {
                    title: "",
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    setTimeout(() => atualizarGrafico(idEmpresa, periodo, componente, grafico, dados), 2000)


}


function atualizarGrafico(idEmpresa, periodo, componente, grafico, dados) {
    console.log(dados)
    componente = 1;
    fetch(`/dashGerente/tempo-real/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistroCpu) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistroCpu)}`)
                console.log(`Dados atuais do grafico:`)
                console.log(dados)

                data.labels[0].shift()
                data.labels.push(novoRegistroCpu.hora)


                data.datasets[0].data.shift();
                data.datasets[0].data.push(novoRegistroCpu.media_valor)

                
                componente = 2
                fetch(`/dashGerente/tempo-real/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (novoRegistroDisco) {
                            console.log(`Dados recebidos: ${JSON.stringify(novoRegistroDisco)}`)
                            console.log(`Dados atuais do grafico:`)
                            console.log(dados)

                            data.labels[0].shift()
                            data.labels.push(novoRegistroCpu.hora)
            
            
                            data.datasets[1].data.shift();
                            data.datasets[1].data.push(novoRegistroCpu.media_valor)

                            componente = 3

                            fetch(`/dashGerente/tempo-real/${idEmpresa}/${periodo}/${componente}`, { cache: 'no-store' }).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (novoRegistroMemoria) {
                                        console.log(`Dados recebidos: ${JSON.stringify(novoRegistroMemoria)}`)
                                        console.log(`Dados atuais do grafico:`)
                                        console.log(dados)
                                       
                                        data.labels[0].shift()
                                        data.labels.push(novoRegistroCpu.hora)
                        
                        
                                        data.datasets[2].data.shift();
                                        data.datasets[2].data.push(novoRegistroCpu.media_valor)

                                        grafico.update();
                                        setTimeout(() => atualizarGrafico(idEmpresa, periodo, componente, grafico, dados), 10000)

                                    })
                                } else {
                                    console.error(`Nenhum dado encontrado ou erro na API`)
                                }
                            }).catch(function (error) {
                                console.error(`Erro na obtencao de dados p/ grafico: ${error.message}`)
                            })
                        })
                    } else {
                        console.error(`Nenhum dado encontrado ou erro na API`)
                    }
                }).catch(function (error) {
                    console.error(`Erro na obtencao de dados p/ grafico: ${error.message}`)
                })
            })
        } else {
            console.error(`Nenhum dado encontrado ou erro na API`)
            setTimeout(() => atualizarGrafico(idEmpresa, periodo, componente, grafico, dados), 10000)
        }
    }).catch(function (error) {
        console.error(`Erro na obtencao de dados p/ grafico: ${error.message}`)
    })
}