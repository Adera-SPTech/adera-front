

var database = require('../database/config')

function getMachinesByEstablishmentId(establishmentId) {
  var query = `select * from maquina_status where fkEstabelecimento = '${establishmentId}'`
  return database.executar(query)
}

function getLastProblemByEstablishmentId(establishmentId) {
  var query = `select * from last_problem where establishment_id = '${establishmentId}'`
  return database.executar(query);
}

module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId
}