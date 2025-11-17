document.addEventListener('DOMContentLoaded', function () {
    // Sandwich
    var btn = document.querySelector('.nav-toggle');
    var panel = document.getElementById('nav-panel');
    if (btn && panel) {
        function setState(open) {
            if (open) {
                panel.classList.add('open');
                panel.setAttribute('aria-hidden', 'false');
                btn.setAttribute('aria-expanded', 'true');
            } else {
                panel.classList.remove('open');
                panel.setAttribute('aria-hidden', 'true');
                btn.setAttribute('aria-expanded', 'false');
            }
        }
        btn.addEventListener('click', function () { setState(!panel.classList.contains('open')); });
        panel.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) setState(false); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setState(false); });
    }

    // Carte
    var cards = Array.prototype.slice.call(document.querySelectorAll('.presentation-card'));
    if (cards.length) {
        cards.forEach(function (card) {
            var modalId = card.getAttribute('data-modal') || card.getAttribute('aria-controls') || 'presentation-modal-1';
            var modalEl = document.getElementById(modalId);
            if (!modalEl) return;
            var closeBtn = modalEl.querySelector('.modal-close');

            function openModal() {
                modalEl.hidden = false;
                modalEl.setAttribute('aria-hidden', 'false');
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                if (closeBtn) closeBtn.focus();
            }

            function closeModal() {
                modalEl.hidden = true;
                modalEl.setAttribute('aria-hidden', 'true');
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                card.focus();
            }

            card.addEventListener('click', openModal);
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            modalEl.addEventListener('click', function (e) { if (e.target === modalEl) closeModal(); });
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modalEl.hidden) closeModal(); });
        });
    }

    // Login
    var logoutBtn = document.getElementById('logout');
    var userEl = document.getElementById('user');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'connexion.html';
        });
    }
    if (userEl) {
        userEl.textContent = localStorage.getItem('username') || '';
    }
});
