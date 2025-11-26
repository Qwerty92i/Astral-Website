// Charger la position actuelle de l'ISS
fetch('https://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(data => {
        const lat = data.iss_position.latitude;
        const lon = data.iss_position.longitude;
        const time = new Date(data.timestamp * 1000).toLocaleString();

        document.getElementById('iss-lat').textContent = lat;
        document.getElementById('iss-lon').textContent = lon;
        document.getElementById('iss-time').textContent = time;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('iss-info').textContent =
            "Impossible de charger la position de l'ISS.";
    });
