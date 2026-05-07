document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LOGIN-SCHUTZ (Kriterium 2.4) ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; // Schickt unbefugte User zurück
        return;
    }

    // --- 2. LOGOUT-FUNKTION ---
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserId');
            alert("Logging out...");
            window.location.href = 'login.html';
        });
    }

    // --- 3. MODE-SWITCHER (Dunkel/Hell) (Kriterium 2.6) ---
    // Wir fügen den Button dynamisch in den Header ein, damit dein HTML sauber bleibt
    const headerActions = document.querySelector('.header-actions');
    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = "🌓 Mode";
    themeBtn.className = "theme-toggle-btn"; // Style das in deinem CSS
    headerActions.prepend(themeBtn);

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Theme beim Laden wiederherstellen
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // --- 4. HIDE/SHOW MENU (Kriterium 2.5) ---
    const brandToggle = document.getElementById('sidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (brandToggle && sidebarNav) {
        brandToggle.style.cursor = "pointer";
        brandToggle.addEventListener('click', () => {
            sidebarNav.style.display = (sidebarNav.style.display === 'none') ? 'flex' : 'none';
        });
    }
});