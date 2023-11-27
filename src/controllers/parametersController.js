const model = require('../models/parametersModel');

function putParameters(req, res) {
  var body = req.body
  var establishmentId = req.params.establishmentId

  model.putParameters(body.autoRestart, body.restartPeriodico, body.restartTime, body.cpuAttention, body.cpuLimit, body.memoryAttention, body.memoryLimit, body.diskAttention, body.diskLimit, body.latencyAttention, body.latencyLimit, establishmentId)
    .then(result => {
      console.log("aa")
      res.status(200)
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