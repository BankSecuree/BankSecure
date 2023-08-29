var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.post("/cadastrarNomeMaquina", function(req,res){
    hardwareController.cadastrarNomeMaquina(req,res)
});

router.post("/cadastrarComponente", function(req,res){
    hardwareController.cadastrarComponente(req,res)
})


module.exports = router;