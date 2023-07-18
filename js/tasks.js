const cardContainer = document.querySelector('.card-container');
const cardAgregarCardContainer = document.querySelector('.card-container__agregar-card');
const cardTareasContainer = document.querySelector('.card-container__cards');

// Card para agregar Cards
let cardAgregarTarea = `
        <div class="card-container__card--agregar">
            <img src="./assets/icons8-add-24.png" alt="">
            <p>Agregar</p>
        </div>
        <div class="agregar-card">
            <div class="agregar-card__name-tarea-container">
                <input type="text" name="" id="" class="agregar-card__name-tarea" placeholder="Que tarea estás por realizar?">
            </div>
            <div class="agregar-card__pomo-container">
                <label for="" class="agregar-card__label">Pomodoros:</label>
                <input type="number" class="agregar-card__input" value="1">
            </div>
            <div class="agregar-card__btn-container">
                <button class="agregar-card__btn-cancelar">Cancelar</button>
                <button class="agregar-card__btn-guardar">Guardar</button>
            </div>
        </div>
`;
cardAgregarCardContainer.innerHTML = cardAgregarTarea;

// Eventos agregar cards
const agregarTareaElemento = document.querySelector('.card-container__card--agregar');
const agregarTareaMenu = document.querySelector('.agregar-card');
const btnTareaMenuCancelar = document.querySelector('.agregar-card__btn-cancelar')
const btnTareaMenuGuardar = document.querySelector('.agregar-card__btn-guardar')

agregarTareaElemento.addEventListener('click', ()=>{
    setTimeout(()=>{
        window.scroll({
            top: 1000,
            left: 0,
            behavior: "smooth",
          });
    },200)
    agregarTareaMenu.classList.add('agregar-tarea-active');
})
btnTareaMenuCancelar.addEventListener('click', ()=>{
    agregarTareaMenu.classList.remove('agregar-tarea-active');
})

function btnCheck () {
    event.target.classList.toggle('btn-tarea-checked');
}

// Nuevas Cards

class NewCard {
    constructor(name, pomos, position) {
        this.name = name;
        this.pomos = pomos;
        this.pomosRestantes = pomos;
        this.position = position;
        this.checked = false;
        this.body = `<div class="card__left">
                <div onclick="btnCheck()" class="${position} card__check"></div>
                <p class="card__title-tarea">${name}</p>
            </div>
            <div class="card__right">
                <div>
                    <p class="pomos-completados pomos-completados-styles">0</p><p class="pomos-establecidos">${pomos}</p>
                </div>
                <div class="card__options-container">
                    <div class="card__options">
                        <div class="card__options--left">
                            <p class="pomos-completados-styles">0</p><p class="pomos-establecidos">${pomos}</p>
                            <div class="card__edit-pomos">
                                <button class="card__edit-pomos__btn card__btn-sumar">
                                    <img id="sumar-pomo" src="./assets/icons8-up-24.png" alt="">
                                </button>
                                <button class="card__edit-pomos__btn card__btn-restar">
                                    <img id="restar-pomo" src="./assets/icons8-down-24.png" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="card__options--right">
                            <button id="eliminar" class="agregar-card__btn-eliminar agregar-card__btn-eliminar--card-options">Eliminar</button>
                            <button id="cancelar" class="agregar-card__btn-cancelar agregar-card__btn-cancelar--card-options">Cancelar</button>
                            <button id="guardar" class="agregar-card__btn-guardar agregar-card__btn-guardar--card-options">Guardar</button>
                        </div>
                    </div>
                    <img class="card__btn-options" src="./assets/icons8-more-48-grey.png" alt="">
                </div>    
            </div>`
    }
}

let listaTareas = [];
let cardOptions;
let positionEnArray;
let pomosDeCardModified;
let pomosRestDeCardModified;

let btnSumarPomo;
let btnRestarPomo;
let btnEliminar;
let btnCancelar;
let btnGuardar;

function sumarPomosEnTarea() {
    let tareaActiva = listaTareas.find((tarea)=>{
        return tarea.pomosRestantes != 0;
    })
    let pomosCompletos = document.querySelectorAll('.pomos-completados');

    if(tareaActiva != undefined) {
        pomosCompletos[tareaActiva.position - 1].textContent = parseInt(pomosCompletos[tareaActiva.position - 1].textContent) + 1
        tareaActiva.pomosRestantes = tareaActiva.pomosRestantes - 1;
    }
}

function sumarPomo(e) {
    pomosDeCardModified = parseInt(pomosDeCardModified) + 1;
    pomosRestDeCardModified = parseInt(pomosRestDeCardModified) + 1;

    e.target.parentElement.parentElement.parentElement.children[1].textContent = pomosDeCardModified;
}
function restarPomo(e) {
    if(pomosDeCardModified > 1) {
        pomosDeCardModified = parseInt(pomosDeCardModified) - 1;
        pomosRestDeCardModified = parseInt(pomosRestDeCardModified) - 1;

        e.target.parentElement.parentElement.parentElement.children[1].textContent = pomosDeCardModified;
    }
}

function cancelar(e) {
    e.target.parentElement.parentElement.classList.remove('menu-settings-active');
}
function guardar(e) {
    e.target.parentElement.parentElement.classList.remove('menu-settings-active');
    listaTareas[positionEnArray].pomos = pomosDeCardModified;
    listaTareas[positionEnArray].pomosRestantes = pomosRestDeCardModified;
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.lastElementChild.textContent = pomosDeCardModified;
}
function eliminar(e) {
    let pos = parseInt(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.className[0])
    let cardAEliminar = listaTareas.find((card)=>{
        return card.position === pos;
    })
    let indexCard = listaTareas.indexOf(cardAEliminar);

    listaTareas.splice(indexCard, 1);
    let nodoAeliminar = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
    cardTareasContainer.removeChild(nodoAeliminar);
}

function guardarNuevaTarea() {
    let nameTarea = document.querySelector('.agregar-card__name-tarea').value;
    let pomosTarea = parseInt(document.querySelector('.agregar-card__input').value);
    let position = listaTareas.length + 1;

    let newTarea = new NewCard(nameTarea, pomosTarea, position);
    listaTareas.push(newTarea);
    
    let nodo = document.createElement('div');
    nodo.classList.add('card__container');
    nodo.innerHTML = listaTareas[listaTareas.length - 1].body;
    cardTareasContainer.appendChild(nodo);

    let tareaEnCola = listaTareas.find((tarea)=>{
        return tarea.pomosRestantes != '0';
    })
    objMidSection.tareaActiva = tareaEnCola.name;
    msgCiclos.textContent = objMidSection.tareaActiva;  

    agregarTareaMenu.classList.remove('agregar-tarea-active');

    const btnCardOptions = document.querySelectorAll('.card__btn-options');
    btnCardOptions.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            e.target.previousElementSibling.classList.add('menu-settings-active');
            positionEnArray = parseInt(e.target.parentElement.parentElement.previousElementSibling.firstElementChild.className[0]) - 1;
            let pomosEstablecidos = listaTareas[positionEnArray].pomos;
            let pomosCompletos = listaTareas[positionEnArray].pomos - listaTareas[positionEnArray].pomosRestantes;
            e.target.previousElementSibling.firstElementChild.firstElementChild.textContent = pomosCompletos;
            e.target.previousElementSibling.firstElementChild.children[1].textContent = pomosEstablecidos;

            pomosDeCardModified = listaTareas[positionEnArray].pomos;
            pomosRestDeCardModified = listaTareas[positionEnArray].pomosRestantes;
        })
    })

    nodo.addEventListener('click', (e)=>{
        switch(e.target.id) {
            case 'sumar-pomo':
                sumarPomo(e)
                break;
            case 'restar-pomo':
                restarPomo(e)
                break;
            case 'cancelar':
               cancelar(e);
               break;
            case 'guardar':
               guardar(e);
               break;
            case 'eliminar':
               eliminar(e);
               break;
        }
    })
}

btnTareaMenuGuardar.addEventListener('click', guardarNuevaTarea);