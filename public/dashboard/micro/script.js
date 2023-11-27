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

    var machineId = urlParams.get("id")
  
    const metrics = await fetch(`/machine/metrics/${machineId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  
    console.log(metrics)
  }
  