var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.get("/exibirTabelaUsuarios/:idUsuario", function (req, res) {
    usuariosController.exibirTabelaUsuarios(req, res);
});

router.post("/cadastrarEmpresaGerente", function (req, res) {
    usuariosController.cadastrarEmpresaGerente(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuariosController.cadastrarFuncionario(req, res);
})

router.get("/listarUltimoIdEmpresa", function (req, res){
    usuariosController.listarUltimoIdEmpresa(req, res);
})

router.delete("/excluirUsuario/:idUsuario", function (req, res) {
    usuariosController.excluirUsuario(req, res);
});

module.exports = router;