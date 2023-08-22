var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");

router.post("/cadastrarHardware", function(req,res){
    hardwareController.cadastrarHardware(req,res);
});

module.exports = router;