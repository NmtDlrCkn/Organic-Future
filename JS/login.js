const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    try {
        // 1. Load the fixed users from the JSON file
        const response = await fetch('../JSON/user.json');
        const jsonUsers = await response.json();

        // 2. Load the newly registered users from LocalStorage
        const localUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // 3. Combine both lists into one large DB
        const allUsers = [...jsonUsers, ...localUsers];

        // 4. Search for the user
        const user = allUsers.find(u => u.username === usernameInput && u.password === passwordInput);

        if (user) {
            // Save login status and user ID
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserId', user.id);
            localStorage.setItem('currentUserName', user.name);

            // Redirect to the dashboard
            window.location.href = '/user-bord.html';
        } else {
            // Error message
            loginError.innerText = "Invalid username or password!";
            loginError.style.color = "red";
        }
    } catch (error) {
        console.error("Login Error:", error);
        loginError.innerText = "Error accessing user data.";
    }
});