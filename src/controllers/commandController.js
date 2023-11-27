const model = require('../models/commandModel')

function insertCommand(req, res) {
  model.insertCommand(req.body.command, req.body.machineId)
    .then(() => res.status(200))
}

module.exports = {
  insertCommand
}