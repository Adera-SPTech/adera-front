const model = require('../models/parametersModel');

function putParameters(req, res) {
  var body = req.body
  var establishmentId = req.params.establishmentId

  model.putParameters(body, establishmentId)
    .then(result => {
      res.json(result[0])
    })
}


function getParameters(req, res) {
  model.getParameters(req.params.establishmentId)
    .then(result => {
      res.json(result[0])
    })
}

module.exports = {
  putParameters,
  getParameters
}