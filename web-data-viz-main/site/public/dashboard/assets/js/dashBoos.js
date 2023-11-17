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
            console.log(dados);
            dados.forEach(function (objeto) {
                vt_id_agencia.push(objeto.idAgencia);
                vt_nome_agencia.push(objeto.nomeAgencia);
                vt_total_problemas.push(objeto.totalProblemas);
            });

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
                    console.log("Iteração:", index);
                    
                    var nomeAgencia = vt_nome_agencia[index];
                    console.log("ID Agencia:", idAgencia);
                    console.log("Nome Agencia:", nomeAgencia);
            
                    var option = document.createElement('option');
                    option.value = idAgencia;
                    option.text = nomeAgencia;
                    select.appendChild(option);
            
                    var elemento = document.querySelector(`[value="${idAgencia}"]`);


            
                    if (elemento) {
                        console.log("Elemento encontrado:", elemento);
            
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
            
            

            var ranqueContainer = document.querySelector('.ranque');


            for (var i = 0; i < vt_id_agencia.length; i++) {
                var divAgencia = document.createElement('div');
                divAgencia.innerHTML = `<h6 style="color: #899BBD">Nome da agência: <span style="font-size: 1em; color: #012970;">${vt_nome_agencia[i]}</span></h6>`;
                var divProblemas = document.createElement('div');
                divProblemas.innerHTML = `<h6 style="color:#8B0000;">Quantidade de problemas: <span style="font-size: 1em; color: red;">${vt_total_problemas[i]}</span></h6>`;

                ranqueContainer.appendChild(divAgencia);
                ranqueContainer.appendChild(divProblemas);
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function obterDadosGrafico(componente, tipoAgencia) {
    var idGerente = sessionStorage.GERENTE_USUARIO
    var selectTipoAgencia = document.getElementById("tipo-agencia").value

    fetch(`/dashBoos/ultimas/${idGerente}/${componente}/${tipoAgencia}/${selectTipoAgencia}`, { cache: "no-store" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("Dados recebidos: " + JSON.stringify(resposta))


            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API')
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`)
    })

}









obterKpiAgencia()

function chamarFuncoes() {
    setInterval(() => {
        var selectComponente = document.getElementById("componente").value;

        if (selectComponente == "cpu") {
            document.getElementById('tipo-agencia').addEventListener('change', function (elemento) {
                obterDadosGrafico(1, elemento.target.value);
            });
        }
        else if (selectComponente == "disco") {
            document.getElementById('tipo-agencia').addEventListener('change', function (elemento) {
                obterDadosGrafico(2, elemento.target.value);
            });
        } else if (selectComponente == "memoria") {
            document.getElementById('tipo-agencia').addEventListener('change', function (elemento) {
                obterDadosGrafico(3, elemento.target.value);
            });
        }


    }, 3000)


}