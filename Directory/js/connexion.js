// Vérifier si l'utilisateur est déjà connecté
if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "astral.html";
}

// Gestion du formulaire de connexion
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    document.getElementById("error").textContent = '';

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", email);
            window.location.href = "astral.html";
        } else {
            document.getElementById("error").textContent = "✗ " + (data.message || "Identifiants incorrects.");
        }
    } catch (error) {
        document.getElementById("error").textContent = "✗ Erreur serveur. Vérifiez que le serveur est lancé (npm start).";
        console.error('Erreur:', error);
    }
});
