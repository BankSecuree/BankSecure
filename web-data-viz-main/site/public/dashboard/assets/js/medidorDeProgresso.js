var valor = 0;

function alterarPeriodoVizualizacao(campoParaAlterar, periodo, agencias) {
    let periodos = {
        'day': "Hoje",
        'month': "Este Mês",
        'year': "Este Ano"
    }
    let periodoId = document.getElementById(campoParaAlterar + "_period_info")
    let periodoGrafico = document.getElementById("periodoGrafico")
    if (campoParaAlterar == 'cpu') {
        // console.log(sessionStorage.ID_EMPRESA, periodo)
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 1, agencias)
        periodoL = periodo;
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'ram') {
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 2, agencias)
        periodoL = periodo;
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'hd') {
        exibirKpiGerente(sessionStorage.ID_EMPRESA, periodo, 3, agencias)
        periodoL = periodo;
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'graficoDonut') {
        periodoId.innerHTML = periodos[periodo]
    } else if (campoParaAlterar == 'graficoPrincipal') {
        obterDadosGrafico(sessionStorage.ID_EMPRESA, periodo, 1, agencias)
        periodoL = periodo;
        periodoGrafico.innerHTML = periodos[periodo]
    }


}
function alterarPeriodoGraficos(periodo, agencias) {
    periodoSelecionado = periodo;
    alterarPeriodoVizualizacao('ram', periodo, agencias)
    alterarPeriodoVizualizacao('cpu', periodo, agencias)
    alterarPeriodoVizualizacao('hd', periodo, agencias)
    alterarPeriodoVizualizacao('graficoPrincipal', periodo, agencias)
}

function exibirKpiGerente(idEmpresa, periodo, componente, agencias) {
    // console.log(periodo)
    fetch(`/dashGerente/dadosKpi/${idEmpresa}/${periodo}/${componente}/${agencias}`)
        .then(function (resposta) {
            if (resposta.ok) {

                if (resposta.status == 204) {
                    throw "Nenhum resultado encontrado"
                }

                resposta.json().then(function (resposta) {
                    // console.log(resposta[0].media)
                    valor = resposta[0]["media"];
                    if (componente == 1) {
                        cpu_info_media.innerHTML = `${valor.toFixed(2)}%`
                        // cpu_info_mediana.innerHTML = `${valor.toFixed(2)}%`
                        // cpu_info_max.innerHTML = `${valor.toFixed(2)}%`
                        // cpu_info_min.innerHTML = `${valor.toFixed(2)}%`
                    } else if (componente == 2) {
                        ram_info_media.innerHTML = `${valor.toFixed(2)}%`
                        // ram_info_mediana.innerHTML = `${valor.toFixed(2)}%`
                        // ram_info_max.innerHTML = `${valor.toFixed(2)}%`
                        // ram_info_min.innerHTML = `${valor.toFixed(2)}%`
                    }
                    else if (componente == 3) {
                        hd_info_media.innerHTML = `${valor.toFixed(2)}%`
                        // hd_info_mediana.innerHTML = `${valor.toFixed(2)}%`
                        // hd_info_max.innerHTML = `${valor.toFixed(2)}%`
                        // hd_info_min.innerHTML = `${valor.toFixed(2)}%`
                    }



                })

            }
        })
}

function obterDadosGrafico(idEmpresa, periodo, componente, agencias) {


    fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}/${agencias}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (respostaCpu) {
                // console.log(`Dados recebidos: ${JSON.stringify(respostaCpu)}`);
                respostaCpu.reverse();

                // plotarGraficoPrincipal(respostaCpu, idEmpresa, periodo, componente)
                componente = 2
                fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}/${agencias}`, { cache: 'no-store' }).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (respostaDisco) {
                            // console.log(`Dados recebidos: ${JSON.stringify(respostaDisco)}`);
                            respostaDisco.reverse();

                            // plotarGraficoPrincipal(respostaCpu, idEmpresa, periodo, componente)
                            componente = 3
                            fetch(`/dashGerente/ultimas/${idEmpresa}/${periodo}/${componente}/${agencias}`, { cache: 'no-store' }).then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (respostaMemoria) {
                                        // console.log(`Dados recebidos: ${JSON.stringify(respostaMemoria)}`);
                                        respostaMemoria.reverse();

                                        plotarGraficoPrincipal(respostaCpu, respostaDisco, respostaMemoria, idEmpresa, periodo, componente)
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

function calcularCorrelacao(dados1, dados2) {
    const mediaDados1 = dados1.reduce((total, valorAtual) => total + valorAtual, 0) / dados1.length;
    const mediaDados2 = dados2.reduce((total, valorAtual) => total + valorAtual, 0) / dados2.length;

    let numerador = 0;
    let denominador1 = 0;
    let denominador2 = 0;

    for (let i = 0; i < dados1.length; i++) {
        numerador += (dados1[i] - mediaDados1) * (dados2[i] - mediaDados2);
        denominador1 += Math.pow(dados1[i] - mediaDados1, 2);
        denominador2 += Math.pow(dados2[i] - mediaDados2, 2);
    }

    const correlacao = numerador / Math.sqrt(denominador1 * denominador2);

    return correlacao;
}

function calcularKpisAnaliticas(dados) {
    let kpisAnaliticas = {
        mediana: 0,
        minima: 0,
        maxima: 0
    
    };

    dados = dados.sort((a, b) => a - b);

    if (dados.length % 2 !== 0) {
        kpisAnaliticas.mediana = Number ((dados[Math.floor(dados.length / 2)]).toFixed(2));
    } else {
        let meio1 = dados[dados.length / 2 - 1];
        let meio2 = dados[dados.length / 2];
        kpisAnaliticas.mediana = Number ((meio1 + meio2) / 2).toFixed(2);
    }
    kpisAnaliticas.maxima = Number (dados[dados.length - 1]).toFixed(2)
    kpisAnaliticas.minima = Number (dados[0]).toFixed(2)
    return kpisAnaliticas;


}


function plotarGraficoPrincipal(respostaCpu, respostaDisco, respostaMemoria) {
    // console.log(`Iniciando a plotagem do gráfico`);

    const labels = [];
    const dadosCpu = [];
    const dadosMemoria = [];
    const dadosDisco = [];

    respostaCpu.forEach((item) => {
        if (!labels.includes(`${item.hora}`)) {
            labels.push(`${item.hora}`);
        }
        dadosCpu.push(item.media_valor);
    });

    respostaDisco.forEach((item) => {
        if (!labels.includes(`${item.hora}`)) {
            labels.push(`${item.hora}`);
        }
        dadosDisco.push(item.media_valor);
    });

    respostaMemoria.forEach((item) => {
        if (!labels.includes(`${item.hora}`)) {
            labels.push(`${item.hora}`);
        }
        dadosMemoria.push(item.media_valor);
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
                data: dadosCpu,
                borderWidth: 2,
                borderColor: "#4154f1",
                backgroundColor: "#4154f1",
                tension: 0.3
            },
            {
                label: 'Disco',
                data: dadosMemoria,
                borderWidth: 2,
                borderColor: "#2eca6a",
                backgroundColor: "#2eca6a",
                tension: 0.3
            },
            {
                label: 'Memória',
                data: dadosDisco,
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
                    beginAtZero: false
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
    kpisAnaliticasDisco = calcularKpisAnaliticas(dadosDisco)
    kpisAnaliticasCpu = calcularKpisAnaliticas(dadosCpu)
    kpisAnaliticasMemoria = calcularKpisAnaliticas(dadosMemoria)

    hd_info_min.innerHTML = kpisAnaliticasDisco.minima + "%"
    hd_info_max.innerHTML = kpisAnaliticasDisco.maxima + "%"
    hd_info_mediana.innerHTML = kpisAnaliticasDisco.mediana + "%"
    
    ram_info_min.innerHTML = kpisAnaliticasMemoria.minima + "%"
    ram_info_max.innerHTML = kpisAnaliticasMemoria.maxima + "%"
    ram_info_mediana.innerHTML = kpisAnaliticasMemoria.mediana + "%"

    cpu_info_min.innerHTML = kpisAnaliticasCpu.minima + "%"
    cpu_info_max.innerHTML = kpisAnaliticasCpu.maxima + "%"
    cpu_info_mediana.innerHTML = kpisAnaliticasCpu.mediana + "%"


    exibirKpiCorrelacao(dadosCpu, dadosMemoria, dadosDisco);


    // setTimeout(() => atualizarGrafico(idEmpresa, periodo, componente, grafico, dados), 2000)
}
async function dadosHorarioDePico(idEmpresa) {
    let resposta = await (fetch(`/dashGerente/grafico-horario-de-pico/${idEmpresa}`));
    let horarioDePico = await resposta.json();
    let totalUso = 0;
    for (let i = 0; i < horarioDePico.length; i++) {
        totalUso += horarioDePico[i]["porcentagemUso"]
    }
    for (let i = 0; i < horarioDePico.length; i++) {
        horarioDePico[i]["porcentagemUso"] = (horarioDePico[i]["porcentagemUso"] / totalUso) * 100
    }

    // console.log(horarioDePico)
    let labels = [];
    let horariosDePico = []
    for (let i = 0; i < horarioDePico.length; i++) {
        labels.push(horarioDePico[i]["hora"] + "h")
        horariosDePico.push(Number((horarioDePico[i]["porcentagemUso"]).toFixed(2)))
    }

    let graficoHorarioDePico = document.getElementById("graficoHorarioDePico");


    let dados = {
        labels: labels,
        datasets: [
            {
                label: 'Porcentagem de uso no dia',
                data: horariosDePico,
                borderWidth: 0,
                barThickness: 10,
                borderColor: "#4154f1",
                backgroundColor: "#4154f1",
                tension: 0.3,
                width: 2
            }
        ]
    };

    new Chart(graficoHorarioDePico, {
        type: 'bar',
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
                    display: "none",
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
}




function exibirKpiCorrelacao(dadosCpu, dadosMemoria, dadosDisco) {
    const discoCpu = document.getElementById("correlacao-disco-cpu")
    const discoMemoria = document.getElementById("correlacao-disco-memoria")
    const memoriaCpu = document.getElementById("correlacao-memoria-cpu")
    
    let correlacao_disco_cpu = calcularCorrelacao(dadosDisco, dadosCpu)
    let correlacao_disco_memoria = calcularCorrelacao(dadosDisco, dadosMemoria)
    let correlacao_memoria_cpu = calcularCorrelacao(dadosMemoria, dadosCpu)    

    discoCpu.innerHTML = (correlacao_disco_cpu * 100).toFixed(2) + "%"
    discoMemoria.innerHTML = (correlacao_disco_memoria * 100).toFixed(2) + "%"
    memoriaCpu.innerHTML = (correlacao_memoria_cpu * 100).toFixed(2) + "%"

    if (Math.abs(correlacao_disco_cpu * 100) < 30) {
        discoCpu.id
        discoCpu.classList.remove("text-success")
        discoCpu.classList.remove("text-warning")
        discoCpu.classList.add("text-danger")
    } else if (Math.abs(correlacao_disco_cpu * 100) >= 30 && Math.abs(correlacao_disco_cpu * 100) < 50) {
        discoCpu.classList.remove("text-success")
        discoCpu.classList.add("text-warning")
        discoCpu.classList.remove("text-danger")
    } else {
        discoCpu.classList.add("text-success")
        discoCpu.classList.remove("text-warning")
        discoCpu.classList.remove("text-danger")
    }

    if (Math.abs(correlacao_disco_memoria * 100) < 30) {
        discoMemoria.classList.remove("text-success")
        discoMemoria.classList.remove("text-warning")
        discoMemoria.classList.add("text-danger")
    } else if (Math.abs(correlacao_disco_memoria * 100) >= 30 && Math.abs(correlacao_disco_memoria * 100) < 50) {
        discoMemoria.classList.remove("text-success")
        discoMemoria.classList.add("text-warning")
        discoMemoria.classList.remove("text-danger")
    } else {
        discoMemoria.classList.add("text-success")
        discoMemoria.classList.remove("text-warning")
        discoMemoria.classList.remove("text-danger")
    }

    if (Math.abs(correlacao_memoria_cpu * 100) < 30) {
        memoriaCpu.classList.remove("text-success")
        memoriaCpu.classList.remove("text-warning")
        memoriaCpu.classList.add("text-danger")
    } else if (Math.abs(correlacao_memoria_cpu * 100) >= 30 && Math.abs(correlacao_memoria_cpu * 100) < 50) {
        memoriaCpu.classList.remove("text-success")
        memoriaCpu.classList.add("text-warning")
        memoriaCpu.classList.remove("text-danger")
    } else {
        memoriaCpu.classList.add("text-success")
        memoriaCpu.classList.remove("text-warning")
        memoriaCpu.classList.remove("text-danger")
    }

}

let agenciasSelecionadas = []
let idsAgencias = []
let periodoSelecionado = "year"

async function listarAgencias(idUsuario) {
    let resposta = await (fetch(`/usuarios/listarAgenciasVinculadas/${idUsuario}`))
    let agencias = await (resposta.json())
    // console.log(agencias)
    let dropdown_agencias = document.getElementById("dropdown_agencias")
    for (let i = 0; i < agencias.length; i++) {
        dropdown_agencias.innerHTML += `<li>
            <div class="form-check">
            <label class="form-check-label" for="check${agencias[i]["idAgencia"]}">
            ${agencias[i]["apelido"]}
            </label>
            <input class="checkbox style-2 pull-right opcao_agencia" type="checkbox" value="agencia${agencias[i]["idAgencia"]}" id="check${agencias[i]["idAgencia"]}" checked>
        </div>
        </li>`;
    }

}

function selecionarTodasAgencias() {
    let todasAgencias = document.getElementsByClassName("opcao_agencia")
    let agenciaChecada = document.getElementById("checkTodas").checked

    for (let i = 0; i < todasAgencias.length; i++) {
        todasAgencias[i].checked = agenciaChecada
    }
}


function buscarAgenciasSelecionadas(periodo) {
    agenciasSelecionadas = [];
    idsAgencias = document.getElementsByClassName("opcao_agencia")

    for (let i = 0; i < idsAgencias.length; i++) {
        if (idsAgencias[i].checked) {
            agenciasSelecionadas.push((idsAgencias[i].id).replace("check", ""))
        }
    }
    alterarPeriodoGraficos(periodoSelecionado, agenciasSelecionadas)
}


dadosHorarioDePico(sessionStorage.ID_EMPRESA)
listarAgencias(sessionStorage.ID_USUARIO)
setTimeout(
    () => {
        buscarAgenciasSelecionadas()
        alterarPeriodoGraficos("year", agenciasSelecionadas)
    }
    , 200)