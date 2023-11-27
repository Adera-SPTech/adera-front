
const model = require('../models/alertsModel');

function getAlertsByEstablishmentId(req, res) {
  model.getAlertsByEstablishmentId(req.params.establishmentId)
    .then(result => {
      res.json(result)
    })
}

function getAlertsByMachineId(req, res) {
  model.getAlertsByMachineId(req.params.machineId)
    .then(result => {
      res.json(result)
    })
}

module.exports = {
  getAlertsByEstablishmentId,
  getAlertsByMachineId
}