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

listaTareas = [];

class NewCard {
    constructor(name, pomos) {
        this.name = name;
        this.pomos = pomos;
        this.checked = false;
        this.body = `
        <div class="card__container">
            <div class="card__left">
                <div class="card__check"></div>
                <p class="card__title-tarea">${name}<span></span></p>
            </div>
            <div class="card__right">
                <div>
                    <p>0<span>/</span></p><p>${pomos}</p>
                </div>
                <img src="./assets/icons8-more-48-grey.png" alt="">
            </div>
        </div>`
    }
    checkTarea() {
        this.checked = true;
    }
}

function guardarNuevaTarea() {
    let nameTarea = document.querySelector('.agregar-card__name-tarea').value;
    let pomosTarea = document.querySelector('.agregar-card__input').value;

    let newTarea = new NewCard(nameTarea, pomosTarea);
    listaTareas.unshift(newTarea);
    cardTareasContainer.innerHTML += listaTareas[0].body

    agregarTareaMenu.classList.remove('agregar-tarea-active');
}
btnTareaMenuGuardar.addEventListener('click', guardarNuevaTarea)



