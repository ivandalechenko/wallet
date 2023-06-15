new Chartist.Pie('#chart', {
    series: [42, 21, 18, 13, 6]
});

function redraw() {

    document.getElementById('btn_day').classList.add('dnone')
    document.getElementById('btn_week').classList.add('dnone')
    document.getElementById('btn_mounth').classList.add('dnone')
    document.getElementById('btn_year').classList.add('dnone')

    document.getElementById('btn_day').classList.remove('active')
    document.getElementById('btn_week').classList.remove('active')
    document.getElementById('btn_mounth').classList.remove('active')
    document.getElementById('btn_year').classList.remove('active')

    document.getElementById('mounth_label').classList.add('dnone')


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

    document.getElementById('btn_day').classList.remove('dnone')
    document.getElementById('btn_week').classList.remove('dnone')
    document.getElementById('btn_mounth').classList.remove('dnone')
    document.getElementById('btn_year').classList.remove('dnone')

    document.getElementById('btn_mounth').classList.add('active')
    document.getElementById('mounth_label').classList.remove('dnone')

    document.getElementById('am_by_cat_btn').classList.add('active')
    document.getElementById('am_by_cat_block').classList.remove('dnone')

    document.getElementById('chart').classList.add("pie");
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Pie('#chart', {
        series: [42, 21, 18, 13, 6]
    });
}





document.getElementById('cat_leader_btn').onclick = function () {
    redraw()



    document.getElementById('btn_year').classList.remove('dnone')
    document.getElementById('btn_year').classList.add('active')

    document.getElementById('cat_leader_block').classList.remove('dnone')
    document.getElementById('cat_leader_btn').classList.add('active')
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Bar('#chart', {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mrch', 'Apr', 'May'],
        series: [
            [2.0, 2.4, 2.3, 4.1, 1.3, 8.9, 1.8, 1.2, 1.8, 6.9, 5.6, 4.9],
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


    document.getElementById('btn_year').classList.remove('dnone')
    document.getElementById('btn_year').classList.add('active')

    document.getElementById('cat_dyn_btn').classList.add('active')
    document.getElementById('cat_dyn_block').classList.remove('dnone')
    document.getElementById('chart').classList.remove("dnone");

    new Chartist.Line('#chart', {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mrch', 'Apr', 'May'],
        series: [
            [0.2, 0.3, 0.1, 4.1, 1.3, 0.4, 0.4, 0.4, 0.9, 0.1, 0.6, 1.2],
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


    document.getElementById('btn_mounth').classList.remove('dnone')
    document.getElementById('btn_mounth').classList.add('active')


    document.getElementById('cash_flow_btn').classList.add('active')
    document.getElementById('cash_flow').classList.remove('dnone')
    document.getElementById('cash_flow_block').classList.remove('dnone')
    document.getElementById('cash_flow_btn').classList.add('active')

}






