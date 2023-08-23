var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/exibirTabelaUsuarios/:idUsuario", function (req, res) {
    usuariosController.exibirTabelaUsuarios(req, res);
});

router.post("/cadastrarEmpresaGerente", function (req, res) {
    usuariosController.cadastrarEmpresaGerente(req, res);
})

router.post("/cadastrarAgencia", function (req, res) {
    usuariosController.cadastrarAgencia(req, res);
})


module.exports = router;