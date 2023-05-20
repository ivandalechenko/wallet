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