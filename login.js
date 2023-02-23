function login() {

    let usernameLogin = document.getElementById('login-username').value;
    let passwordLogin = document.getElementById('login-password').value;

    let authUsername = localStorage.getItem('username');
    let authPassword = localStorage.getItem('password');

    console.log(usernameLogin, passwordLogin);
    console.log(authUsername, authPassword);

    if (usernameLogin == authUsername && passwordLogin == authPassword) {
        console.log('login has been successful!')
        location.href = 'https://planmeal.repl.co/app.html'
    } else {
        console.log('oops, something went wrong!')
        alert('Wrong Credentials Used!')
    };

};

const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', function() {
  login();
});