var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", (req, res) => {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", (req, res) => {
    usuarioController.autenticar(req, res);
});

router.get("/:establishmentId", (req, res) => {
  usuarioController.getByEstablishmentId(req, res);
})

router.delete('/:userId', (req, res) => {
  usuarioController.deleteById(req, res);
})

router.put('', (req, res) => {
  usuarioController.atualizar(req, res)
})

module.exports = router;