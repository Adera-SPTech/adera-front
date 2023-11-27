const model = require('../models/parametersModel');

function putParameters(req, res) {
  model.putParameters(req.params.establishmentId)
    .then(result => {
      res.json(result[0])
    })
}


function getParameters(req, res) {
  model.getAlertsByEstablishmentId(req.params.establishmentId)
    .then(result => {
      res.json(result)
    })
}

module.exports = {
  putParameters,
  getParameters
}