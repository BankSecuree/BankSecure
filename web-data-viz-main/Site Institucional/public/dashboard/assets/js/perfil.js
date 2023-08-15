function exibirPerfil() {
    var scrFoto = "profile.png"
    if (sessionStorage.FOTO_USUARIO != "null" && sessionStorage.FOTO_USUARIO != "undefined") {
        scrFoto = sessionStorage.FOTO_USUARIO;
    }
    let fotoPerfil = document.getElementById("foto-perfil");
    fotoPerfil.setAttribute("src", `assets/img/usuario/${scrFoto}`);
    let nomePerfil = document.getElementById("nome-perfil");
    nomePerfil.innerHTML = sessionStorage.NOME_USUARIO;
    let cargoPerfil = document.getElementById("cargo-perfil");
    cargoPerfil.innerHTML = sessionStorage.CARGO_USUARIO;

    let nomeGeral = document.getElementById("nome-geral");
    nomeGeral.innerHTML = sessionStorage.NOME_USUARIO;
    let cpfGeral = document.getElementById("cpf-geral");
    cpfGeral.innerHTML = sessionStorage.CPF_USUARIO;
    let dataNascimentoGeral = document.getElementById("dataNascimento-geral");
    dataNascimentoGeral.innerHTML = sessionStorage.DATA_NASCIMENTO_USUARIO;
    let telefoneGeral = document.getElementById("telefone-geral");
    telefoneGeral.innerHTML = sessionStorage.TELEFONE_USUARIO;
    let emailGeral = document.getElementById("email-geral");
    emailGeral.innerHTML = sessionStorage.EMAIL_USUARIO;
    let empresaGeral = document.getElementById("empresa-geral");
    empresaGeral.innerHTML = sessionStorage.NOME_EMPRESA;
    let cnpjGeral = document.getElementById("cnpj-geral");
    cnpjGeral.innerHTML = sessionStorage.CNPJ_EMPRESA;
    let cargoGeral = document.getElementById("cargo-geral");
    cargoGeral.innerHTML = sessionStorage.CARGO_USUARIO;

    let fotoEditar = document.getElementById("foto-editar");
    fotoEditar.setAttribute("src", `assets/img/usuario/${scrFoto}`);
    let nomeEditar = document.getElementById("nome-editar");
    nomeEditar.value = sessionStorage.NOME_USUARIO;
    let cpfEditar = document.getElementById("cpf-editar");
    cpfEditar.value = sessionStorage.CPF_USUARIO;
    let dataNascimentoEditar = document.getElementById("dataNascimento-editar");
    dataNascimentoEditar.value = sessionStorage.DATA_NASCIMENTO_USUARIO;
    let telefoneEditar = document.getElementById("telefone-editar");
    telefoneEditar.value = sessionStorage.TELEFONE_USUARIO;
    let emailEditar = document.getElementById("email-editar");
    emailEditar.value = sessionStorage.EMAIL_USUARIO;
    let empresaEditar = document.getElementById("empresa-editar");
    empresaEditar.value = sessionStorage.NOME_EMPRESA;
    let cnpjEditar = document.getElementById("cnpj-editar");
    cnpjEditar.value = sessionStorage.CNPJ_EMPRESA;
    let cargoEditar = document.getElementById("cargo-editar");
    cargoEditar.value = sessionStorage.CARGO_USUARIO;
}

function novaImagem() {
    const formData = new FormData();
    formData.append('imgNova', imgNova.files[0])

    fetch(`/perfil/alterarImagem/${sessionStorage.ID_USUARIO}`, {
        method: "POST",
        body: formData
    })
        .then(res => {
            
            exibirInfos();
            exibirPerfil();
        })
        .catch(err => {
            console.log(err);
        })
}