
var database = require('../database/config')

function putParameters(autoRestart, restartPeriodico, restartTime, cpuAttention, cpuLimit, memoryAttention, memoryLimit, diskAttention, diskLimit, latencyAttention, latencyLimit,  establishmentId) {
  console.log("AAAAAA")
  var query = `UPDATE opcoes
  SET
      autoRestart = ${Number(autoRestart)},
      restartPeriodico = ${Number(restartPeriodico)},
      horaRestart = '${restartTime}',
      cpuAtencao =  ${cpuAttention},
      ramAtencao =  ${memoryAttention},
      diskAtencao =  ${diskAttention},
      latencyAtencao = ${latencyAttention},
      cpuLimite =  ${cpuLimit},
      ramLimite =  ${memoryLimit},
      diskLimite =  ${diskLimit},
      latencyLimite = ${latencyLimit}
  WHERE
      fkEstabelecimento = '${establishmentId}';
`;

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