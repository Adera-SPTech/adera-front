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