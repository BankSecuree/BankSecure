var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.post("/cadastrarHardware", function(req,res){
    console.log("REQ: " + req);
    hardwareController.cadastrarHardware(req,res)
})

// router.post("/cadastrarNomeMaquina", function(req,res){
//     hardwareController.cadastrarNomeMaquina(req,res)
// });

// router.post("/cadastrarHardwareCpu", function(req,res){
//     hardwareController.cadastrarHardwareCpu(req,res)
// });

// router.post("/cadastrarHardwareMemoria", function(req,res){
//     hardwareController.cadastrarHardwareMemoria(req,res)
// });

// router.post("/cadastrarHardwareDisco", function(req,res){
//     hardwareController.cadastrarHardwareDisco(req,res)
// });
// router.post("/cadastrarHardwareTemperatura", function(req,res){
//     hardwareController.cadastrarHardwareTemperatura(req,res)
// });
// router.post("/cadastrarhardwareTabelaAssociativa", function(req, res){
//     hardwareController.cadastrarHardwareTabelaAssociativa(req,res)
// });

module.exports = router;