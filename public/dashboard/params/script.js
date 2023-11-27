async function putParameters() {
    var establishmentId = sessionStorage.getItem('establishmentId')
    
    const parameters = await fetch(`/parameters/${establishmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            autoRestart : autoRestart.value ,
            restartPeriodico : restartPeriodico.value ,
            horaRestart : horaRestart.value ,
            cpuAtencao : cpuAtencao.value ,
            ramAtencao : ramAtencao.value ,
            diskAtencao : diskAtencao.value ,
            latencyAtencao : latencyAtencao.value ,
            cpuLimite : cpuLimite.value ,
            ramLimite : ramLimite.value ,
            diskLimite : diskLimite.value ,
            latencyLimite : latencyLimite.value 
        })
    }).then(res => res.json())
  
    console.log(parameters)
  }

  async function getParameters() {
    var establishmentId = sessionStorage.getItem('establishmentId')
    
    const parameters = await fetch(`/parameters/${establishmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
  
    console.log(parameters)
  }