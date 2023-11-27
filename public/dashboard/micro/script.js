
async function getMetrics() {
    var machineId = sessionStorage.getItem('machineId')
  
    const metrics = await fetch(`/machine/metrics/${machineId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
  
    console.log(metrics)
  }
  