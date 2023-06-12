function sendRequest(method, url, token, body = 0, no_json = false) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    var fetch_body = {
        method: method,
        mode: 'cors',
        headers: headers,
    }
    if (body != 0) {
        fetch_body.body = JSON.stringify(body);
    }
    return fetch(url, fetch_body)
        .then(response => {
            if (response.ok) {
                if (no_json) {
                    return response
                }
                return response.json()
            }
            return response.json().then(error => {
                const e = new Error('Что-то пошло не так')
                e.data = error
                throw e
            })
        })
}

if (localStorage.getItem('token') !== null) {
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/auth/my-info'
    sendRequest('GET', requestURL, localStorage.getItem('token'))
        .then(data => {
            if (window.location.pathname == '/reg.html' || window.location.pathname == '/log.html' || window.location.pathname == '/index.html') {
                window.location.href = '/account.html';
            }

            document.getElementById('header').innerHTML = `
                <div class="container">
                    <div class="logo_and_text">
                        <div class="logo">
                            <a href="account.html"><img src="img/logo.svg" alt=""></a>
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
                </div>`;
            document.getElementById('logout_btn').onclick = logout
        })
        .catch(err => {
            localStorage.removeItem('token')
            unauthenticated();
        })
} else {
    unauthenticated();
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
    sendRequest("PUT", requestURL, localStorage.getItem('token'), 0, no_json = true)
        .then(data => {
            console.log(data)
            localStorage.removeItem('token')
            unauthenticated();
        })
}

function clear_popup() {
    document.getElementById('popup_block').innerHTML = '';
    document.getElementById('popup_block').classList.add('dnone')
}

function show_popup(header, content) {
    clear_popup()
    document.getElementById("popup_block").classList.remove('dnone')
    document.getElementById("popup_block").innerHTML = `
    <div class="inner">
        <div class="header">
            <div class="name">
                `+ header + `
            </div>
            <div class="cross" onclick="clear_popup()">
                <img src="img/cross.svg" alt="">
            </div>
        </div>
        <div class="content">
            `+ content + `
        </div>
    </div>
`;
}