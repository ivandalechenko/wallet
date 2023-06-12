function closeAllPopup() {
    var popups = document.getElementsByClassName('popup');
    for (var i = 0; i < popups.length; i++) {
        popups[i].classList.add('dnone');
    }
}
var crosses = document.getElementsByClassName('cross');
for (var i = 0; i < crosses.length; i++) {
    crosses[i].onclick = closeAllPopup;
}

var cat_infos = document.getElementsByClassName('cat_info');
for (var i = 0; i < cat_infos.length; i++) {
    cat_infos[i].onclick = function () {
        closeAllPopup()
        document.getElementById('account_info_popup').classList.remove('dnone');
    };
}

document.getElementById('add_cat_btn').onclick = function () {
    closeAllPopup()
    document.getElementById('add_account_popup').classList.remove('dnone');
};


document.getElementById('add_card_btn').onclick = function () {
    closeAllPopup()
    document.getElementById('add_card_popup').classList.remove('dnone');
};

document.getElementById('add_wallet_btn').onclick = function () {
    closeAllPopup()
    document.getElementById('account_add_popup').classList.remove('dnone');
};


document.getElementById("dd").onclick = function () {
    document.getElementById("dd").classList.toggle("active")
    document.getElementById("dd_block").classList.toggle("dnone")
}


function get_accounts() {
    console.log(localStorage.getItem('token'));
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/accounts/for-current-user'
    sendRequest("GET", requestURL, localStorage.getItem('token'))
        .then(data => {
            document.getElementById('total_balance').innerHTML = "UAH " + data.totalBalance + ".00"
            document.getElementById('accounts').innerHTML = `<h1>Accounts</h1>`;
            data.accounts.forEach(function (item, i, data) {
                document.getElementById('accounts').innerHTML += `
                    <div class="account_element">
                        <div class="info">
                            <div class="ico_and_name">
                                <div class="ico color_`+ item.type + `">
                                    <img src="img/account_type_`+ item.type + `.svg" alt="">
                                </div>
                                <div class="name">
                                    `+ item.name + `
                                </div>
                            </div>
                            <div class="type">
                                `+ item.type + `
                            </div>
                            <div class="count">
                                <div class="text">
                                    UAH `+ item.balance + `.00
                                </div>
                                <button class="cat_info">
                                    <img src="img/btn_doc.svg">
                                </button>
                                </button>
                                <button>
                                    <img src="img/btn_edit.svg">
                                </button>
                                <button>
                                    <img src="img/btn_del.svg">
                                </button>
                            </div>
                        </div>
                    </div>`;

                console.log(item)
            })
        })
}

get_accounts()