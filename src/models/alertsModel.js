

var database = require('../database/config')

function getAlertsByEstablishmentId(establishmentId) {
  var query = `SELECT
  m.id AS MaquinaID,
  m.nomeMaquina AS NomeMaquina,
  COUNT(a.id) AS QuantidadeAlertasNaoLidos
FROM
  adera.maquina m
JOIN
  adera.maquinacomponente mc ON m.id = mc.fkMaquina
JOIN
  adera.metrica met ON mc.id = met.fkMaquinaComponente
JOIN
  adera.alerta a ON met.id = a.fkMetrica
WHERE
  m.fkEstabelecimento = '${establishmentId}' 
  AND a.alertado = 0 
GROUP BY
  m.id, m.nomeMaquina;`
  
  return database.executar(query)
}

function getAlertsByMachineId(machineId) {
  var query = `SELECT
  a.id AS AlertaID,
  a.data AS DataAlerta,
  a.nivel AS NivelAlerta,
  a.descricao AS DescricaoAlerta,
  a.alertado AS AlertaLido,
  m.id AS MaquinaComponenteID,
  mc.modelo AS ModeloMaquina,
  mc.descricao AS DescricaoMaquina,
  mc.capacidade AS CapacidadeMaquina,
  mc.ativo AS MaquinaAtiva
FROM
  adera.alerta a
JOIN
  adera.metrica met ON a.fkMetrica = met.id
JOIN
  adera.maquinacomponente mc ON met.fkMaquinaComponente = mc.id
JOIN
  adera.maquina m ON mc.fkMaquina = m.id
WHERE
  m.id = '${machineId}';`
  
  return database.executar(query)
}

function getAlertListWithFilters(ecId, start, end, level, machineId) {
  var whereClause = `WHERE e.id = '${ecId}'`;

  // Add conditions based on other parameters
  if (start !== '') {
    whereClause += ` AND a.data >= CONVERT(DATETIMEOFFSET, '${start}') AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time'`;
  }

  if (end !== '') {
    whereClause += ` AND a.data <= CONVERT(DATETIMEOFFSET, '${end}') AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time'`;
  }

  if (level !== '') {
    whereClause += ` AND a.nivel = '${level}'`;
  }

  if (machineId !== '') {
    whereClause += ` AND ma.id = '${machineId}'`;
  }

  // Construct the full query
  var query = `
    SELECT TOP 100 nomeMaquina, a.nivel, a.data, a.descricao
    FROM alerta a 
      JOIN metrica me ON a.fkMetrica = me.id
      JOIN maquinacomponente mc ON me.fkMaquinaComponente = mc.id
      JOIN maquina ma ON mc.fkMaquina = ma.id
      JOIN estabelecimento e ON ma.fkEstabelecimento = e.id
    ${whereClause} ORDER BY a.data DESC;
  `;

  return database.executar(query)
}

module.exports = {
  getAlertsByEstablishmentId,
  getAlertsByMachineId,
  getAlertListWithFilters
}