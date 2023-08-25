var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.post("/cadastrarNomeMaquina", function(req,res){
    hardwareController.cadastrarNomeMaquina(req,res)
});

router.post("/cadastrarHardwareCpu", function(req,res){
    hardwareController.cadastrarHardwareCpu(req,res)
});

router.post("/cadastrarHardwareMemoria", function(req,res){
    hardwareController.cadastrarHardwareMemoria(req,res)
});

router.post("/cadastrarHardwareDisco", function(req,res){
    hardwareController.cadastrarNomeMaquina(req,res)
});

router.post("/cadastrarHardwareTemperatura", function(req,res){
    hardwareController.cadastrarHardwareDisco
});

module.exports = router;