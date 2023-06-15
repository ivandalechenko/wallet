document.getElementById('btn_add_account').onclick = function () {
    show_popup("ADD ACCOUNT", `
        <div class="add_account">
            <div class="element" id="add_card_btn" onclick="add_account_mono_input()">
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
function add_account_mono_input() {
    show_popup("MONO INTEGRATION", `
        <div class="add_some" >
            <div class="label">
                Card number
            </div>
            <input type="number" id="add_account_input_card_num">
            <div class="label">
                Token <a href="https://api.monobank.ua/">(generate token here)</a>
            </div>
            <input type="text" id="add_account_input_card_token">
            <div class="label">
                History from date
            </div>
            <input type="date" id="add_account_input_card_date" name="date"/>
            <button id="add_account_card">Add</button>
        </div>
    `)
    document.getElementById('add_account_card').onclick = () => add_account_card(document.getElementById('add_account_input_card_num').value,
        document.getElementById('add_account_input_card_token').value,
        document.getElementById('add_account_input_card_date').valueAsNumber / 1000
    )
}
function add_account_card(card_num, bank_token, from_date) {
    param = {
        method: "POST",
        url: 'https://budget-buddy-finance-app.herokuapp.com/accounts/for-current-user/bank-integration',
        token: localStorage.getItem('token'),
        body: {
            cardNumber: card_num,
            token: bank_token,
            transactionsHistoryFrom: moment.unix(from_date).format("YYYY-MM-DDTHH:mm:ss.000")
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
function get_transactions(account_id, account_name, page) {
    param = {
        method: "GET",
        url: 'https://budget-buddy-finance-app.herokuapp.com/transactions?accountId=' + account_id + '&page=' + page + '&size=' + 20,
        token: localStorage.getItem('token'),
    }
    sendRequest(param).then(data => {
        // console.log(data)
        content = `
        <div class="transactions">
            <div class="filter">
                <button class="tr_add" onclick="add_transaction_input('`+ account_id + `', '` + account_name + `', '` + page + `')">
                    + add transaction
                </button>
            </div>`;
        date = data.transactionsHistory
        date.forEach(function (item, i, date) {
            content += `
                <div class="date">
                    `+ item.date + `
                </div>`;
            transactions = item.transactions
            transactions.forEach(function (tr_item, j, transactions) {
                if (tr_item.amount > 0) {
                    plus = "+"
                } else {
                    plus = ""
                }
                content += `        
                <div class="tr">
                    <div class="tr_info">
                        <div class="tr_info_element left">
                        `+ tr_item.category.name + `
                        </div>
                        <div class="tr_info_element gray center">
                        `+ tr_item.type + `
                        </div>
                        <div class="tr_info_element right">
                            <div class="text `+ tr_item.type + `">UAH ` + plus + tr_item.amount + `.00</div>
                            <button><img src="img/btn_edit.svg" alt=""></button>
                            <button><img src="img/btn_del.svg" alt=""></button>
                        </div>
                    </div>
                </div>`;
            })
        })

        // if (data.totalPages != 1) {
        content += `<div class="pagination">`;
        if (page != 0) {
            content += `<button class="arrow" onclick="get_transactions(` + account_id + `,` + account_name + `,` + (page - 1) + `)"><img src="img/white_arrow_left.svg" alt=""></button>`;
        }
        for (let i = 0; i < data.totalPages; i++) {
            content += `<button `;
            if (i == page) {
                content += `class='active' `;
            } else {
                content += `onclick="get_transactions(` + account_id + `,` + account_name + `,` + i + `)"`;
            }
            content += `>` + (i + 1) + `</button>`;
        }

        if (page != data.totalPages - 1 && page != data.totalPages) {
            content += `<button class="arrow" onclick="get_transactions(` + account_id + `,` + account_name + `,` + (page + 1) + `)"><img src="img/white_arrow_right.svg" alt=""></button>`;
        }
        content += `</div>`;
        // }
        content += `</div>`;

        show_popup(account_name + " TRANSACTIONS", content)
    })
}
function add_transaction_input(account_id, account_name, page) {
    param = {
        method: "GET",
        url: 'https://budget-buddy-finance-app.herokuapp.com/categories/for-current-user',
        token: localStorage.getItem('token'),
    }
    sendRequest(param).then(data => {
        content = `
        <div class="add_some" >
            <div class="label">
                Category
            </div>
            <select id="add_transaction_input_category">`;
        data.forEach(function (item, i, data) {
            content += `<option value="` + item.id + `">` + item.name + `</option>`
        })
        content += `</select>
            <div class="label">
                Type
            </div>
            <select id="add_transaction_input_type">
                <option value="INCOME">Income</option>
                <option value="EXPANSE">Expanse</option>
            </select>
            <div class="label">
                Amount
            </div>
            <input type="number" id="add_transaction_input_amount">
            <div class="label">
                Comment
            </div>
            <input type="text" id="add_transaction_input_comment">
            <button id="add_transaction">Add</button>
        </div>`
        show_popup("ADD TRANSACTION TO " + account_name, content)
        document.getElementById('add_transaction').onclick = () => add_transaction(account_id, document.getElementById('add_transaction_input_category').value, document.getElementById('add_transaction_input_type').value, document.getElementById('add_transaction_input_amount').value, document.getElementById('add_transaction_input_comment').value, page, account_name)
    })
}
function add_transaction(account_id, category_id, type, transaction_amount, transaction_comment, page, account_name) {
    param = {
        method: "POST",
        url: 'https://budget-buddy-finance-app.herokuapp.com/transactions',
        token: localStorage.getItem('token'),
        body: {
            accountId: account_id,
            categoryId: category_id,
            type: type,
            amount: transaction_amount,
            comment: transaction_comment,
            executionDateTime: moment().format("YYYY-MM-DDTHH:mm:ss.000")

        }
    }
    sendRequest(param).then(data => {
        get_transactions(account_id, account_name, page)
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
                                <button class="cat_info" onclick="get_transactions('`+ item.id + `', '` + item.name + `', 0)">
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
            })
        })
}
get_accounts()