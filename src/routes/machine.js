var express = require("express");
var router = express.Router();

var machineController = require("../controllers/machineController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/:establishmentId", (req, res) => {
  machineController.getMachinesByEstablishmentId(req, res);
})

router.get("/problem/:establishmentId", (req, res) => {
  machineController.getLastProblemByEstablishmentId(req, res);
})

module.exports = router;