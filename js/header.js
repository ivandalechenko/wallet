function sendRequest(param) {
    var headers = {
        'Content-Type': 'application/json',
    }
    if (typeof param['token'] !== "undefined") {
        headers['Authorization'] = 'Bearer ' + param.token
    }
    var fetch_body = {
        method: param.method,
        mode: 'cors',
        headers: headers,
    }
    if (typeof param['body'] !== "undefined") {
        fetch_body.body = JSON.stringify(param.body);
    }
    return fetch(param.url, fetch_body)
        .then(response => {
            if (response.ok) {
                if (typeof param['no_json'] !== "undefined") {
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
    param = {
        method: "GET",
        url: 'https://budget-buddy-finance-app.herokuapp.com/auth/my-info',
        token: localStorage.getItem('token')
    }
    sendRequest(param)
        .then(data => {
            if (window.location.pathname == '/reg.html' || window.location.pathname == '/log.html' || window.location.pathname == '/index.html') {
                window.location.href = '/account.html';
            }
            active_list = {}
            if (window.location.pathname == '/account.html') {
                active_list.account = "class='active'";
            } else {
                active_list.account = "";
            }
            if (window.location.pathname == '/cat.html') {
                active_list.cat = "class='active'";
            } else {
                active_list.cat = "";
            }
            if (window.location.pathname == '/stat.html') {
                active_list.stat = "class='active'";
            } else {
                active_list.stat = "";
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
                        <a href="account.html" `+ active_list.account + `>Account</a>
                        <a href="cat.html" `+ active_list.cat + `>Categories</a>
                        <a href="stat.html" `+ active_list.stat + `>Statistic</a>
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
    param = {
        method: "PUT",
        url: 'https://budget-buddy-finance-app.herokuapp.com/auth/log-out',
        token: localStorage.getItem('token'),
        no_json: true,
    }
    sendRequest(param)
        .then(data => {
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