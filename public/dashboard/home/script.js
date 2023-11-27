async function getLastProblem() {
  var res = await fetch(`/machine/problem/${sessionStorage.getItem('establishmentId')}`).then(result => result.json())

  var container = document.getElementById('last-problem')

  if(res.machine_name != undefined) {
    container.innerHTML = `
      <span style="font-size: 32px;">${res.machine_name}</span> <br>
      <button onclick="" class="machine-btn" style="padding: .5rem 1rem">Detalhes</button>
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
      <span class="disk">Uso do disco: ${machine.diskUsage}</span>
    </div>
    <div class="machine-row">
      <button class="machine-btn" onclick="${(e) => selectMachine(e)}">Ir para a máquina</button>
    </div>
  </div>
  `
}

function selectMachine(e) {
  console.log(e)
}

function updateScreen() {
  getMachines();
  getLastProblem();
}

getMachines()
getLastProblem()

// setInterval(updateScreen, 2000)

