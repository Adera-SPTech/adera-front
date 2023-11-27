
var database = require('../database/config')

function putParameters(establishmentId) {
  var query = `UPDATE opcoes
  SET
      autoRestart = ${req.body.autoRestart},
      restartPeriodico = ${req.body.restartPeriodico},
      horaRestart = '${req.body.horaRestart}',
      cpuAtencao =  ${req.body.cpuAtencao},
      ramAtencao =  ${req.body.ramAtencao},
      diskAtencao =  ${req.body.diskAtencao},
      latencyAtencao =${req.body.latencyAtencao},
      cpuLimite =  ${req.body.cpuLimite},
      ramLimite =  ${req.body.ramLimite},
      diskLimite =  ${req.body.diskLimite},
      latencyLimite = ${$req.body.latencyLimite}
  WHERE
      fkEstabelecimento = '${establishmentId}';`

  return database.executar(query);
}

function putParameters(establishmentId) {
  var query = `SELECT
  id AS OpcoesID,
  autoRestart,
  restartPeriodico,
  horaRestart,
  cpuAtencao,
  ramAtencao,
  diskAtencao,
  latencyAtencao,
  cpuLimite,
  ramLimite,
  diskLimite,
  latencyLimite,
  fkEstabelecimento
FROM
  adera.opcoes
WHERE
  fkEstabelecimento = '${establishmentId}';`

  return database.executar(query);
}

module.exports = {
  putParameters
}