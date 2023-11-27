
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

function getAlertListWithFilters(req, res) {
  var ecId = req.params.establishmentId;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  var level = req.query.level;
  var machineId = req.query.machineId;

  model.getAlertListWithFilters(ecId, startDate, endDate, level, machineId)
    .then(result => res.json(result))
}

module.exports = {
  getAlertsByEstablishmentId,
  getAlertsByMachineId,
  getAlertListWithFilters
}