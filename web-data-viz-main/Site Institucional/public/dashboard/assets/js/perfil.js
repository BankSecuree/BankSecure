function exibirPerfil() {
    let fotoPerfil = document.getElementById("foto-perfil")
    fotoPerfil.setAttribute("src", sessionStorage.FOTO_USUARIO)
    let fotoEditar = document.getElementById("foto-editar")
    fotoEditar.setAttribute("src", sessionStorage.FOTO_USUARIO)
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