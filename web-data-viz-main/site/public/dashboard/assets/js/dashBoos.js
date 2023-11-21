function alterarComponente(componente) {
    var textoDefinicao = document.getElementById("textoDefinicao")
    if(componente === "cpu") {
        textoDefinicao.innerHTML = `<h2 style= "color: #002F5C">CPU:</h2> <br> 
        <span  style = "color:#097BF4">Alerta: Quando o valor do registro do componente está acima ou abaixo do ideal</span> <br> 
        <span style = "color:#097BF4 ">Máximo aceitável: 75%</span> <br> 
        <span style = "color:#097BF4 ">Uso ideal: 45% </span><br>
        <span style = "color:#097BF4 ">Mínimo aceitável: 10%</span>`
    } else if(componente === "disco") {
        textoDefinicao.innerHTML = `<h2 style = "color: #117701">Disco:</h2> <br>
        <span style = "color:#02E12E ">Alerta: Quando o valor do registro do componente está acima ou abaixo do ideal</span> <br> 
        <span style = "color:#02E12E ">Máximo aceitável: 95%</span> <br> 
        <span style = "color:#02E12E ">Uso ideal: 70% </span><br>
        <span style = "color:#02E12E ">Mínimo aceitável: 20%</span>`
    } else if(componente === 'memoria') {
        textoDefinicao.innerHTML = `<h2 style = "color:#D75413 ">Memória:</h2> <br> 
        <span style = "color:#E57C49 ">Alerta: Quando o valor do registro do componente está acima ou abaixo do ideal</span> <br> 
        <span style = "color:#E57C49 ">Máximo aceitável: 90%</span> <br> 
        <span style = "color:#E57C49 ">Uso ideal: 60% </span><br>
        <span style = "color:#E57C49 ">Mínimo aceitável: 20%</span>`
    }
}

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
    const largura = 400;
    const altura = 400;

    const canvas = document.createElement('canvas');
    canvas.width = largura;
    canvas.height = altura;
    const context = canvas.getContext('2d');

    // Defina o atributo willReadFrequently como true
    context.imageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;

    // Adicione o atributo willReadFrequently
    context.canvas.willReadFrequently = true;

    const svg = d3.select('#wordcloud').append('svg')
        .attr('width', largura)
        .attr('height', altura);




    const configuracoesNuvem = {
        size: 0.7,
        color: 'random-light',
        backgroundColor: 'black',
        rotateRatio: 0
    };

    const tamanhoMaximoPercentual = 0.5; 
    const tamanhoMinimoPercentual = 0.1; 
    const tamanhoMinimoAbsoluto = 10;
    const aumentoSignificativo = 2;
    
    // Obtém a largura da tela
    const larguraTela = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    
    // Calcula os tamanhos máximo e mínimo com base na largura da tela
    const tamanhoMaximo = larguraTela * tamanhoMaximoPercentual;
    const tamanhoMinimo = larguraTela * tamanhoMinimoPercentual;
    
    const layout = d3.layout.cloud()
    .size([largura, altura])
    .words(dados
        .filter(item => item.totalProblemas > 0) // Somente incluir itens com totalProblemas maior que 0
        .map(item => ({
            text: item.nomeAgencia,
            size: item.totalProblemas
        }))
    )
    
    
    .padding(10)
    .rotate(() => 0)
    .fontSize(item => (item.size > 0) ? Math.max(item.size * aumentoSignificativo, tamanhoMinimoAbsoluto) : tamanhoMinimoAbsoluto)
    .on('end', desenharNuvem)
    .random(() => 0.5)
    .fontWeight('normal')
    .text(item => item.text);

console.log(dados)
layout.start();

function desenharNuvem(palavras) {
    // Encontrar o maior elemento
    var maiorElemento = palavras.reduce((maior, atual) => (atual.size > maior.size) ? atual : maior, palavras[0]);

    svg.selectAll('text')
        .data(palavras)
        .enter().append('text')
        .style('font-size', item => item.size + 'px')
        .style('fill', item => (configuracoesNuvem.color === 'random-light') ? randomColor() : configuracoesNuvem.color)
        .style('background-color', configuracoesNuvem.backgroundColor)
        .attr('transform', function (item) {
            // Calcular a posição relativa em relação ao maior elemento
            var x = (item === maiorElemento) ? 0 : item.x - maiorElemento.x;
            var y = (item === maiorElemento) ? 0 : item.y - maiorElemento.y;
            return `translate(${largura / 2 + x}, ${altura / 2 + y})rotate(${item.rotate})`;
        })
        .text(item => item.text)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
}

    
    
    


    function randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
}
















var intervaloId;
var selectComponente = document.getElementById("componente");
var selectTipoAgencia = document.getElementById('tipo-agencia');

function chamarFuncoes() {
    alterarComponente('cpu')


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













