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