var elements = document.querySelectorAll(".cat_element_active_changer");

for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
        this.parentElement.parentElement.classList.toggle('off')
    };
}


var scat = document.getElementById("scat_btn")
scat.onclick = function () {
    document.getElementById("scat").classList.remove("dnone");
    document.getElementById("ucat").classList.add("dnone");
    document.getElementById("scat_btn").classList.add('active');
    document.getElementById("ucat_btn").classList.remove('active');
}
var ucat = document.getElementById("ucat_btn")
ucat.onclick = function () {
    document.getElementById("scat").classList.add("dnone");
    document.getElementById("ucat").classList.remove("dnone");
    document.getElementById("ucat_btn").classList.add('active');
    document.getElementById("scat_btn").classList.remove('active');
}

document.getElementById("add_category_popup_btn").onclick = () => {
    show_popup("ADD CATEGORY", `
        <div class="add_some">
            <div class="label">
                Name of category
            </div>
            <input type="text" id="add_category_input">
            <button id="add_category">Add</button>
        </div>
    `)
    document.getElementById('add_category').onclick = () => add_category(document.getElementById('add_category_input').value)
}

function get_сategories() {
    // console.log(localStorage.getItem('token'));
    param = {
        method: "GET",
        url: 'https://budget-buddy-finance-app.herokuapp.com/categories/for-current-user',
        token: localStorage.getItem('token'),
    }
    sendRequest(param).then(data => {
        document.getElementById('ucat_container').innerHTML = ""
        data.forEach(function (item, i, data) {
            document.getElementById('ucat_container').innerHTML += `
                <div class="cat_element">
                    <div class="info">
                        <div class="text">`+ item.name + `</div>
                        <div class="control">
                            <button onclick="edit_category_input('` + item.id + `', '` + item.name + `')">
                                <img src="img/btn_edit.svg">
                            </button>
                            <button onclick="delete_category_input('` + item.id + `', '` + item.name + `')">
                                <img src="img/btn_del.svg">
                            </button>
                        </div>
                    </div>
                </div>
                `;
        });
    })
}
function delete_category_input(category_id, name) {
    show_popup("DELETE CATEGORY '" + name + "'", `
        <div class="add_some" >
            <div class="label">
                Are you sure you want to delete "`+ name + `"?
            </div>
            <button class="delete" id="delete_category">Delete</button>
        </div>
    `)
    document.getElementById('delete_category').onclick = () => delete_category(category_id)
}
function delete_category(category_id) {
    param = {
        method: "DELETE",
        url: 'https://budget-buddy-finance-app.herokuapp.com/categories/' + category_id,
        token: localStorage.getItem('token'),
        no_json: true,
    }
    sendRequest(param).then(data => {
        clear_popup()
        get_сategories()
    })
}
function edit_category_input(category_id, name) {
    show_popup("EDIT CATEGORY '" + name + "'", `
        <div class="add_some">
            <div class="label">
                Category name
            </div>
            <input type="text" id="edit_category_input_name" value="`+ name + `">
            <button id="edit_category">Edit</button>
        </div>
    `)
    document.getElementById('edit_category').onclick = () => edit_category(category_id, document.getElementById('edit_category_input_name').value)
}
function edit_category(category_id, category_name) {
    param = {
        method: "PUT",
        url: 'https://budget-buddy-finance-app.herokuapp.com/categories/' + category_id,
        token: localStorage.getItem('token'),
        no_json: true,
        body: { name: category_name }
    }
    sendRequest(param).then(data => {
        clear_popup()
        get_сategories()
    })
}
function add_category(cat_name) {
    const requestURL =
        param = {
            method: "POST",
            url: 'https://budget-buddy-finance-app.herokuapp.com/categories/for-current-user',
            token: localStorage.getItem('token'),
            body: { name: cat_name },
        }
    sendRequest(param).then(data => {
        clear_popup()
        get_сategories()
    })

}

get_сategories()