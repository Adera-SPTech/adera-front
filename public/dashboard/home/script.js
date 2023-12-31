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

async function getLastProblem() {
  var res = await fetch(`/machine/problem/${sessionStorage.getItem('establishmentId')}`).then(result => result.json())

  var container = document.getElementById('last-problem')

  if(res.machine_name != undefined) {
    container.innerHTML = `
      <span style="font-size: 32px;">${res.machine_name}</span> <br>
      <button class="machine-btn" style="padding: .5rem 1rem" onclick="selectMachine('${res.machine_id}')">Detalhes</button>
    `

  } else {
    container.innerHTML = `
    <span style="font-size: 32px">Nenhum Problema encontrado!</span>
    `
  }
}

async function getMachines() {
  var establishmentId = sessionStorage.getItem('establishmentId')

  const machines = await fetch(`/machine/${establishmentId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())

  console.log(machines)

  document.getElementById('machines-container').innerHTML = ''
  machines.forEach(renderMachine)

  var online = machines.filter(machine => machine.isOnline).length
  document.getElementById('maquinas-online').innerText = online
  document.getElementById('maquinas-total').innerText = machines.length

}

function renderMachine(machine, index) {
  const container = document.getElementById('machines-container')
  
  container.innerHTML += `
    <div class="machine">
    <div class="machine-row">
      <span class="title">${machine.nomeMaquina}</span>
      <span class="online">${machine.isOnline ? 'online' : 'offline'}</span>
      <span class="disk">Alertas última hora: ${machine.LastHourAlertCount}</span>
    </div>
    <div class="machine-row">
      <button class="machine-btn" onclick="selectMachine('${machine.maquina_id}')">Ir para a máquina</button>
    </div>
  </div>
  `
}

function selectMachine(id) {
  console.log(id)
  window.location.href = `../micro/index.html?id=${id}`
}

function updateScreen() {
  getMachines();
  getLastProblem();
}

getMachines()
getLastProblem()

// setInterval(updateScreen, 2000)

