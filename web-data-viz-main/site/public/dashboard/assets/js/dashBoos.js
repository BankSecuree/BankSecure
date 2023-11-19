

function obterKpiAgencia() {
    var idGerente = sessionStorage.GERENTE_USUARIO;
    var select = document.getElementById('tipo-agencia');
    var vt_id_agencia = [];
    var vt_nome_agencia = [];
    var vt_total_problemas = [];

    fetch(`/dashBoos/obterKpiAgencia/${idGerente}`)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error(`Erro na solicitação: ${resposta.status} ${resposta.statusText}`);
            }
            if (resposta.status == 204) {
                throw "Nenhum resultado encontrado";
            }
            return resposta.json();
        })
        .then(function (dados) {
            console.log(dados)
            dados.forEach(function (objeto) {
                vt_id_agencia.push(objeto.idAgencia);
                vt_nome_agencia.push(objeto.nomeAgencia);
                vt_total_problemas.push(objeto.totalProblemas);
            });

            // Restante do código para preencher o DOM
            console.log(vt_id_agencia);
            console.log(vt_nome_agencia);
            console.log(vt_total_problemas);

            // Limpar opções existentes
            select.innerHTML = '';

            // Adicionar a opção padrão
            var todasOption = document.createElement('option');
            todasOption.value = 'todas';
            todasOption.text = 'Todas as agências';
            select.appendChild(todasOption);

            var selectComponente = document.getElementById("componente").value;
            var selectTipoAgencia = document.getElementById("tipo-agencia").value;

            vt_id_agencia.forEach(function (idAgencia, index) {
                var nomeAgencia = vt_nome_agencia[index];

                var option = document.createElement('option');
                option.value = idAgencia;
                option.text = nomeAgencia;
                select.appendChild(option);


                var elemento = document.querySelector(`[value="${idAgencia}"]`);

                if (elemento) {
                    if (selectComponente == "cpu") {
                        elemento.addEventListener('change', function (elemento) {
                            console.log("Change evento acionado para CPU:", elemento.target.value);
                            obterDadosGrafico(1, elemento.target.value);
                        });
                    } else if (selectComponente == "disco") {
                        elemento.addEventListener('change', function (elemento) {
                            console.log("Change evento acionado para Disco:", elemento.target.value);
                            obterDadosGrafico(2, elemento.target.value);
                        });
                    } else if (selectComponente == "memoria") {
                        elemento.addEventListener('change', function (elemento) {
                            console.log("Change evento acionado para Memória:", elemento.target.value);
                            obterDadosGrafico(3, elemento.target.value);
                        });
                    }
                } else {
                    console.error(`Elemento não encontrado para ID ${idAgencia}`);
                }
            });

            // Limpar elementos existentes antes de adicionar novos
            var ranqueContainer = document.querySelector('.ranque');
            ranqueContainer.innerHTML = '';

            // Adicionar novos elementos ao DOM
            for (var i = 0; i < vt_id_agencia.length; i++) {
                var divAgencia = document.createElement('div');
                divAgencia.innerHTML = `<h6 style="color: #899BBD">Nome da agência: <span style="font-size: 1em; color: #012970;">${vt_nome_agencia[i]}</span></h6>`;
                var divProblemas = document.createElement('div');
                divProblemas.innerHTML = `<h6 style="color:#8B0000;">Quantidade de alertas: <span style="font-size: 1em; color: red;">${vt_total_problemas[i]}</span></h6>`;

                ranqueContainer.appendChild(divAgencia);
                ranqueContainer.appendChild(divProblemas);
            }

            // Chamar obterDadosGrafico ao final da função obterKpiAgencia
            obterDadosGrafico(1, select.value);
            plotarGraficoFreq(dados);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

// Chamar a função inicialmente
obterKpiAgencia()





function obterDadosGrafico(componente, tipoAgencia) {
    var idGerente = sessionStorage.GERENTE_USUARIO
    var selectTipoAgencia = document.getElementById("tipo-agencia").value

    fetch(`/dashBoos/ultimas/${idGerente}/${componente}/${tipoAgencia}/${selectTipoAgencia}`, { cache: "no-store" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("Dados recebidos: " + JSON.stringify(resposta))

                plotarGrafico(resposta, componente, tipoAgencia, selectTipoAgencia)

            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API')
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })
}


function plotarGrafico(resposta, componente, tipoAgencia, selectTipoAgencia) {
    // Verificar se resposta é uma array de objetos
    if (!Array.isArray(resposta) || resposta.length === 0 || typeof resposta[0] !== 'object') {
        console.error("A resposta não é um array válido de objetos.");
        return;
    }

    var selectComponente = document.getElementById("componente").value;
    var selectTipoAgencia = document.getElementById("tipo-agencia").value;
    var corSelecionada = "";
    var corDeFundoSelecionada = "";
    var nomeGrafico = "";

    if (selectComponente == "cpu") {
        corSelecionada = "#4154f1";
        corDeFundoSelecionada = "#4154f1";
        nomeGrafico = "CPU";
    } else if (selectComponente == "disco") {
        corSelecionada = "#2eca6a";
        corDeFundoSelecionada = "#2eca6a";
        nomeGrafico = "Disco";
    } else if (selectComponente == "memoria") {
        corSelecionada = "#ff771d";
        corDeFundoSelecionada = "#ff771d";
        nomeGrafico = "Memória";
    }

    console.log("Iniciando a plotagem do gráfico");

    var labels = [];
    var dados = [];

    if (selectTipoAgencia == "todas") {
        // Caso seja "todas", use os dados normais
        labels = resposta.map(item => item.nomeAgencia);
        dados = resposta.map(item => item.mediaValor);
    } else {
        // Use os dados normais, mas mude os rótulos para dataHora
        labels = resposta.map(item => item.dataHora);
        dados = resposta.map(item => item.mediaValor);
    }

    console.log("Labels:", labels);
    console.log("Dados:", dados);

    const grafico = document.getElementById('chartGraficoLinha');

    if (Chart.getChart(grafico)) {
        Chart.getChart(grafico).destroy();
    }

    let dadosGrafico = {
        labels: labels,
        datasets: [
            {
                label: nomeGrafico,
                data: dados,
                borderWidth: 2,
                borderColor: corSelecionada,
                backgroundColor: corDeFundoSelecionada,
                tension: 0.3,
            },
        ],
    };

    console.log("Dados do gráfico:", dadosGrafico);

    new Chart(grafico, {
        type: 'line',
        data: dadosGrafico,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: "",
                    beginAtZero: true,
                },
                x: {
                    title: "",
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
}


function atualizarGrafico(componente, tipoAgencia, selectTipoAgencia, grafico, dadosGrafico) {
    console.log(dadosGrafico)
    var idGerente = sessionStorage.GERENTE_USUARIO
    fetch(`/dashBoos/tempo-real/${idGerente}/${componente}/${tipoAgencia}/${selectTipoAgencia}`, { cache: "no-store" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log("Dados recebidos:" + JSON.stringify(novoRegistro));
                console.log('Dados atuais do gráfico:');
                console.log(dadosGrafico);

                var selectTipoAgencia = document.getElementById("tipo-agencia")


                // Adicionar novo rótulo ao array de rótulos
                if (selectTipoAgencia == "todas") {
                    dadosGrafico.labels.push(novoRegistro.nomeAgencia)
                    dadosGrafico.datasets.data.push(novoRegistro.mediaValor)
                } else {
                    dadosGrafico.labels[0].shift()
                    dadosGrafico.labels.push(novoRegistro.dataHora)
                    dadosGrafico.datasets[0].data.shift()
                    dadosGrafico.datasets[0].data.push(novoRegistro.mediaValor)
                }





                // Agendar a próxima atualização após 10 segundos
                console.log(dadosGrafico)
            });
        } else {
            console.error("Nenhum dado encontrado ou erro na API");
        }
    }).catch(function (error) {
        console.error(`Erro na obtencao de dados para o grafico ${error.message}`);
    });
}

function plotarGraficoFreq(dados) {

    

    var palavras = dados.slice(0, 50).map(function (item) {
        return { text: item.nomeAgencia, weight: item.totalProblemas };
    });


    var options = {
        gridSize: 1,
        weightFactor: 0.7,
        fontFamily: 'Arial, sans-serif',
        color: 'random-dark',
        backgroundColor: '#000',
        rotateRatio: 0,
        shape: 'circle',
        click: function (item) {
            console.log(`Agencia: ${item.text}, Alertas:${item.weight} `)
        }
    };

    var canvas = document.getElementById('wordcloud');
    canvas.width = 800; // Largura desejada
    canvas.height = 600; // Altura desejada

    // Gera a nuvem de palavras no lado do cliente
    WordCloud(canvas, { list: palavras, ...options });
}


var intervaloId;
var selectComponente = document.getElementById("componente");
var selectTipoAgencia = document.getElementById('tipo-agencia');

function chamarFuncoes() {
    // Remover ouvintes de eventos existentes
    selectComponente.removeEventListener('change', handleComponenteChange);
    selectTipoAgencia.removeEventListener('change', handleTipoAgenciaChange);

    // Adicionar ouvintes de evento
    selectComponente.addEventListener('change', handleComponenteChange);
    selectTipoAgencia.addEventListener('change', handleTipoAgenciaChange);

    // Limpar intervalo existente se houver
    if (intervaloId) {
        clearInterval(intervaloId);
    }

    // Iniciar novo intervalo com base na seleção atual
    iniciarIntervalo();
}

function handleComponenteChange(event) {
    // Lógica para lidar com a mudança no componente
    var novoValor = event.target.value;
    obterDadosGrafico(getNumeroDoComponente(novoValor), selectTipoAgencia.value);

    // Limpar intervalo existente se houver
    if (intervaloId) {
        clearInterval(intervaloId);
    }

    // Iniciar novo intervalo com base na seleção atual
    iniciarIntervalo();
}

function handleTipoAgenciaChange(event) {
    // Lógica para lidar com a mudança no tipo de agência
    var novoValor = event.target.value;
    obterDadosGrafico(getNumeroDoComponente(selectComponente.value), novoValor);

    // Limpar intervalo existente se houver
    if (intervaloId) {
        clearInterval(intervaloId);
    }

    // Iniciar novo intervalo com base na seleção atual
    iniciarIntervalo();
}

function iniciarIntervalo() {
    // Iniciar novo intervalo com base na seleção atual
    intervaloId = setInterval(function () {
        obterDadosGrafico(
            getNumeroDoComponente(selectComponente.value),
            selectTipoAgencia.value
        );
    }, 3000);
}

// Função auxiliar para obter o número do componente com base no valor da select box
function getNumeroDoComponente(valor) {
    switch (valor) {
        case "cpu":
            return 1;
        case "disco":
            return 2;
        case "memoria":
            return 3;
        default:
            return 1;
    }
}













