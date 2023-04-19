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
const btnTaskOptions = document.querySelector('.section-bottom__task-options-img');
const menuTaskOptions = document.querySelector('.task-options-menu');
const btnRemoveTareas = document.querySelector('.quitar-tareas-terminadas');
const btnRemoveAllTareas = document.querySelector('.quitar-tareas');

// Nodo Audio
const audio = new Audio();
audio.preload = 'auto';
audio.src = './assets/alarma2.mp3';
const audioFragment = document.createDocumentFragment();
audioFragment.appendChild(audio);
document.querySelector('main').appendChild(audioFragment);

function alarma(){ 
    const audioElement = document.querySelector('audio');
    audioElement.play();
    setTimeout(()=>{
        audioElement.pause()
    },4000)
}



const objSettings = {
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
    pomodoroTime: ('0'+25).slice(-2),
    breakTime: ('0'+5).slice(-2),
    longTime: ('0'+15).slice(-2)
}
const objMidSection = {
    btnText: 'Iniciar',
    cantidadCiclos: 0,
    tareaActiva: '¡Tiempo para enfocarse!',
    descansoActivo: 'Tiempo de descanso'
}

let minutosDelCiclo; 
let segundosDelCiclo;
let temporizador;
let temporizadorTotal;
btnComenzar.textContent = objMidSection.btnText;
minuto.textContent = objSettings.pomodoroTime;
cantidadCiclos.textContent = objMidSection.cantidadCiclos;
msgCiclos.textContent = objMidSection.tareaActiva;

function transitionPomo(){
    clearInterval(temporizador);
    clearTimeout(temporizadorTotal);
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
    minuto.textContent = objSettings.pomodoroTime;
    segundo.textContent = '00';

    if(listaTareas.length !== 0) {
        let tareaEnCola = listaTareas.find((tarea)=>{
            return tarea.pomosRestantes != '0';
        })
        objMidSection.tareaActiva = tareaEnCola.name;
        msgCiclos.textContent = objMidSection.tareaActiva;  
    }
}
function transitionBreak(){
    clearInterval(temporizador);
    clearTimeout(temporizadorTotal);
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
    minuto.textContent = objSettings.breakTime;
    segundo.textContent = '00';
}
function transitionLong(){
    clearInterval(temporizador);
    clearTimeout(temporizadorTotal);
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
    minuto.textContent = objSettings.longTime;
    segundo.textContent = '00';
}


function comenzarTemporizador() {
    btnComenzar.classList.toggle('btnPresionado');
    
    if(objMidSection.btnText === 'Iniciar') {
        objMidSection.btnText = 'Pausa';
        btnComenzar.textContent = objMidSection.btnText;
        btnSkip.style.display = 'block';

        minutosDelCiclo = parseInt(minuto.textContent) 
        segundosDelCiclo = parseInt(segundo.textContent);
        let minutosDelCicloAms = (minutosDelCiclo * 60) * 1000;
        let segundosDelCicloAms = segundosDelCiclo * 1000;

        let segundos = segundosDelCiclo;
        let minutos = minutosDelCiclo;

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

        temporizadorTotal = setTimeout(()=>{
            clearInterval(temporizador);

            if(ciclosSelect[0].className === 'ciclos-select') {
                objSettings.longBreakInterval = objSettings.longBreakInterval - 1;
                objMidSection.cantidadCiclos = objMidSection.cantidadCiclos + 1;
                cantidadCiclos.textContent = objMidSection.cantidadCiclos;
                sumarPomosEnTarea();

                if(objSettings.longBreakInterval == 0) {
                    transitionLong();
                    objSettings.longBreakInterval = objSettings.longBreakInterval + intervalosLong.value;
                } else {
                    transitionBreak();
                }
            } else if(ciclosSelect[1].className === 'ciclos-select' || ciclosSelect[2].className === 'ciclos-select'){
                if(listaTareas.length !== 0) {
                    let tareaEnCola = listaTareas.find((tarea)=>{
                        return tarea.pomosRestantes != '0';
                    })
                    objMidSection.tareaActiva = tareaEnCola.name;
                    msgCiclos.textContent = objMidSection.tareaActiva;  
                }
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

            alarma();
        }, (minutosDelCicloAms + segundosDelCicloAms))

    } else if(objMidSection.btnText === 'Pausa') {
        clearInterval(temporizador);
        clearTimeout(temporizadorTotal);
        objMidSection.btnText = 'Iniciar';
        btnComenzar.textContent = objMidSection.btnText;
        btnSkip.style.display = 'none';
    }
}

function skipearTemporizador() {
    clearInterval(temporizador);
    clearTimeout(temporizadorTotal);
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
    clearInterval(temporizador);
    clearTimeout(temporizadorTotal);
    objSettings.pomodoroTime = ('0'+parseInt(pomoTime.value)).slice(-2);
    objSettings.breakTime = ('0'+parseInt(breakTime.value)).slice(-2);
    objSettings.longTime = ('0'+parseInt(longTime.value)).slice(-2);
    objSettings.autoStartBreaks = autoBreak.checked;
    objSettings.autoStartPomodoros = autoPomo.checked;
    objSettings.longBreakInterval = parseInt(intervalosLong.value);

    if (ciclosSelect[0].className === 'ciclos-select') {
        minuto.textContent = objSettings.pomodoroTime;
    } else if (ciclosSelect[1].className === 'ciclos-select'){
        minuto.textContent = objSettings.breakTime;
    } else {
        minuto.textContent = objSettings.longTime;
    }


    // Almacenar settings en indexedDB
    const IDBRequest = indexedDB.open('settings', 1);

    IDBRequest.addEventListener('upgradeneeded',()=>{
        const dbSettings = IDBRequest.result;
        dbSettings.createObjectStore("settings",{
            autoIncrement: true
        })
    })

    const agregarSettings = (objeto, key)=>{
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction("settings", "readwrite");
        const objectStore = IDBtransaction.objectStore("settings");
        objectStore.put(objeto, key);
    }
    const leerSettings = ()=>{
        const db = IDBRequest.result;
        const IDBtransaction = db.transaction("settings", "readonly");
        const objectStore = IDBtransaction.objectStore("settings");
        const leerObjeto = objectStore.openCursor();
        leerObjeto.addEventListener('success', ()=>{
            if(leerObjeto.result) {
                console.log(leerObjeto.result.value);
                leerObjeto.result.continue();
            }
        })
    }

    IDBRequest.addEventListener('success', ()=>{
        const settingsKeys = Object.keys(objSettings);
        const settingsValues = Object.values(objSettings);
        for(let i = 0; i < settingsKeys.length; i++){
            let value = settingsValues[i];
            let objeto = {key: value}
            agregarSettings(objeto, i+1);
        }
        leerSettings()
    })

    transitionPomo();
    menuAjustes.classList.remove('menu-settings-active');
    sectionTop.classList.remove('reduceOpacity');
    sectionMid.classList.remove('reduceOpacity');
    sectionBottom.classList.remove('reduceOpacity');
}
function abrirMenu(e) {
    e.preventDefault()
    menuAjustes.classList.toggle('menu-settings-active');
    sectionTop.classList.toggle('reduceOpacity');
    sectionMid.classList.toggle('reduceOpacity');
    sectionBottom.classList.toggle('reduceOpacity');
}
function abrirTaskOptions() {
    menuTaskOptions.classList.toggle('menu-settings-active')
}
function quitarAllTareas() {
    if(listaTareas.length > 0) {
        listaTareas.splice(0, listaTareas.length);
    }
    cardTareasContainer.innerHTML = ''
    menuTaskOptions.classList.toggle('menu-settings-active');
}
function quitarTareasTerminadas() {
    let tareasNoTerminadas = [];
    if(listaTareas.length > 0) {
        tareasNoTerminadas = listaTareas.filter((tarea)=>{
            return tarea.pomosRestantes !== 0;
        })
    }
    cardTareasContainer.innerHTML = ''

    for(i=0; i < tareasNoTerminadas.length; i++) {
        let nodo = document.createElement('div');
        nodo.classList.add('card__container')
        nodo.innerHTML = tareasNoTerminadas[i].body;
        let pomosCompletos = tareasNoTerminadas[i].pomos - tareasNoTerminadas[i].pomosRestantes;
        nodo.lastElementChild.firstElementChild.firstElementChild.textContent = pomosCompletos;

        if(tareasNoTerminadas[i].checked === true) {
            nodo.firstElementChild.firstElementChild.classList.add('btn-tarea-checked');
            nodo.firstElementChild.lastElementChild.firstElementChild.classList.add('tarea-checked');
        }

        cardTareasContainer.appendChild(nodo)   
    }
    for(i=0; i < listaTareas.length; i++) {
        if(listaTareas[i].pomosRestantes == 0) {
            listaTareas.splice([i],1);
        }
    }
    btnCheck = document.querySelectorAll('.card__check');
    lineCheck = document.querySelectorAll('.card__line-check');
    funcionCheck = btnCheck.forEach(btn => {
        btn.addEventListener('click', (e)=>{
            e.target.classList.toggle('btn-tarea-checked');
            lineCheck[parseInt(e.target.className[0]) - 1].classList.toggle('tarea-checked');
            let positionDeCard = parseInt(e.target.parentElement.firstElementChild.className[0]);
            listaTareas[positionDeCard - 1].checkTarea();
        })
    });
    menuTaskOptions.classList.toggle('menu-settings-active')
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

btnGuardarSettings.addEventListener('click', guardarSettings);
btnComenzar.addEventListener('click', comenzarTemporizador);
btnSkip.addEventListener('click', skipearTemporizador);
btnMenu.addEventListener('click', abrirMenu);
btnTaskOptions.addEventListener('click', abrirTaskOptions);
btnRemoveAllTareas.addEventListener('click', quitarAllTareas)
btnRemoveTareas.addEventListener('click', quitarTareasTerminadas)

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