

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

function getLast10(machineID) {
  var query = `
      WITH MetricasNumeradas AS (
        SELECT
            m.id AS metrica_id,
            m.medicao,
            m.data,
            m.alertado,
            mc.id AS maquina_componente_id,
            mc.modelo,
            mc.descricao,
            mc.capacidade,
            mc.ativo,
            tc.nome AS tipo_componente,
            ROW_NUMBER() OVER (PARTITION BY mc.id ORDER BY m.data DESC) AS row_num
        FROM
            metrica m
            INNER JOIN maquinacomponente mc ON m.fkMaquinaComponente = mc.id
            INNER JOIN tipocomponente tc ON mc.fkTipoComponente = tc.id
        WHERE
            mc.fkMaquina = 'E1B3E600-EF7C-11ED-9ACF-927A4326EF00'
    )
    SELECT
        metrica_id,
        medicao,
        data,
        alertado,
        maquina_componente_id,
        modelo,
        descricao,
        capacidade,
        ativo,
        tipo_componente
    FROM
        MetricasNumeradas
    WHERE
        row_num <= 10;
  `

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

async function getMachine(machineId) {
  var queryMachine = `SELECT * FROM maquina WHERE id = '${machineId}'`

  var machine = {
    id: '',
    name: '',
    components: []
  }

  await database.executar(queryMachine)
    .then(result => {
      machine.id = result[0].id
      machine.name = result[0].nomeMaquina
    })

  var queryComponent = `SELECT mc.modelo, mc.descricao, m.medicao, t.nome as tipo FROM maquinacomponente mc 
                          JOIN metrica m ON mc.id = m.fkMaquinaComponente 
                          JOIN tipocomponente t ON mc.fkTipoComponente = t.id 
                        WHERE 
                          mc.fkMaquina = '${machineId}' AND 
                          m.data = (SELECT MAX(data) FROM metrica WHERE fkMaquinaComponente = mc.id);`

  await database.executar(queryComponent)
    .then(result => {
      result.forEach(c => {
        var comp = {
          model: c.modelo,
          desc: c.descricao,
          use: c.medicao,
          type: c.tipo
        }

        machine.components.push(comp)
      })
    })

  return machine
}

module.exports = {
  getMachinesByEstablishmentId,
  getLastProblemByEstablishmentId,
  getMetricsByMachineId,
  lastMetrics,
  getMachine,
  getLast10
}