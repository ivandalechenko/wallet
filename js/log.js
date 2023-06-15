document.getElementById('btn_login').onclick = () => {
    param = {
        method: "POST",
        url: 'https://budget-buddy-finance-app.herokuapp.com/auth/log-in',
        body: {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        },
    }
    sendRequest(param)
        .then(data => {
            localStorage.setItem('token', data['token'])
            window.location.href = '/account.html';
        })
        .catch(err => {
            document.getElementById('btn_login').innerHTML = 'Wrong password or email';
            console.log(err)
            setTimeout(() => { document.getElementById('btn_login').innerHTML = 'Login'; }, 5000)
        })
}
