const database = require('../database/config')
const uuid = require('uuid')

function insertCommand(command, machineId) {
  var id = uuid.v4()
  var query = `insert into comando (id, comando, rodou, fkMaquina) values ('${id}', '${command}', 0, '${machineId}')`

  console.log(query)

  return database.executar(query)
}

module.exports = {
  insertCommand
}