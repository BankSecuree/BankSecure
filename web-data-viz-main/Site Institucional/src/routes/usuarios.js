var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/listar", function (req, res) {
    usuariosController.exibirTabelaUsuarios(req, res);
});

module.exports = router;