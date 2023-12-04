
const model = require('../models/machineModel');

function getMachinesByEstablishmentId(req, res) {
  model.getMachinesByEstablishmentId(req.params.establishmentId)
    .then(result => {
      res.json(result)
    })
}

function getLastProblemByEstablishmentId(req, res) {
  model.getLastProblemByEstablishmentId(req.params.establishmentId)
    .then(result => {
      res.json(result[0])
    })
}

function getMetricsByMachineId(req, res) {
  model.getMetricsByMachineId(req.params.machineId)
    .then(result => {
      res.json(result)
    })
}

function lastMetrics(req, res) {
  model.lastMetrics(req.params.machineId)
    .then(result => res.json(result))
}

function getMachine(req, res) {
  model.getMachine(req.params.machineId)
    .then(result => res.json(result))
}

module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId,
  getMetricsByMachineId,
  lastMetrics,
  getMachine
}