const map = L.map('iss-map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [40, 40], 
    });

    const issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);

    function updateISS() {
        fetch('http://api.open-notify.org/iss-now.json')
            .then(response => response.json())
            .then(data => {
                const lat = parseFloat(data.iss_position.latitude);
                const lon = parseFloat(data.iss_position.longitude);
                const time = new Date(data.timestamp * 1000).toLocaleString();

                document.getElementById('iss-lat').textContent = lat.toFixed(4);
                document.getElementById('iss-lon').textContent = lon.toFixed(4);
                document.getElementById('iss-time').textContent = time;
                issMarker.setLatLng([lat, lon]);

            })
            .catch(error => {
                console.error(error);
                document.getElementById('iss-info').textContent =
                    "Impossible de charger la position de l'ISS.";
            });
    }
    updateISS();
    setInterval(updateISS, 5000);

