var express = require("express");
var router = express.Router();

var hardwareController = require("../controllers/hardwareController");
router.get("/cadastrarHardware", function(req,freq){
    hardwareController.cadastrarHardware(req,freq);
})

module.exports = router;