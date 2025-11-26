console.log('Script chargé');

const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.getElementById('nav-panel');

if (navToggle && navPanel) {
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navPanel.setAttribute('aria-hidden', isExpanded);
    });
}

const soleilBtn = document.getElementById('soleilBtn');
const soleilModal = document.getElementById('soleilModal');
const closeSoleilModal = document.getElementById('closeSoleilModal');

console.log('soleilBtn:', soleilBtn);
console.log('soleilModal:', soleilModal);

if (soleilBtn && soleilModal) {
    soleilBtn.addEventListener('click', function(e) {
        console.log('Clic sur Soleil!');
        e.preventDefault();
        e.stopPropagation();
        soleilModal.style.display = 'block';
    });
}

const marsBtn = document.getElementById('marsBtn');
const marsModal = document.getElementById('marsModal');
const closeMarsModal = document.getElementById('closeMarsModal');

console.log('marsBtn:', marsBtn);
console.log('marsModal:', marsModal);

if (marsBtn && marsModal) {
    marsBtn.addEventListener('click', function(e) {
        console.log('Clic sur Mars!');
        e.preventDefault();
        e.stopPropagation();
        marsModal.style.display = 'block';
    });
}

if (closeSoleilModal) {
    closeSoleilModal.addEventListener('click', function() {
        soleilModal.style.display = 'none';
    });
}

if (closeMarsModal) {
    closeMarsModal.addEventListener('click', function() {
        marsModal.style.display = 'none';
    });
}

const terreBtn = document.getElementById('terreBtn');
const terreModal = document.getElementById('terreModal');
const closeTerreModal = document.getElementById('closeTerreModal');

console.log('terreBtn:', terreBtn);
console.log('terreModal:', terreModal);

if (terreBtn && terreModal) {
    terreBtn.addEventListener('click', function(e) {
        console.log('Clic sur Terre!');
        e.preventDefault();
        e.stopPropagation();
        terreModal.style.display = 'block';
    });
}

if (closeTerreModal) {
    closeTerreModal.addEventListener('click', function() {
        terreModal.style.display = 'none';
    });
}

window.addEventListener('click', function(event) {
    if (event.target === terreModal && terreModal) {
        terreModal.style.display = 'none';
    }
});


window.addEventListener('click', function(event) {
    if (event.target === soleilModal && soleilModal) {
        soleilModal.style.display = 'none';
    }
    if (event.target === marsModal && marsModal) {
        marsModal.style.display = 'none';
    }
});
