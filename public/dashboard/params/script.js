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

document.getElementById('cpu-attention').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('cpu-attention-value').innerText = value.padStart(2, '0') + '%'
})
document.getElementById('cpu-limit').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('cpu-limit-value').innerText = value.padStart(2, '0') + '%'
})

document.getElementById('memory-attention').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('memory-attention-value').innerText = value.padStart(2, '0') + '%'
})
document.getElementById('memory-limit').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('memory-limit-value').innerText = value.padStart(2, '0') + '%'
})

document.getElementById('disk-attention').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('disk-attention-value').innerText = value.padStart(2, '0') + '%'
})
document.getElementById('disk-limit').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('disk-limit-value').innerText = value.padStart(2, '0') + '%'
})
