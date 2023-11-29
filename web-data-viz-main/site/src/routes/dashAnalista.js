var express = require("express");
var router = express.Router();

var dashAnalistaController = require("../controllers/dashAnalistaController");
const { dadosAnalista } = require("../models/dashAnalistaModel");

router.post("/dadosAnalista", function (req, res) {
    console.log("Cheguei na rota")
    dashAnalistaController.dadosAnalista(req, res);
});

router.get("/dadosTemperatura/:idEmpresa/:fkMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.dadosTemperatura(req,res);
});


router.get("/dadosPorcentagem/:idEmpresa/:fkMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.dadosPorcentagem(req,res);
});


router.get("/kpiDadosTemperatura/:idEmpresa/:idAgencia/:idMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.kpiDadosTemperatura(req,res);
});


router.get("/kpiDadosUso/:idEmpresa/:idAgencia/:idMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.kpiDadosUso(req,res);
});


router.get("/maiorTemperaturaRel/:idEmpresa/:idAgencia",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.maiorTemperaturaRel(req,res);
});


router.get("/maiorUsoRel/:idEmpresa/:idAgencia",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.maiorUsoRel(req,res);
});

router.get("/menorTemperaturaRel/:idEmpresa/:fkMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.menorTemperaturaRel(req,res);
});

router.get("/menorUsoRel/:idEmpresa/:idAgencia",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.menorUsoRel(req,res);
});

router.get("/mediaTemperaturaRel/:idEmpresa/:idAgencia",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.mediaTemperaturaRel(req,res);
});


router.get("/mediaUsoRel/:idEmpresa/:idAgencia",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.mediaUsoRel(req,res);
});


router.get("/pegarNomeMaquina/:idEmpresa/:idAgencia/:fkMaquina",function(req,res){
    console.log("Cheguei na rota")
    dashAnalistaController.pegarNomeMaquina(req,res);
});


module.exports = router;