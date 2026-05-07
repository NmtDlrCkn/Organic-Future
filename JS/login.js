// login.js
/*const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    const usernameInput = document.getElementById('loginUsername').value;
    const passwordInput = document.getElementById('loginPassword').value;

    try {
        // 1. Daten aus der JSON-Datei abrufen (Kriterium 2.1)
        const response = await fetch('../JSON/user.json'); 
        const users = await response.json();

        // 2. Nutzer in der "Datenbank" suchen (Kriterium 2.4)
        const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            // Erfolg: Wir speichern die Nutzer-ID im LocalStorage
            // So weiß das Dashboard später, wer eingeloggt ist
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserId', user.id);
            
            // Weiterleitung zum Dashboard
            window.location.href = '../HTML/user-bord.html';
        } else {
            // Fehleranzeige
            loginError.innerText = "Invalid username or password!";
            loginError.style.color = "red";
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        loginError.innerText = "Error connecting to the database.";
    }
});*/

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    try {
        // 1. Lade die festen User aus der JSON-Datei
        const response = await fetch('../JSON/user.json');
        const jsonUsers = await response.json();

        // 2. Lade die neu registrierten User aus dem LocalStorage
        const localUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // 3. Kombiniere beide Listen zu einer großen "Datenbank"
        const allUsers = [...jsonUsers, ...localUsers];

        // 4. Suche nach dem User
        const user = allUsers.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            // Erfolg! Speichere Login-Status und User-ID
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserId', user.id);
            localStorage.setItem('currentUserName', user.name); // Optional für den Header

            // Weiterleitung zum Dashboard
            window.location.href = '/HTML/user-bord.html';
        } else {
            // Fehleranzeige
            loginError.innerText = "Invalid username or password!";
            loginError.style.color = "red";
        }
    } catch (error) {
        console.error("Login Error:", error);
        loginError.innerText = "Error accessing user data.";
    }
});