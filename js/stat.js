new Chartist.Pie('#chart', {
    series: [20, 30, 50]
});

function redraw() {
    btns = document.getElementsByClassName("stat_nav_btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    elements = document.getElementsByClassName("stat_elements_block");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('dnone');
    }
    document.getElementById('chart').innerHTML = "";
    document.getElementById('chart').classList.remove("pie");
    document.getElementById('chart').classList.add('dnone');
    document.getElementById('cash_flow').classList.add('dnone');
}



document.getElementById('am_by_cat_btn').onclick = function () {
    redraw()
    document.getElementById('am_by_cat_btn').classList.add('active')
    document.getElementById('am_by_cat_block').classList.remove('dnone')

    document.getElementById('chart').classList.add("pie");
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Pie('#chart', {
        series: [20, 30, 50]
    });
}





document.getElementById('cat_leader_btn').onclick = function () {
    redraw()

    document.getElementById('cat_leader_block').classList.remove('dnone')
    document.getElementById('cat_leader_btn').classList.add('active')
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Bar('#chart', {
        labels: ['Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 5, 4, 3, 7, 5],
        ]
    }, {
        axisX: {
            showGrid: false,
            offset: 30
        },
        axisY: {
            showGrid: false,
            offset: 30
        }
    });
}

document.getElementById('cat_dyn_btn').onclick = function () {
    redraw()

    document.getElementById('cat_dyn_btn').classList.add('active')
    document.getElementById('cat_dyn_block').classList.remove('dnone')
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Line('#chart', {
        labels: ['Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 5, 4, 3, 7, 5],
        ]
    }, {
        axisX: {
            showGrid: false,
            labelOffset: {
                x: 0,
                y: 10
            },
        },
        axisY: {
            showGrid: false,
            labelOffset: {
                x: -10,
                y: 0
            },
        },
        showPoint: false,
        lineSmooth: false,
    });
}




document.getElementById('cash_flow_btn').onclick = function () {

    redraw()
    document.getElementById('cash_flow_btn').classList.add('active')
    document.getElementById('cash_flow').classList.remove('dnone')
    document.getElementById('cash_flow_block').classList.remove('dnone')
    document.getElementById('cash_flow_btn').classList.add('active')

}






