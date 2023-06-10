function sendRequest(method, url, token, body = null) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    var fetch_body = {
        method: method,
        // mode: 'cors',
        headers: headers,
    }
    // if (body != null) {
    //     fetch_body.body = JSON.stringify(body);
    // }
    return fetch(url, fetch_body)
        .then(response => {
            if (response.ok) {
                return response
            }
            return response.json().then(error => {
                const e = new Error('Что-то пошло не так')
                e.data = error
                throw e
            })
        })
}

if (localStorage.getItem('token') !== null) {
    // console.log(localStorage.getItem('token'));
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/auth/my-info'
    sendRequest('GET', requestURL, localStorage.getItem('token'))
        .then(data => {
            if (window.location.pathname == '/reg.html' || window.location.pathname == '/log.html') {
                window.location.href = '/account.html';
            }
            document.getElementById('header').innerHTML = `
                <div class="container">
                    <div class="logo_and_text">
                        <div class="logo">
                            <a href="index.html"><img src="img/logo.svg" alt=""></a>
                        </div>
                        <div class="text">
                            BudgetBuddy
                        </div>
                    </div>
                    <div class="links">
                        <a href="account.html" class="active">Account</a>
                        <a href="cat.html">Categories</a>
                        <a href="stat.html">Statistic</a>
                    </div>
                    <div class="user">
                        <div class="img">
                            <img src="img/user.jpg" alt="">
                        </div>
                        <div class="name">
                            <a href="#">`+ data.username + `</a>
                        </div>
                        <div class="arrow">
                            <img id="logout_btn" src="img/logout.svg">
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('logout_btn').onclick = logout
        })
        .catch(err => {
            unauthenticated();
            // console.log(err)
        })
} else {
    unauthenticated();
    // console.log("unauthenticated")
}
function unauthenticated() {
    if (window.location.pathname != '/reg.html' && window.location.pathname != '/log.html') {
        window.location.href = '/reg.html';
    }

    document.getElementById('header').innerHTML = `
        <div class="container">
            <div class="logo_and_text">
                <div class="logo">
                    <a href="index.html"><img src="img/logo.svg" alt=""></a>
                </div>
                <div class="text">
                    BudgetBuddy
                </div>
            </div>
        </div>
    `;
}
function logout() {
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/auth/log-out'
    sendRequest("PUT", requestURL, localStorage.getItem('token'))
        .then(data => {
            // console.log(data)
            localStorage.removeItem('token')
            unauthenticated();
        })
        .catch(err => {
            console.log('err')
        })
}