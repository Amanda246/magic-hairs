const loginForm = document.getElementById('login');
const errorMessage = document.getElementById('error');

// Set login attempt to 0
let loginAttempts = 0;

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the account exists and the password matches
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = "products.html"; // If they user and password match go to the login page
    } else {
        loginAttempts++;
        errorMessage.textContent = `Invalid username or password. Attempt ${loginAttempts}/3`; // If they don't match add 1 attempt and show error message.

        // go to error page after 3 failed attempts
        if (loginAttempts >= 3) {
            window.location.href = "error.html"; 
        }
    }
});

