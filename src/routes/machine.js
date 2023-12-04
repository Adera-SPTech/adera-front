var express = require("express");
var router = express.Router();

var machineController = require("../controllers/machineController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/:establishmentId", (req, res) => {
  machineController.getMachinesByEstablishmentId(req, res);
})

router.get("/m/:machineId", (req, res) => {
  machineController.getMachine(req, res);
})

router.get("/problem/:establishmentId", (req, res) => {
  machineController.getLastProblemByEstablishmentId(req, res);
})

router.get("/metrics/:machineId", (req, res) => {
  machineController.getMetricsByMachineId(req, res);
})

router.get("/last-metrics/:machineId", (req, res) => {
  machineController.lastMetrics(req, res)
})

module.exports = router;