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
    show_popup("MANUAL INPUT", `
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
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/categories/for-current-user'
    sendRequest("GET", requestURL, localStorage.getItem('token'))
        .then(data => {
            data.forEach(function (item, i, data) {
                console.log(item.id)
                document.getElementById('ucat_container').innerHTML += `
                <div class="cat_element">
                    <div class="info">
                        <div class="text">`+ item.name + `</div>
                        <div class="control">
                            <button id="btn_cat_edit_`+ i + `" onclick="edit_category('` + item.id + `')">
                                <img src="img/btn_edit.svg">
                            </button>
                            <button id="btn_cat_delete_`+ i + `" onclick="delete_category('` + item.id + `')">
                                <img src="img/btn_del.svg">
                            </button>
                        </div>
                    </div>
                </div>
                `;
            });
        })
}

function delete_category(id) {
    console.log(id);
}
function edit_category(id) {
    console.log(id);
}
function add_category(cat_name) {
    const requestURL = 'https://budget-buddy-finance-app.herokuapp.com/categories/for-current-user'
    sendRequest("POST", requestURL, localStorage.getItem('token'), { name: cat_name })
        .then(data => {
            console.log(data)
        })
    clear_popup()
    get_сategories()

}

get_сategories()