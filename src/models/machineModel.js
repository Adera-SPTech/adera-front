

var database = require('../database/config')

function getMachinesByEstablishmentId(establishmentId) {
  var query = `select * from adera.maquina_status where fkEstabelecimento = '${establishmentId}'`
  return database.executar(query)
}

function getLastProblemByEstablishmentId(establishmentId) {
  var query = `select * from adera.last_problem`
  return database.executar(query);
}

function getMetricsByMachineId(machineId) {
  var query = `select * from metrica where fkMaquinaComponente = '${machineId}' order by data desc;`
  return database.executar(query);
}

module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId,
  getMetricsByMachineId
}