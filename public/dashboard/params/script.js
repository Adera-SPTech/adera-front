document.getElementById("nome-empresa").innerHTML =
  sessionStorage.establishmentName;
var dataAtual = new Date();
var horas = dataAtual.getHours();
var minutos = dataAtual.getMinutes();
if (horas < 10) {
  horas = "0" + horas;
}
if (minutos < 10) {
  minutos = "0" + minutos;
}

document.getElementById("relogio").innerHTML = horas + ":" + minutos;

document.getElementById("cpu-attention").addEventListener("input", function () {
  var value = this.value;
  document.getElementById("cpu-attention-value").innerText =
    value.padStart(2, "0") + "%";
});
document.getElementById("cpu-limit").addEventListener("input", function () {
  var value = this.value;
  document.getElementById("cpu-limit-value").innerText =
    value.padStart(2, "0") + "%";
});

document
  .getElementById("memory-attention")
  .addEventListener("input", function () {
    var value = this.value;
    document.getElementById("memory-attention-value").innerText =
      value.padStart(2, "0") + "%";
  });
document.getElementById("memory-limit").addEventListener("input", function () {
  var value = this.value;
  document.getElementById("memory-limit-value").innerText =
    value.padStart(2, "0") + "%";
});

document
  .getElementById("disk-attention")
  .addEventListener("input", function () {
    var value = this.value;
    document.getElementById("disk-attention-value").innerText =
      value.padStart(2, "0") + "%";
  });
document.getElementById("disk-limit").addEventListener("input", function () {
  var value = this.value;
  document.getElementById("disk-limit-value").innerText =
    value.padStart(2, "0") + "%";
});

async function getParameters() {
  var establishmentId = sessionStorage.establishmentId;

  const params = await fetch(`/parameters/${establishmentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  var stringDataHora = params.horaRestart;
  var dataHora = new Date(stringDataHora);
  var horas = dataHora.getUTCHours();
  var minutos = dataHora.getUTCMinutes();
  if (horas < 10) {
    horas = "0" + horas;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  var horaFormatada = horas + ':' + minutos;

  document.getElementById("allowAutoRestart").checked = params.autoRestart;
  document.getElementById("allowPeriodicalRestart").checked = params.restartPeriodico;
  document.getElementById("restartTime").value = horaFormatada;
  document.getElementById("cpu-attention").value = params.cpuAtencao;
  document.getElementById("cpu-limit").value = params.cpuLimite;
  document.getElementById("memory-attention").value = params.ramAtencao;
  document.getElementById("memory-limit").value = params.ramLimite;
  document.getElementById("disk-attention").value = params.diskAtencao;
  document.getElementById("disk-limit").value = params.diskLimite;
  document.getElementById("latency-attention").value = params.latencyAtencao;
  document.getElementById("latency-limit").value = params.latencyLimite;
  document.getElementById("cpu-attention-value").innerHTML = params.cpuAtencao + "%";
  document.getElementById("cpu-limit-value").innerHTML = params.cpuLimite + "%";
  document.getElementById("memory-attention-value").innerHTML = params.ramAtencao + "%";
  document.getElementById("memory-limit-value").innerHTML = params.ramLimite + "%";
  document.getElementById("disk-attention-value").innerHTML = params.diskAtencao + "%";
  document.getElementById("disk-limit-value").innerHTML = params.diskLimite + "%";

  console.log(params);
}
document.getElementById("restartTime").addEventListener('onchange' , (e) => console.log(e.target.value))

async function putParameters() {
  var establishmentId = sessionStorage.establishmentId;
  console.log(document.getElementById("restartTime").value)
  var data = new Date(document.getElementById("restartTime").value)

  var update = {
  autoRestart : document.getElementById("allowAutoRestart").checked,
  restartPeriodico : document.getElementById("allowPeriodicalRestart").checked,
  restartTime :  `${document.getElementById("restartTime").value}:00`,
  cpuAttention : document.getElementById("cpu-attention").value,
  cpuLimit : document.getElementById("cpu-limit").value,
  memoryAttention : document.getElementById("memory-attention").value,
  memoryLimit : document.getElementById("memory-limit").value,
  diskAttention : document.getElementById("disk-attention").value,
  diskLimit : document.getElementById("disk-limit").value,
  latencyAttention : document.getElementById("latency-attention").value,
  latencyLimit : document.getElementById("latency-limit").value
  }

  console.log(update)

  const params = await fetch(`/parameters/${establishmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update)
  }).then();
}