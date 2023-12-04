var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

var chartCpu24;
var chartDisk24;
var chartMemory24;
var chartLatency24;

var chartCpu10;
var chartDisk10;
var chartMemory10;
var chartLatency10;

document.getElementById("nome-empresa").innerHTML = sessionStorage.establishmentName;
var dataAtual = new Date();
var horas = dataAtual.getHours();
var minutos = dataAtual.getMinutes();
if (horas < 10) {
  horas = '0' + horas;
}
if (minutos < 10) {
  minutos = '0' + minutos;
}
document.getElementById("relogio").innerHTML = horas + ':' + minutos;

async function getMachine() {
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);
  var machineId = urlParams.get("id")

  var machine = await fetch(`/machine/m/${machineId}`).then(res => res.json())
  console.log(machine)


  document.getElementById('nome-maquina').innerText = machine.name

  var cpu = machine.components.filter(c => c.type === 'CPU')[0]
  document.getElementById('modelo-cpu').innerText = cpu.model
  document.getElementById('desc-cpu').innerText = cpu.desc
  document.getElementById('uso-cpu').innerText = cpu.use + '%'
  
  var mem = machine.components.filter(c => c.type === 'MEMORY')[0]
  document.getElementById('modelo-mem').innerText = mem.model
  document.getElementById('desc-mem').innerText = mem.desc.length <= 31 ? mem.desc : mem.desc.substring(0, 31) + '...'
  document.getElementById('uso-mem').innerText = mem.use + '%'
  
  var disk = machine.components.filter(c => c.type === 'DISK')[0]
  document.getElementById('modelo-disk').innerText = disk.model.length <= 31 ? disk.model : disk.model.substring(0, 31) + '...'
  document.getElementById('desc-disk').innerText = disk.desc.length <= 31 ? disk.desc : disk.desc.substring(0, 31) + '...'
  document.getElementById('uso-disk').innerText = disk.use + '%'

  var network = machine.components.filter(c => c.type === 'NETWORK')[0]
  document.getElementById('modelo-network').innerText = network.model
  document.getElementById('desc-network').innerText = network.desc.length <= 31 ? network.desc : network.desc.substring(0, 31) + '...'
  document.getElementById('ping').innerText = network.use + 'ms'
}

async function getMetrics() {
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);
  
  var options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }

  var machineId = urlParams.get("id")
  
  const metrics = await fetch(`/machine/metrics/${machineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  const metrics10 = await fetch(`/machine/last10/${machineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  var dataCpu24 = groupMetricsByHour(metrics.filter(m => m.tipo_componente === 'CPU'))

  const ctxGrafCpu24 = document.getElementById('graficoCpu24')
  chartCpu24 = createGrafico(ctxGrafCpu24, {
    labels: Array.from({length: 24}, (_, index) => index.toString() + (index == 0 || index == 1 ? " Hora atrás" : " Horas atrás")).reverse(),
    datasets: [{
      label: '% de uso',
      data: dataCpu24.map(d => d.media)
    }]
  });

  var dataDisk24 = groupMetricsByHour(metrics.filter(m => m.tipo_componente === 'DISK'))
  chartDisk24 = createGrafico(document.getElementById('graficoDisk24'), {
    labels: Array.from({length: 24}, (_, index) => index.toString() + (index == 0 || index == 1 ? " Hora atrás" : " Horas atrás")).reverse(),
    datasets: [{
      label: '% de uso',
      data: dataDisk24.map(d => d.media)
    }]
  });
  var dataMemory24 = groupMetricsByHour(metrics.filter(m => m.tipo_componente === 'MEMORY'))
  chartMemory24 = createGrafico(document.getElementById('graficoMemory24'), {
    labels: Array.from({length: 24}, (_, index) => index.toString() + (index == 0 || index == 1 ? " Hora atrás" : " Horas atrás")).reverse(),
    datasets: [{
      label: '% de uso',
      data: dataMemory24.map(d => d.media)
    }]
  });
  var dataLatency24 = groupMetricsByHour(metrics.filter(m => m.tipo_componente === 'NETWORK'))
  chartLatency24 = createGrafico(document.getElementById('graficoLatency24'), {
    labels: Array.from({length: 24}, (_, index) => index.toString() + (index == 0 || index == 1 ? " Hora atrás" : " Horas atrás")).reverse(),
    datasets: [{
      label: 'ping',
      data: dataLatency24.map(d => d.media)
    }]
  }, {
    maintainAspectRatio: false, // Do not maintain aspect ratio
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  });


  var dataCpu10 = metrics10.filter(m => m.tipo_componente === 'CPU')
  chartCpu10 = createGrafico(document.getElementById('graficoCpu10'), {
    labels: Array.from({length: 10}, (_, index) => (index * 2).toString() + "s atrás").reverse(),
    datasets: [{
      label: '% de uso',
      data: dataCpu10.map(d => d.medicao)
    }]
  })
  var dataDisk10 = metrics10.filter(m => m.tipo_componente === 'DISK')
  chartDisk10 = createGrafico(document.getElementById('graficoDisk10'), {
    labels: Array.from({length: 10}, (_, index) => (index * 2).toString() + "s atrás").reverse(),
    datasets: [{
      label: '% de uso',
      data: dataDisk10.map(d => d.medicao)
    }]
  })
  var dataMem10 = metrics10.filter(m => m.tipo_componente === 'MEMORY')
  chartMemory10 = createGrafico(document.getElementById('graficoMemory10'), {
    labels: Array.from({length: 10}, (_, index) => (index * 2).toString() + "s atrás").reverse(),
    datasets: [{
      label: '% de uso',
      data: dataMem10.map(d => d.medicao)
    }]
  })
  var dataLatency10 = metrics10.filter(m => m.tipo_componente === 'NETWORK')
  chartLatency10 = createGrafico(document.getElementById('graficoLatency10'), {
    labels: Array.from({length: 10}, (_, index) => (index * 2).toString() + "s atrás").reverse(),
    datasets: [{
      label: 'ping',
      data: dataLatency10.map(d => d.medicao)
    }]
  }, {
    maintainAspectRatio: false, // Do not maintain aspect ratio
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  })

}

function groupMetricsByHour(metrics) {
  const metricsByHour = new Map();

  const now = new Date()

  // Create an array with the last 24 hours
  const last24Hours = Array.from({ length: 24 }, (_, index) => {
    const hourTimestamp = new Date(now - (index + 3) * 60 * 60 * 1000); // Adjusted index
    return { hour: hourTimestamp.toISOString().substring(0, 13) + ':00:00', media: 0 };
});

  // Populate the map with the last 24 hours
  last24Hours.forEach(entry => metricsByHour.set(entry.hour, entry));

  // Loop through the metrics and add them to the corresponding hour
  metrics.forEach(metric => {
      const timestamp = metric.rounded_hour; // Assuming 'timestamp' is the property name in the result
      const hour = timestamp.substring(0, 13) + ':00:00'; // Extract the hour part from the timestamp

      if (metricsByHour.has(hour)) {
          metricsByHour.get(hour).media = metric.median_medicao
      }
  });
  // Convert the map to an array of objects
  const result = Array.from(metricsByHour.values()).reverse();

  return result;
}
  
async function addCommand(command) {
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);
  var body = {
    command: command,
    machineId: urlParams.get("id")
  }
  await fetch(`/command`, {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})
}


function getMachineId() {
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);

  return urlParams.get("id")
}



function createGrafico(ctx, data, options = {
  maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
}) {
  var g = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });

  // Atribui uma função para atualizar o grafico com dados mais recentes
  g.updateDados = function(dados) {
    this.data.datasets[0].data = dados
    this.update()
  }

  return g
}

async function updateGraficos() {
  var machineId = getMachineId();
  console.log(machineId)

  var data = await fetch(`/machine/metrics/${machineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  var data10 = await fetch(`/machine/last10/${machineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  
  var dataCpu24 = groupMetricsByHour(data.filter(m => m.tipo_componente === 'CPU'))
  var dataMem24 = groupMetricsByHour(data.filter(m => m.tipo_componente === 'MEMORY'))
  var dataDisk24 = groupMetricsByHour(data.filter(m => m.tipo_componente === 'DISK'))
  var dataLatency24 = groupMetricsByHour(data.filter(m => m.tipo_componente === 'NETWORK'))

  var dataCpu10 = data10.filter(d => d.tipo_componente === 'CPU')
  var dataMem10 = data10.filter(d => d.tipo_componente === 'MEMORY')
  var dataDisk10 = data10.filter(d => d.tipo_componente === 'DISK')
  var dataLatency10 = data10.filter(d => d.tipo_componente === 'NETWORK')

  chartCpu24.updateDados(dataCpu24.map(d => d.media))
  chartMemory24.updateDados(dataMem24.map(d => d.media))
  chartDisk24.updateDados(dataDisk24.map(d => d.media))
  chartLatency24.updateDados(dataLatency24.map(d => d.media))

  chartCpu10.updateDados(dataCpu10.map(d => d.medicao))
  chartMemory10.updateDados(dataMem10.map(d => d.medicao))
  chartDisk10.updateDados(dataDisk10.map(d => d.medicao))
  chartLatency10.updateDados(dataLatency10.map(d => d.medicao))
}

setInterval(updateGraficos, 2000)

getMachine()
setInterval(getMachine, 10000)