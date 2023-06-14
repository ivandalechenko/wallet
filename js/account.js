document.getElementById('btn_add_account').onclick = function () {
    show_popup("ADD ACCOUNT", `
        <div class="add_account">
            <div class="element" id="add_card_btn">
                <img src="img/bank_sync.png" alt="">
                <div class="name">
                    Bank Sync
                </div>
                <div class="desc">
                    Connect your monobank accounts and automatically sync transactions.
                </div>
            </div>
            <div class="element_or">
                or
            </div>
            <div class="element" onclick="add_account_manual_input()">
                <img src="img/manual_inp.svg" alt="">
                <div class="name">
                    Manual Input
                </div>
                <div class="desc">
                    Update your account manually. You can connect your bank or import data later.
                </div>
            </div>
        </div>
    `)
};
function add_account_manual_input() {
    show_popup("MANUAL INPUT", `
        <div class="add_some" >
            <div class="label">
                Account name
            </div>
            <input type="text" id="add_account_input_name">
            <div class="label">
                Account type
            </div>
            <select id="add_account_input_type">
                <option value="CASH">Cash</option>
                <option value="BANK">Bank</option>
            </select>
            <div class="label">
                Initial amount
            </div>
            <input type="text" id="add_account_input_init_amount">
            <button id="add_account">Add</button>
        </div>
    `)
    document.getElementById('add_account').onclick = () => add_account(document.getElementById('add_account_input_name').value, document.getElementById('add_account_input_type').value, document.getElementById('add_account_input_init_amount').value)
}
function add_account(account_name, account_type, account_init_amount) {
    param = {
        method: "POST",
        url: 'https://budget-buddy-finance-app.herokuapp.com/accounts/for-current-user',
        token: localStorage.getItem('token'),
        body: {
            name: account_name,
            type: account_type,
            balance: account_init_amount,
        }
    }
    sendRequest(param).then(data => {
        clear_popup()
        get_accounts()
    })
}
function delete_account_input(account_id, name) {
    show_popup("DELETE ACCOUNT '" + name + "'", `
        <div class="add_some" >
            <div class="label">
                Are you sure you want to delete "`+ name + `"?
            </div>
            <button class="delete" id="delete_account">Delete</button>
        </div>
    `)
    document.getElementById('delete_account').onclick = () => delete_account(account_id)
}
function delete_account(account_id) {
    param = {
        method: "DELETE",
        url: 'https://budget-buddy-finance-app.herokuapp.com/accounts/' + account_id,
        token: localStorage.getItem('token'),
        no_json: true,
    }
    sendRequest(param).then(data => {
        clear_popup()
        get_accounts()
    })

}
function edit_account_input(account_id, name, comment) {
    show_popup("EDIT ACCOUNT '" + name + "'", `
        <div class="add_some" >
            <div class="label">
                Account name
            </div>
            <input type="text" id="edit_account_input_name" value="`+ name + `">
            <div class="label">
                Account comment
            </div>
            <input type="text" id="edit_account_input_comment" value="`+ comment + `">
            <button id="edit_account">Edit</button>
        </div>
    `)
    document.getElementById('edit_account').onclick = () => edit_account(account_id, document.getElementById('edit_account_input_name').value, document.getElementById('edit_account_input_comment').value)
}
function edit_account(account_id, account_name, account_comment) {
    param = {
        method: "PATCH",
        url: 'https://budget-buddy-finance-app.herokuapp.com/accounts/' + account_id,
        token: localStorage.getItem('token'),
        body: {
            name: account_name,
            comment: account_comment,
        }
    }
    sendRequest(param).then(data => {
        clear_popup()
        get_accounts()
    })
}
function get_accounts() {
    param = {
        method: "GET",
        url: 'https://budget-buddy-finance-app.herokuapp.com/accounts/for-current-user',
        token: localStorage.getItem('token')
    }
    sendRequest(param)
        .then(data => {
            document.getElementById('total_balance').innerHTML = "UAH " + data.totalBalance + ".00"
            document.getElementById('accounts').innerHTML = `<h1>Accounts</h1>`;
            data.accounts.forEach(function (item, i, data) {
                if (item.comment == null) {
                    item.comment = ''
                }
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
                                <button onclick="edit_account_input('`+ item.id + `', '` + item.name + `', '` + item.comment + `')">
                                    <img src="img/btn_edit.svg">
                                </button>
                                <button onclick="delete_account_input('`+ item.id + `', '` + item.name + `')">
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

