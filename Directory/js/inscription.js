if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "astral.html";
}

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    document.getElementById("error").textContent = '';
    document.getElementById("success").textContent = '';
    
    if (password.length < 6) {
        document.getElementById("error").textContent = "Le mot de passe doit contenir au moins 6 caractères.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("error").textContent = "Les mots de passe ne correspondent pas.";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById("success").textContent = "✓ Compte créé avec succès! Redirection vers la connexion...";
            document.getElementById("registerForm").reset();
            setTimeout(() => {
                window.location.href = "connexion.html";
            }, 2000);
        } else {
            document.getElementById("error").textContent = "✗ " + (data.message || "Erreur lors de l'inscription.");
        }
    } catch (error) {
        document.getElementById("error").textContent = "✗ Erreur serveur. Vérifiez que le serveur est lancé (npm start).";
        console.error('Erreur:', error);
    }
});
