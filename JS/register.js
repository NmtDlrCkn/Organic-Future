/*document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorBox = document.getElementById("registerError");

    errorBox.textContent = "";

    // empty check
    if (!username || !email || !firstName || !lastName || !password) {
      errorBox.textContent = "All fields are required!";
      return;
    }

    // email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      errorBox.textContent = "Invalid email format!";
      return;
    }

    // password length check
    const strongPassword = /^(?=.*[A-Z])(?=.*\d).{9,}$/;

    if (!strongPassword.test(password)) {
        alert("Password must contain at least 3 uppercase letter and 5 number!");
        return;
    }

    // get users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // duplicate check
    const exists = users.some(
      u => u.username === username || u.email === email
    );

    if (exists) {
      errorBox.textContent = "Username or Email already exists!";
      return;
    }

    // save user
    const newUser = {
      username,
      email,
      firstName,
      lastName,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "login.html";
  });

});*/

const registerForm = document.getElementById('registerForm');
const registerError = document.getElementById('registerError');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    // 1. Werte aus den Feldern holen
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const password = document.getElementById('password').value;

    // --- KRITERIUM 2.3: VALIDIERUNG DER EINGABEN ---

    // Email-Format prüfen (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("Please enter a valid email format!");
        return;
    }

    // Pflichtfelder prüfen (schon durch 'required' im HTML, aber gut für JS-Validierung)
    if (firstName.length < 2 || lastName.length < 2) {
        showError("First and Last name must be at least 2 characters long.");
        return;
    }

    // --- KRITERIUM 2.2 & 2.4: VERARBEITUNG & EINZIGARTIGKEIT ---

    // Wir holen die bereits registrierten User aus dem LocalStorage
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Prüfen, ob Username oder Email schon existieren (Unique Check)
    const userExists = users.find(u => u.username === username || u.email === email);
    if (userExists) {
        showError("Username or Email already registered!");
        return;
    }

    // Neuen User erstellen
    const newUser = {
        id: "EMP" + Math.floor(1000 + Math.random() * 9000), // Generiert z.B. EMP4921
        username: username,
        email: email,
        name: firstName + " " + lastName,
        password: password
    };

    // Im LocalStorage speichern
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Erfolg! Weiterleitung zum Login
    alert("Registration successful! Your ID is: " + newUser.id);
    window.location.href = '../HTML/login.html';
});

// Hilfsfunktion für Fehlermeldungen
function showError(message) {
    registerError.innerText = message;
    registerError.style.color = "#ff4b2b";
}