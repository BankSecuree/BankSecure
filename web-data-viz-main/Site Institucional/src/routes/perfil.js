var express = require("express");
var router = express.Router();
const perfilController = require("../controllers/perfilController");
const upload = require('../config/configUpload'); // ARQUIVO COM A COFIGURAÇÃO DO UPLOAD

router.get("/:idUsuario", function (req, res) {
    perfilController.exibirPerfil(req, res);
});

// upload.single('imgNova') vai buscar no json alguma propriedade chamada imgNova 
router.post("/alterarImagem/:idUsuario", upload.single('imgNova'), (req, res) => {
    perfilController.alterarImagem(req, res);
});



module.exports = router;