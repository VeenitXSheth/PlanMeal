
function signup() {

    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    console.log(localStorage.getItem("username"))
    console.log(localStorage.getItem("password"))

    const d = new Date();
    let creationDate = d.getTime();

    localStorage.setItem("creationDate", creationDate)

    let newsletterPreference = document.querySelector('#signup-newsletter').checked;
    console.log(newsletterPreference);

    localStorage.setItem("newsletterPreference", newsletterPreference);

    location.href = 'https://planmeal.repl.co/app.html'

};

const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', function() {
    signup();
});

let showPasswordBtn = document.querySelector('#signup-password-icon');
showPasswordBtn.addEventListener('click', function() {
    
    var passwordField = document.getElementById('signup-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        showPasswordBtn.innerText = 'lock_open';
    } else {
        passwordField.type = 'password';
        showPasswordBtn.innerText = 'lock';
    };
});

const goToLoginBtn = document.getElementById('signup-switch');
goToLoginBtn.addEventListener('click', function() {
    location.href = 'https://planmeal.repl.co/login.html';
});


