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

router.get("/listarFuncionario/:idUsuario", function (req, res){
    usuariosController.listarFuncionario(req, res);
})

router.get("/listarAgenciasVinculadas/:idUsuario", function (req, res){
    usuariosController.listarAgenciasVinculadas(req, res);
})

router.get("/listarAgenciasNaoVinculadas/:idUsuario/:fkEmpresa", function (req, res){
    usuariosController.listarAgenciasNaoVinculadas(req, res);
})

router.delete("/desvincularAgencia/:idUsuario/:idAgencia", function (req, res) {
    usuariosController.desvincularAgencia(req, res);
});

router.post("/vincularAgencia", function (req, res) {
    usuariosController.vincularAgencia(req, res);
})

module.exports = router;