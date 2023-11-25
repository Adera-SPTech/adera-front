
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
module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId
}