const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/auth/log-in'

function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/json'
    }

    return fetch(url, {
        method: method,
        mode: 'cors',
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }

        return response.json().then(error => {
            const e = new Error('Что-то пошло не так')
            e.data = error
            throw e
        })
    })
}


document.getElementById('btn_login').onclick = () => {
    sendRequest('POST', requestURL, {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
        // email: "someuser@unik",
        // password: "p@r0LL1ng"
    })
        .then(data => {
            localStorage.setItem('token', data['token'])
            window.location.href = '/account.html';
        })
        .catch(err => {
            document.getElementById('btn_login').innerHTML = 'Wrong password or email';
            setTimeout(() => { document.getElementById('btn_login').innerHTML = 'Login'; }, 5000)
        })
}

