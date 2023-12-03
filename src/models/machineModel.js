

var database = require('../database/config')

function getMachinesByEstablishmentId(establishmentId) {
  var query = `SELECT
  ms.*,
  COALESCE(alerts.LastHourAlertCount, 0) AS LastHourAlertCount
FROM
  maquina_status ms
LEFT JOIN (
  SELECT
      m.id AS MachineID,
      COUNT(a.id) AS LastHourAlertCount
  FROM
      maquina m
  LEFT JOIN
      maquinacomponente mc ON m.id = mc.fkMaquina
  LEFT JOIN
      metrica met ON mc.id = met.fkMaquinaComponente
  LEFT JOIN
      alerta a ON met.id = a.fkMetrica
  WHERE
      m.fkEstabelecimento = '${establishmentId}'
      AND a.data >= DATEADD(HOUR, -1, GETDATE()) 
  GROUP BY
      m.id
) AS alerts ON ms.maquina_id = alerts.MachineID
WHERE
  ms.fkEstabelecimento = '${establishmentId}';`

  return database.executar(query)
}

function getLastProblemByEstablishmentId(establishmentId) {
  var query = `select * from last_problem where establishment_id = '${establishmentId}'`
  return database.executar(query);
}

function getMetricsByMachineId(machineId) {
  var query = `
  WITH MetricasAjustadas AS (
    SELECT
        m.medicao,
        mc.modelo,
        tc.nome AS tipo_componente,
        DATEADD(HOUR, DATEDIFF(HOUR, 0, m.data), 0) AS hora_original_utc,
        DATEADD(HOUR, DATEDIFF(HOUR, 0, DATEADD(HOUR, -0, m.data)), 0) AS rounded_hour
    FROM
        metrica m
    JOIN
        maquinacomponente mc ON m.fkMaquinaComponente = mc.id
    JOIN
        tipocomponente tc ON mc.fkTipoComponente = tc.id
    WHERE
        m.data >= DATEADD(HOUR, -24, GETDATE()) -- Ajuste a janela de tempo conforme necessário
        AND mc.fkMaquina = '${machineId}' -- Substitua 'sua_machine_id' pelo ID real da máquina
)

SELECT
    modelo,
    tipo_componente,
    hora_original_utc,
    rounded_hour,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY medicao) OVER (PARTITION BY modelo, tipo_componente, rounded_hour) AS median_medicao
FROM
    MetricasAjustadas
ORDER BY
    rounded_hour DESC, modelo, tipo_componente
`    

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