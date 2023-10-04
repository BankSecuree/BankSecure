var express = require("express");
var router = express.Router();

var dashAnalistaController = require("../controllers/dashAnalistaController");

router.post("/dadosAnalista", function (req, res) {
    console.log("Cheguei na rota")
    dashAnalistaController.dadosAnalista(req, res);
});

module.exports = router;