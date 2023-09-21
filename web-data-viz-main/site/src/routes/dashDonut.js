var express = require("express");
var router = express.Router();

var dashDonutController = require("../controllers/dashDonutController");

router.get("/exibirDonut", function (req, res) {
    dashDonutController.exibirDonut(req, res);
});

module.exports = router;