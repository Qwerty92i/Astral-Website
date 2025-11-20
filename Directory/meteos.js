const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=dhSXcgCqYDxJ9Q66jOh4maBANfauunwzDiMH0FdW';

const loadingEl = document.getElementById('neos-loading');
const errorEl   = document.getElementById('neos-error');
const listEl    = document.getElementById('neos-list');

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Réponse réseau non OK : ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    loadingEl.style.display = 'none';
    listEl.innerHTML = '';

    const neos = data.near_earth_objects || [];

    if (neos.length === 0) {
      errorEl.style.display = 'block';
      errorEl.textContent = "Aucun astéroïde à afficher pour le moment.";
      return;
    }

    neos.slice(0, 6).forEach(neo => {
      const li = document.createElement('li');
      li.className = 'neo-card';

      const name = neo.name;
      const hazardous = neo.is_potentially_hazardous_asteroid;

      const kmData = neo.estimated_diameter.kilometers;
      const minDiam = kmData.estimated_diameter_min;
      const maxDiam = kmData.estimated_diameter_max;
      const avgDiam = (minDiam + maxDiam) / 2;

      const nameEl = document.createElement('div');
      nameEl.className = 'neo-name';
      nameEl.textContent = name;

      const sizeEl = document.createElement('div');
      sizeEl.className = 'muted';
      sizeEl.textContent = 
        `Diamètre moyen ≈ ${avgDiam.toFixed(3)} km (min ${minDiam.toFixed(3)} – max ${maxDiam.toFixed(3)} km)`;

      const chip = document.createElement('span');
      chip.className = 'neo-chip ' + (hazardous ? 'danger' : 'safe');
      chip.textContent = hazardous ? 'Potentiellement dangereux' : 'Pas jugé dangereux';

      li.appendChild(nameEl);
      li.appendChild(sizeEl);
      li.appendChild(chip);

      listEl.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Erreur NEO NASA:', error);
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.textContent = "Impossible de charger les données des astéroïdes pour le moment.";
  });
