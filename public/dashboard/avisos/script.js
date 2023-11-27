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