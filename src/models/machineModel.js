

var database = require('../database/config')

function getMachinesByEstablishmentId(establishmentId) {
  var query = `select * from maquina_status where fkEstabelecimento = '${establishmentId}'`
  return database.executar(query)
}

function getLastProblemByEstablishmentId(establishmentId) {
  var query = `select * from last_problem where establishment_id = '${establishmentId}'`
  return database.executar(query);
}

function getMetricsByMachineId(machineId) {
  var query = `SELECT
  m.id AS MaquinaID,
  m.nomeMaquina AS NomeMaquina,
  mc.id AS MaquinaComponenteID,
  mc.modelo AS ModeloMaquina,
  mc.descricao AS DescricaoMaquina,
  tc.nome as tipo,
  met.id AS MetricaID,
  met.medicao AS MedicaoMetrica,
  met.data AS DataMetrica
FROM
  maquina m
JOIN
  maquinacomponente mc ON m.id = mc.fkMaquina
JOIN tipocomponente tc on tc.id = mc.fkTipoComponente
JOIN
  metrica met ON mc.id = met.fkMaquinaComponente
WHERE
  m.id = '${machineId}';`

  return database.executar(query);
}

function lastMetrics(machineId) {
  var query= `SELECT
    m.id AS MaquinaID,
    m.nomeMaquina AS NomeMaquina,
    mc.id AS MaquinaComponenteID,
    mc.modelo AS ModeloMaquina,
    mc.descricao AS DescricaoMaquina,
    tc.nome as tipo,
    met.id AS MetricaID,
    met.medicao AS MedicaoMetrica,
    met.data AS DataMetrica
      FROM
        maquina m
      JOIN
        maquinacomponente mc ON m.id = mc.fkMaquina
      JOIN tipocomponente tc on tc.id = mc.fkTipoComponente
      JOIN
        metrica met ON mc.id = met.fkMaquinaComponente
      WHERE
        m.id = '${machineId}'
        AND met.data >= DATEADD(HOUR, -1, GETDATE());`


  return database.executar(query)
}

module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId,
  getMetricsByMachineId,
  lastMetrics
}