function exibirPerfil() {
    let fotoPerfil = document.getElementById("foto-perfil");
    fotoPerfil.setAttribute("src", sessionStorage.FOTO_USUARIO);
    let nomePerfil = document.getElementById("nome-perfil");
    nomePerfil.innerHTML = sessionStorage.NOME_USUARIO;
    // let cargoPerfil = document.getElementById("cargo-perfil");
    // cargoPerfil.innerHTML = sessionStorage.CARGO_USUARIO;

    let nomeEditar = document.getElementById("nome-editar");
    nomeEditar.innerHTML = sessionStorage.NOME_USUARIO;
    let cpfEditar = document.getElementById("cpf-editar");
    cpfEditar.innerHTML = sessionStorage.CPF_USUARIO;
    // let telefoneEditar = document.getElementById("telefone-editar");
    // telefoneEditar.innerHTML = sessionStorage.TELEFONE_USUARIO;
    let emailEditar = document.getElementById("email-editar");
    emailEditar.innerHTML = sessionStorage.EMAIL_USUARIO;

    let empresaEditar = document.getElementById("empresa-editar");
    empresaEditar.innerHTML = sessionStorage.EMPRESA_USUARIO;
    let cnpjEditar = document.getElementById("cnpj-editar");
    cnpjEditar.innerHTML = sessionStorage.CNPJ_USUARIO;
    // let cargoEditar = document.getElementById("cargo-editar");
    // cargoEditar.innerHTML = sessionStorage.CARGO_USUARIO;

    let fotoEditar = document.getElementById("foto-editar");
    fotoEditar.setAttribute("src", sessionStorage.FOTO_USUARIO);
}


function novaImagem(idUsuario) {
    const formData = new FormData();
    formData.append('imgNova', imgNova.files[0])

    fetch(`/perfil/alterarImagem/${idUsuario}`, {
        method: "POST",
        body: formData
    })
        .then(res => {
            exibirPerfil(idUsuario);
        })
        .catch(err => {
            console.log(err);
        })
}