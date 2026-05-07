document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LOGIN PROTECTION ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; // Redirect unauthorised users
        return;
    }

    // --- 2. LOGOUT---
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserId');
            alert("Logging out...");
            window.location.href = 'login.html';
        });
    }

    // --- 3. MODE-SWITCHER ---
    // insert the button dynamically into the header so that your HTML stays clean
    const headerActions = document.querySelector('.header-actions');
    const themeBtn = document.createElement('button');
    themeBtn.innerHTML = "🌓 Mode";
    themeBtn.className = "theme-toggle-btn"; // Style in CSS
    headerActions.prepend(themeBtn);

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Restore the theme on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // --- 4. HIDE/SHOW MENU---
    const brandToggle = document.getElementById('sidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');

    if (brandToggle && sidebarNav) {
        brandToggle.style.cursor = "pointer";
        brandToggle.addEventListener('click', () => {
            sidebarNav.style.display = (sidebarNav.style.display === 'none') ? 'flex' : 'none';
        });
    }
});