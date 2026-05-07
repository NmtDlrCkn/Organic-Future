const registerForm = document.getElementById('registerForm');
const registerError = document.getElementById('registerError');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevents the page from reloading

    // 1. Werte aus den Feldern holen
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const password = document.getElementById('password').value;

    //  VALIDATION OF INPUT ---

    // Email-Format examination (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("Please enter a valid email format!");
        return;
    }

    // Check required fields
    if (firstName.length < 2 || lastName.length < 2) {
        showError("First and Last name must be at least 2 characters long.");
        return;
    }

    // --- MANUFACTURING & UNIQUENESS ---
    // retrieve the users who have already registered from LocalStorage
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Checks whether the username or email address already exists (unique check)
    const userExists = users.find(u => u.username === username || u.email === email);
    if (userExists) {
        showError("Username or Email already registered!");
        return;
    }

    // Create a new user
    const newUser = {
        id: "EMP" + Math.floor(1000 + Math.random() * 9000), // Generated example EMP4921
        username: username,
        email: email,
        name: firstName + " " + lastName,
        password: password
    };

    // Save to LocalStorage
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    //Redirecting to the login page
    alert("Registration successful! Your ID is: " + newUser.id);
    window.location.href = '../login.html';
});

// Error message function
function showError(message) {
    registerError.innerText = message;
    registerError.style.color = "#ff4b2b";
}