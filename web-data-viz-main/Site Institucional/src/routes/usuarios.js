var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/exibirTabelaUsuarios/:gerente", function (req, res) {
    usuariosController.exibirTabelaUsuarios(req, res);
});

module.exports = router;