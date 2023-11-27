var express = require("express");
var router = express.Router();

var alertsController = require("../controllers/alertsController");

router.get("/:establishmentId", (req, res) => {
  alertsController.getAlertsByEstablishmentId(req, res);
})

router.get("/machine/:machineId", (req, res) => {
  alertsController.getAlertsByMachineId(req, res);
})

module.exports = router;