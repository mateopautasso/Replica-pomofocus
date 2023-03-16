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
    agregarTareaMenu.classList.add('agregar-tarea-active');
})
btnTareaMenuCancelar.addEventListener('click', ()=>{
    agregarTareaMenu.classList.remove('agregar-tarea-active');
})



// Nuevas Cards

class NewCard {
    constructor(name, pomos, position) {
        this.name = name;
        this.pomos = pomos;
        this.pomosRestantes = pomos;
        this.position = position;
        this.checked = false;
        this.body = `<div class="card__left">
                <div class="${position} card__check"></div>
                <p class="card__title-tarea">${name}<span class="card__line-check"></span></p>
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
                                    <img class="card__btn-options" src="./assets/icons8-up-24.png" alt="">
                                </button>
                                <button class="card__edit-pomos__btn card__btn-restar">
                                    <img class="card__btn-options" src="./assets/icons8-down-24.png" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="card__options--right">
                            <button class="agregar-card__btn-cancelar agregar-card__btn-cancelar--card-options">Cancelar</button>
                            <button class="agregar-card__btn-guardar agregar-card__btn-guardar--card-options">Guardar</button>
                        </div>
                    </div>
                    <img class="card__btn-options" src="./assets/icons8-more-48-grey.png" alt="">
                </div>    
            </div>`
    }
    checkTarea() {
        if(this.checked === false) {
            this.checked = true;
        } else {
            this.checked = false;
        }
    }
}

let listaTareas = [];
let funcionCheck;
let cardOptions;
let btnCheck;
let lineCheck;

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

    btnCheck = document.querySelectorAll('.card__check');
    lineCheck = document.querySelectorAll('.card__line-check');
    funcionCheck = btnCheck.forEach(btn => {
        btn.addEventListener('click', (e)=>{
            e.target.classList.toggle('btn-tarea-checked');
            lineCheck[parseInt(e.target.className[0]) - 1].classList.toggle('tarea-checked')
            newTarea.checkTarea();
        })
    });

    btnCardOptions = document.querySelectorAll('.card__btn-options');

    cardOptions = btnCardOptions.forEach((btn)=>{
        btn.addEventListener('click', (e)=>{
            e.target.previousElementSibling.classList.add('menu-settings-active');
            let positionEnArray = parseInt(e.target.parentElement.parentElement.previousElementSibling.firstElementChild.className[0]) - 1;
            let pomosEstablecidos = listaTareas[positionEnArray].pomos;
            let pomosCompletos = listaTareas[positionEnArray].pomos - listaTareas[positionEnArray].pomosRestantes;
            e.target.previousElementSibling.firstElementChild.firstElementChild.textContent = pomosCompletos;
            e.target.previousElementSibling.firstElementChild.children[1].textContent = pomosEstablecidos;

            let btnSumarPomo = e.target.previousElementSibling.firstElementChild.lastElementChild.firstElementChild;
            let btnRestarPomo = e.target.previousElementSibling.firstElementChild.lastElementChild.lastElementChild;
            let btnCancelar = e.target.previousElementSibling.lastElementChild.firstElementChild;
            let btnGuardar = e.target.previousElementSibling.lastElementChild.lastElementChild;

            let pomosDeCardModified = listaTareas[positionEnArray].pomos;
            let pomosRestDeCardModified = listaTareas[positionEnArray].pomosRestantes;
            console.log(pomosDeCardModified)

            function sumarPomo() {
                pomosDeCardModified = parseInt(pomosDeCardModified) + 1;
                pomosRestDeCardModified = parseInt(pomosRestDeCardModified) + 1;

                e.target.previousElementSibling.firstElementChild.children[1].textContent = pomosDeCardModified;
            }
            function restarPomo() {
                if(pomosDeCardModified > 1) {
                    pomosDeCardModified = parseInt(pomosDeCardModified) - 1;
                    pomosRestDeCardModified = parseInt(pomosRestDeCardModified) - 1;
    
                    e.target.previousElementSibling.firstElementChild.children[1].textContent = pomosDeCardModified;
                }
            }
            btnSumarPomo.addEventListener('click', sumarPomo);
            btnRestarPomo.addEventListener('click', restarPomo);


            btnCancelar.addEventListener('click', ()=>{
                e.target.previousElementSibling.classList.remove('menu-settings-active');
                btnSumarPomo.removeEventListener('click', sumarPomo);
                btnRestarPomo.removeEventListener('click', restarPomo);
            });
            btnGuardar.addEventListener('click', ()=>{
                e.target.previousElementSibling.classList.remove('menu-settings-active');
                btnSumarPomo.removeEventListener('click', sumarPomo);
                btnRestarPomo.removeEventListener('click', restarPomo);
                listaTareas[positionEnArray].pomos = pomosDeCardModified;
                listaTareas[positionEnArray].pomosRestantes = pomosRestDeCardModified;
                e.target.parentElement.parentElement.firstElementChild.lastElementChild.textContent = pomosDeCardModified;
            });
        })
    }) 
}

function sumarPomosEnTarea() {
    let tareaActiva = listaTareas.find((tarea)=>{
        return tarea.pomosRestantes != 0;
    })
    let pomosCompletos = document.querySelectorAll('.pomos-completados');
    console.log(tareaActiva)

    if(tareaActiva != undefined) {
        pomosCompletos[tareaActiva.position - 1].textContent = parseInt(pomosCompletos[tareaActiva.position - 1].textContent) + 1
        tareaActiva.pomosRestantes = tareaActiva.pomosRestantes - 1;
    }
}

btnTareaMenuGuardar.addEventListener('click', guardarNuevaTarea);