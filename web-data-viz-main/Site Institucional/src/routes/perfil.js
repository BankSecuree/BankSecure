var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.get("/", function (req, res) {
    perfilController.testar(req, res);
});

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastro', upload.single('foto'), (req, res) => {
    perfilController.salvar(req, res);
});

router.get('/:id', upload.single('foto'), (req, res) => {
    perfilController.buscarperfilPeloId(req, res);
});

module.exports = router;