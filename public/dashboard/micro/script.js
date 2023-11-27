var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

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
  
  console.log(metrics)

  var dataCpu24 = calculateHourlyAverages(metrics.filter(m => m.tipo === 'CPU'))
  console.log(dataCpu24)

  const ctxGrafCpu24 = document.getElementById('graficoCpu24')
  var chartCpu24 = createGrafico(ctxGrafCpu24, {
    labels: dataCpu24.entries,
    datasets: [{
      label: 'Média do uso da CPU nas ultimas 24 horas',
      data: dataCpu24
    }]
  }, options);

  var dataDisk24 = calculateHourlyAverages(metrics.filter(m => m.tipo === 'DISK'))
  var chartDisk24 = createGrafico(document.getElementById('graficoDisk24'), {
    labels: dataDisk24.entries,
    datasets: [{
      label: 'Média do uso do disco nas ultimas 24 horas',
      data: dataDisk24
    }]
  }, options);
  var dataMemory24 = calculateHourlyAverages(metrics.filter(m => m.tipo === 'MEMORY'))
  var chartMemory24 = createGrafico(document.getElementById('graficoMemory24'), {
    labels: dataMemory24.entries,
    datasets: [{
      label: 'Média do uso de memoria nas ultimas 24 horas',
      data: dataMemory24
    }]
  }, options);
  var dataLatency24 = calculateHourlyAverages(metrics.filter(m => m.tipo === 'LATENCY'))
  var chartMemory24 = createGrafico(document.getElementById('graficoLatency24'), {
    labels: dataLatency24.entries,
    datasets: [{
      label: 'Média do uso de memoria nas ultimas 24 horas',
      data: dataLatency24
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





  const metricaUltimaHora = await fetch(`/machine/last-metrics/${machineId}`).then(res => res.json())

}
  

async function getMachine() {
  const myKeyValues = window.location.search;
  const urlParams = new URLSearchParams(myKeyValues);

  var machineId = urlParams.get("id")
}



function createGrafico(ctx, data, options) {
  return new Chart(ctx,
    {
      type: 'line',
      data: data,
      options: options
    }
  )
}

function calculateHourlyAverages(data) {
  // Create an object to store values for each hour
  const hourGroups = {};

  // Populate the hourGroups object
  data.forEach(entry => {
    const hour = new Date(entry.DataMetrica).getHours();
    if (!hourGroups[hour]) {
      hourGroups[hour] = [];
    }
    hourGroups[hour].push(entry.MedicaoMetrica);
  });

  console.log(hourGroups)

  // Calculate the average for each hour (considering all 24 hours)
  const averages = {};
  for (let hour = 1; hour <= 24; hour++) {
    const values = hourGroups[hour] || []; // If no values for the hour, use an empty array
    const sum = values.reduce((acc, val) => acc + val, 0);
    averages[hour] = values.length > 0 ? sum / values.length : 0; // Prevent division by zero
  }

  return averages;
}

function calculateHourAverages(data) {
}