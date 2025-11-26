// Charger les données des lancements SpaceX
fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query: {},
        options: { limit: 5, sort: { "date_utc": "desc" } }
    })
})
.then(response => response.json())
.then(data => {
    const missionsDiv = document.getElementById("missions");
    missionsDiv.innerHTML = "";
    data.docs.forEach(launch => {
        missionsDiv.innerHTML += `
            <div class="mission-item">
                <h2>${launch.name}</h2>
                <p><strong>Date :</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
                <p><strong>Succès :</strong> ${launch.success === null ? "Non encore" : (launch.success ? "Oui" : "Non")}</p>
                <p><strong>Numéro de vol :</strong> ${launch.flight_number}</p>
                ${launch.links.webcast ? `<p><a href="${launch.links.webcast}" target="_blank">🎥 Regarder le lancement</a></p>` : ""}
            </div>
        `;
    });
})
.catch(error => {
    document.getElementById("missions").innerHTML = "<p>❌ Impossible de charger les données SpaceX.</p>";
    console.error(error);
});
