const sectionTop = document.querySelector('.section-top');
const sectionMid = document.querySelector('.section-mid');
const sectionBottom = document.querySelector('.section-bottom');
const cantidadCiclos = document.querySelector('.section-mid__nrCiclos');
const msgCiclos = document.querySelector('.section-mid__msgCiclos');
const ciclosSelect = document.querySelectorAll('.section-mid__ciclos button');
const btnComenzar = document.querySelector('.section-mid__btn button');
const btnSkip = document.querySelector('.section-mid__btn img');
const btnMenu = document.querySelector('.section-top__title-container a');
const minuto = document.querySelector('.minuto');
const segundo = document.querySelector('.segundo');
const styleDocument = document.documentElement.style;

// Ajustes
const menuAjustes = document.querySelector('.menu-ajustes');
const pomoTime = document.getElementById('pomo-time-ajustes');
const breakTime = document.getElementById('break-time-ajustes');
const longTime = document.getElementById('long-time-ajustes');
const autoBreak = document.getElementById('auto-break');
const autoPomo = document.getElementById('auto-pomo');
const intervalosLong = document.getElementById('long-break-interval');
const btnGuardarSettings = document.getElementById('btn-save-settings');


const objSettings = {
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4
}
const objMidSection = {
    pomodoroTime: ('0'+1).slice(-2),
    breakTime: ('0'+1).slice(-2),
    longTime: ('0'+1).slice(-2),
    btnText: 'Iniciar',
    cantidadCiclos: 0,
    tareaActiva: '¡Tiempo para enfocarse!',
    descansoActivo: 'Tiempo de descanso'
}

let minutosDelCiclo; 
let segundosDelCiclo;
let temporizador;
btnComenzar.textContent = objMidSection.btnText;
minuto.textContent = objMidSection.pomodoroTime;
cantidadCiclos.textContent = objMidSection.cantidadCiclos;
msgCiclos.textContent = objMidSection.tareaActiva;

function transitionPomo(){
    clearInterval(temporizador);
    styleDocument.setProperty('--color', 'rgb(186, 73, 73)');
    styleDocument.setProperty('--color-select', 'rgb(164, 78, 78)');
    styleDocument.setProperty('--soft-color', 'rgb(193, 92, 92)');
    ciclosSelect[0].classList.add('ciclos-select');
    ciclosSelect[1].classList.remove('ciclos-select');
    ciclosSelect[2].classList.remove('ciclos-select');
    btnComenzar.classList.remove('btnPresionado');

    objMidSection.btnText = 'Iniciar';
    btnComenzar.textContent = objMidSection.btnText;
    msgCiclos.textContent = objMidSection.tareaActiva;
    minuto.textContent = objMidSection.pomodoroTime;
    segundo.textContent = '00';
}
function transitionBreak(){
    clearInterval(temporizador);
    styleDocument.setProperty('--color', 'rgb(56, 133, 138)');
    styleDocument.setProperty('--color-select', 'rgb(65, 123, 128)');
    styleDocument.setProperty('--soft-color', 'rgb(76, 145, 150)');
    ciclosSelect[1].classList.add('ciclos-select');
    ciclosSelect[0].classList.remove('ciclos-select');
    ciclosSelect[2].classList.remove('ciclos-select');
    btnComenzar.classList.remove('btnPresionado');

    objMidSection.btnText = 'Iniciar';
    btnComenzar.textContent = objMidSection.btnText;
    msgCiclos.textContent = objMidSection.descansoActivo;
    minuto.textContent = objMidSection.breakTime;
    segundo.textContent = '00';
}
function transitionLong(){
    clearInterval(temporizador);
    styleDocument.setProperty('--color', 'rgb(57, 112, 151)');
    styleDocument.setProperty('--color-select', 'rgb(66, 108, 138)');
    styleDocument.setProperty('--soft-color', 'rgb(77 127 162)');
    ciclosSelect[2].classList.add('ciclos-select');
    ciclosSelect[0].classList.remove('ciclos-select');
    ciclosSelect[1].classList.remove('ciclos-select');
    btnComenzar.classList.remove('btnPresionado');

    objMidSection.btnText = 'Iniciar';
    btnComenzar.textContent = objMidSection.btnText;
    msgCiclos.textContent = objMidSection.descansoActivo;
    minuto.textContent = objMidSection.longTime;
    segundo.textContent = '00';
}
function comenzarTemporizador() {
    btnComenzar.classList.toggle('btnPresionado');
    
    if(objMidSection.btnText === 'Iniciar') {
        objMidSection.btnText = 'Pausa';
        btnComenzar.textContent = objMidSection.btnText;
        btnSkip.style.display = 'block';

        minutosDelCiclo = parseInt(minuto.textContent) 
        segundosDelCiclo = minutosDelCiclo * 60 + parseInt(segundo.textContent);
        let minutosDelCicloAms = (minutosDelCiclo * 60) * 1000;
        let segundosDelCicloAms = segundosDelCiclo * 1000;

        let segundos = 60;
        let minutos = minutosDelCiclo;
        minutos = minutos - 1;
        temporizador = setInterval(()=>{
            if(segundos > 0) {
                segundos = segundos - 1;
            } else if(segundos == 0) {
                segundos = segundos + 59;
                minutos = minutos - 1;
            }
            segundo.textContent = ('0'+segundos).slice(-2);
            minuto.textContent = ('0'+minutos).slice(-2); 
        },1000)

        setTimeout(()=>{
            clearInterval(temporizador)

            objMidSection.cantidadCiclos = objMidSection.cantidadCiclos + 1;
            cantidadCiclos.textContent = objMidSection.cantidadCiclos;

            if(ciclosSelect[0].className === 'ciclos-select') {
                objSettings.longBreakInterval = objSettings.longBreakInterval - 1;
                sumarPomosEnTarea();
                
                if(objSettings.longBreakInterval == 0) {
                    transitionLong();
                    objSettings.longBreakInterval = objSettings.longBreakInterval + intervalosLong.value;
                } else {
                    transitionBreak();
                }
            } else if(ciclosSelect[1].className === 'ciclos-select' || ciclosSelect[2].className === 'ciclos-select'){
                transitionPomo();
            }

            if(ciclosSelect[0].className === 'ciclos-select' && objSettings.autoStartPomodoros === true) {
                btnComenzar.click();
            }
            if(ciclosSelect[1].className === 'ciclos-select' && objSettings.autoStartBreaks === true) {
                btnComenzar.click();
            } else if(ciclosSelect[2].className === 'ciclos-select' && objSettings.autoStartBreaks === true) {
                btnComenzar.click();
            }
        }, (minutosDelCicloAms + segundosDelCicloAms) - 60000)

    } else if(objMidSection.btnText === 'Pausa') {
        objMidSection.btnText = 'Iniciar';
        btnComenzar.textContent = objMidSection.btnText;
        btnSkip.style.display = 'none';
        clearInterval(temporizador)
    }
}
function skipearTemporizador() {
    clearInterval(temporizador);
    btnSkip.style.display = 'none';
    console.log(objSettings.longBreakInterval);
    if (ciclosSelect[0].className === 'ciclos-select') {
        objMidSection.cantidadCiclos = objMidSection.cantidadCiclos + 1;
        cantidadCiclos.textContent = objMidSection.cantidadCiclos;
        objSettings.longBreakInterval = objSettings.longBreakInterval - 1;

        if(objSettings.longBreakInterval == 0) {
            transitionLong()
            objSettings.longBreakInterval = objSettings.longBreakInterval + intervalosLong.value;
        } else {
            transitionBreak();
        }

    } else if (ciclosSelect[1].className === 'ciclos-select') {
        transitionPomo();

    } else if (ciclosSelect[2].className === 'ciclos-select'){
        transitionPomo();
    }
}
function guardarSettings() {
    objMidSection.pomodoroTime = ('0'+parseInt(pomoTime.value)).slice(-2);
    objMidSection.breakTime = ('0'+parseInt(breakTime.value)).slice(-2);
    objMidSection.longTime = ('0'+parseInt(longTime.value)).slice(-2);
    objSettings.autoStartBreaks = autoBreak.checked;
    objSettings.autoStartPomodoros = autoPomo.checked;
    objSettings.longBreakInterval = parseInt(intervalosLong.value);

    if (ciclosSelect[0].className === 'ciclos-select') {
        minuto.textContent = objMidSection.pomodoroTime;
    } else if (ciclosSelect[1].className === 'ciclos-select'){
        minuto.textContent = objMidSection.breakTime;
    } else {
        minuto.textContent = objMidSection.longTime;
    }

    menuAjustes.classList.remove('menu-settings-active');
    sectionTop.classList.remove('reduceOpacity');
    sectionMid.classList.remove('reduceOpacity');
    sectionBottom.classList.remove('reduceOpacity');
}
function abrirMenu(e) {
    e.preventDefault()
    menuAjustes.classList.add('menu-settings-active');
    sectionTop.classList.add('reduceOpacity');
    sectionMid.classList.add('reduceOpacity');
    sectionBottom.classList.add('reduceOpacity');
}

ciclosSelect.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        switch(e.target.id) {
            case 'pomo':
                    transitionPomo();
                break;
            case 'break':
                    transitionBreak();
                break;
            case 'long':
                    transitionLong();
                break;
        }
    })
})

btnComenzar.addEventListener('click', comenzarTemporizador);
btnMenu.addEventListener('click', abrirMenu)
btnGuardarSettings.addEventListener('click', guardarSettings);
btnSkip.addEventListener('click', skipearTemporizador);

if(screen.width <= 500) {
    document.getElementById('pomo').textContent = 'Pomo'
    document.getElementById('break').textContent = 'Corto'
    document.getElementById('long').textContent = 'Largo'
} else {
    document.getElementById('pomo').textContent = 'Pomodoro'
    document.getElementById('break').textContent = 'Descanso Corto'
    document.getElementById('long').textContent = ' Descanso Largo' 
}
window.onresize = ()=>{
    if(screen.width <= 425) {
        document.getElementById('pomo').textContent = 'Pomo'
        document.getElementById('break').textContent = 'Corto'
        document.getElementById('long').textContent = 'Largo'
    } else {
        document.getElementById('pomo').textContent = 'Pomodoro'
        document.getElementById('break').textContent = 'Descanso Corto'
        document.getElementById('long').textContent = ' Descanso Largo' 
    }
}