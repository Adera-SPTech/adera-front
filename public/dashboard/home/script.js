async function getLastProblem() {
  var res = await fetch(`/machine/problem/${sessionStorage.getItem('establishmentId')}`).then(result => result.json())

  var container = document.getElementById('last-problem')

  if(res != null) {
    container.innerHTML = `
      <span>${res.machineName}</span>
      <button></button>
    `

  } else {
    container.innerHtml = `
    <span>Nenhum Problema encontrado!</span>
    `
  }
}

async function getMachines() {
  document.getElementById('machines-container').innerHTML = ''
  var establishmentId = sessionStorage.getItem('establishmentId')

  const machines = await fetch(`/machine/${establishmentId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  console.log(machines)

  machines.forEach(renderMachine)
}

async function getUnreadAlerts() {
  var establishmentId = sessionStorage.getItem('establishmentId')

  const alerts = await fetch(`/alerts/${establishmentId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  console.log(alerts)
}

function renderMachine(machine, index) {
  const container = document.getElementById('machines-container')
  
  container.innerHTML += `
    <div class="machine">
    <div class="machine-row">
      <span class="title">${machine.machineName}</span>
      <span class="online">${machine.isOnline ? 'online' : 'offline'}</span>
      <span class="disk">Uso do disco: ${machine.diskUsage}</span>
    </div>
    <div class="machine-row">
      <button class="machine-btn">Ir para a máquina</button>
    </div>
  </div>
  `
}

function criarGrafico(ctx, options, dados) {
  var g = new Chart(ctx, options);

  g.data.labels = dados.map(d => d.label.toString())
  g.data.datasets[0].data = dados.map(d => d.dado)
  g.update()

  // Atribui uma função para atualizar o grafico com dados mais recentes
  g.updateDados = function(dados) {
    this.data.labels = dados.map(d => d.label.toString())
    this.data.datasets[0].data = dados.map(d => d.dado)
    this.update()
  }

  return g
}

const g1 = criarGrafico(document.getElementById('grafico1'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'vezes favoritada',
      data: [],
      backgroundColor: [
        '#00ADB5',
        '#AC7DD2'
      ],
      hoverOffset: 4
    }]
  }
}, []);

function updateScreen() {
  getMachines();
  getLastProblem();
}

getMachines()

setInterval(updateScreen, 500)

