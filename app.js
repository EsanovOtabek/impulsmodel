function writer(n) {
    var massa =Number(document.getElementById('massa_'+n).value);
    document.getElementById("m_"+n).innerText = massa + "kg";
}

var id=null;
function start(){
    var circle_1 = document.getElementById('circle_1');
    var circle_2 = document.getElementById('circle_2');
    circle_1.style.left = "200px";
    circle_2.style.right = "1470px";

    clearInterval(id);


    var massa_1 = Number(document.getElementById('massa_1').value);
    var massa_2 = Number(document.getElementById('massa_2').value);
    var speed_1 = Number(document.getElementById('speed_1').value);
    var speed_2 = -Number(document.getElementById('speed_2').value);
    var checked = document.getElementById('isElastik').checked;

    var start1_pos = 200;
    var start2_pos = 1470;

    var impuls = massa_1 * speed_1 + massa_2 * speed_2;
    var speed=0;
    var speed0=0;

    if(!checked){
        speed = impuls/(massa_1 + massa_2);
        speed0 = speed;
    }
    else{
        speed = (impuls - massa_2 * (speed_1 - speed_2)) / (massa_1 + massa_2);
        speed0 = speed + (speed_1 - speed_2);
    }
    var xs = false;
    id = setInterval(function () {
        // console.log(start1_pos+80);
        // console.log(start2_pos);
        start1_pos += speed_1/100;
        start2_pos += speed_2/100;
        start1_pos = Math.round(start1_pos*100)/100;
        start2_pos = Math.round(start2_pos*100)/100;

        circle_1.style.left = start1_pos + "px";
        circle_2.style.left = start2_pos + "px";
        if (!xs && Math.abs(Math.round(start1_pos)+80 - Math.round(start2_pos))<=1){
            xs = true;
            taskSolvedCongratulations()

            speed_1 = speed;
            speed_2 = speed0;
        }

        if (start2_pos+80 > 1750 || start1_pos <= 0){
            clearInterval(id);
        }
    },1);

    if (start2_pos >= 1700){
        speed_2 = 0;
    }
    if(start1_pos <= 0){
        speed_1 = 0;
    }
}

function stop(){
    clearInterval(id);
    var circle_1 = document.getElementById('circle_1');
    var circle_2 = document.getElementById('circle_2');
    circle_1.style.left = "200px";
    circle_2.style.left = "1470px";
}


function taskSolvedCongratulations() {
    const duration = 800;
    const animationEnd = Date.now() + duration;
    const defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
        }));

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
        }));

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.5, 0.7), y: Math.random() - 0.2}
        }));
    }, 250);

    let audio = document.getElementById('congratulationsSound')

    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}

