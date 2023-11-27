const filters = {
  machineId: '',
  startDate: '',
  endDate: '',
  level: '',
}

async function getMachines() {
  var ecId = sessionStorage.getItem('establishmentId')
  var response = await fetch(`/machine/${ecId}`, {method: 'GET'}).then(res => res.json())
  document.getElementById('maquina').innerHTML = '<option selected value="">Todas</option>'
  response.forEach(m => {
    document.getElementById('maquina').innerHTML += `<option value="${m.maquina_id}">${m.nomeMaquina}</option>`
  })
}

getMachines()

async function getAlertsByMachine() {
  var establishmentId = sessionStorage.getItem('establishmentId')
  
  const alerts = await fetch(`/alerts/machine/${machineId}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  }).then(res => res.json())

  console.log(alerts)
  }

const datetimeInput = document.getElementById('datetimeInput');
var fp = flatpickr(datetimeInput, {
  mode: 'range',
  enableTime: true,
  dateFormat: "Y-m-d H:i",
});

datetimeInput.addEventListener('change', handleDateTimeInput);

function handleDateTimeInput() {
  filters.startDate = fp.selectedDates[0] != undefined ? formatDate(fp.selectedDates[0]) : '',
  filters.endDate = fp.selectedDates[1] != undefined ? formatDate(fp.selectedDates[1]) : ''
  searchAlerts()
}

document.getElementById('maquina').addEventListener('change', (e) => {
  filters.machineId = e.target.value
  searchAlerts()
})

document.getElementById('level').addEventListener('change', (e) => {
  filters.level = e.target.value
  searchAlerts()
})

function formatDate(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0')
  var day = date.getDate().toString().padStart(2, '0')
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toFixed(3).toString().padStart(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

async function searchAlerts() {
  document.getElementById('table-body').innerHTML = ''

  var result = await fetch(`/alert/list/${sessionStorage.getItem('establishmentId')}?startDate=${filters.startDate}&endDate=${filters.endDate}&machineId=${filters.machineId}&level=${filters.level}`, {
    method: 'GET'
  }).then(res => res.json())

  result.forEach(renderAlert)
}

function renderAlert(alert) {
  const t = document.getElementById('table-body')
  t.innerHTML += `
    <tr class="alert">
      <td>${alert.nomeMaquina}</td>
      <td>${alert.nivel}</td>
      <td>${new Date(alert.data).toLocaleString('pt-BR')}</td>
      <td>${alert.descricao}</td>
    </tr>`
}

searchAlerts()