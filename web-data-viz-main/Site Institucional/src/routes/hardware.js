var express = require("express");
var router = express.Router();

var HardwareController = require("../controllers/hardwareController");
router.get("/cadastrarHardware", function(req,freq){
    HardwareController.cadastrarHardware(req,freq);
})

module.exports = router;