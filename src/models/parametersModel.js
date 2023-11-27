
var database = require('../database/config')

function putParameters(body, establishmentId) {
  var query = `UPDATE opcoes
  SET
      autoRestart = ${body.autoRestart},
      restartPeriodico = ${body.restartPeriodico},
      horaRestart = '${body.horaRestart}',
      cpuAtencao =  ${body.cpuAtencao},
      ramAtencao =  ${body.ramAtencao},
      diskAtencao =  ${body.diskAtencao},
      latencyAtencao =${body.latencyAtencao},
      cpuLimite =  ${body.cpuLimite},
      ramLimite =  ${body.ramLimite},
      diskLimite =  ${body.diskLimite},
      latencyLimite = ${$body.latencyLimite}
  WHERE
      fkEstabelecimento = '${establishmentId}';`

  return database.executar(query);
}

function getParameters(establishmentId) {
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
  opcoes
WHERE
  fkEstabelecimento = '${establishmentId}';`

  return database.executar(query);
}

module.exports = {
  putParameters,
  getParameters	
}