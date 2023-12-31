var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.post("/cadastrarNomeMaquina", function(req,res){
    hardwareController.cadastrarNomeMaquina(req,res)
});

router.post("/criarViewMaquina", function(req,res){
    hardwareController.criarViewMaquina(req,res)
});

router.post("/cadastrarComponente", function(req,res){
    hardwareController.cadastrarComponente(req,res)
});
router.get("/exibirTabelaMaquinas/:idEmpresa", function(req,res){
    hardwareController.exibirTabelaMaquinas(req,res)
});
router.get("/exibirOptionAgencia/:idEmpresa", function (req, res) {
    hardwareController.exibirOptionAgencia(req, res);
});

router.get("/deletarMaquina/:idMaquina", (req, res) => {
    hardwareController.deletarMaquina(req, res);
})

router.post("/alterarMaquina", (req, res) => {
    hardwareController.alterarMaquina(req, res);
})

router.get("/consultarTudo/:idEmpresa", (req, res) => {
    hardwareController.consultarTudo(req, res);
})

module.exports = router;