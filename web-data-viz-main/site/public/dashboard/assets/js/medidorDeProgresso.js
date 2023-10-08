function alterarPeriodoVizualizacao(campoParaAlterar, periodo){
    let periodos = {'1': "Hoje",
                    '2':"Este Mês",
                    '3':"Este Ano"}
    console.log(periodos[periodo])
    console.log(periodos.p1)
    let periodoId = document.getElementById(campoParaAlterar + "_period_info")
    if(campoParaAlterar == 'cpu'){
        periodoId.innerHTML = periodos[periodo]
    }else if(campoParaAlterar == 'ram'){
        periodoId.innerHTML = periodos[periodo]
    }else if(campoParaAlterar == 'hd'){
        periodoId.innerHTML = periodos[periodo]
    }else if(campoParaAlterar == 'graficoDonut'){
        periodoId.innerHTML = periodos[periodo]
    }
}