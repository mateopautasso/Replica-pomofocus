const cardContainer = document.querySelector('.card-container')

class nuevaTarea {
    constructor(name, pomos) {
        this.name = name
        this.pomos = pomos
    }
}
const listaTareas = [];

let cardAgregarTarea = `
    <div class="card-container__agregar-card">
        <div class="card-container__card--agregar card">
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
    </div>
`;
listaTareas.push(cardAgregarTarea);
cardContainer.innerHTML += listaTareas[listaTareas.length - 1];

function guardarNuevaTarea() {

}


// Eventos cards
const agregarTareaElemento = document.querySelector('.card-container__card--agregar');
const lineCheckTarea = document.querySelector('.card__title-tarea span');
const btnCheckTarea = document.querySelector('.card__check');
const agregarTareaMenu = document.querySelector('.agregar-card');
const btnTareaMenuCancelar = document.querySelector('.agregar-card__btn-cancelar')
const btnTareaMenuGuardar = document.querySelector('.agregar-card__btn-guardar')

btnCheckTarea.addEventListener('click', ()=>{
    lineCheckTarea.classList.toggle('tarea-checked');
    btnCheckTarea.classList.toggle('btn-tarea-checked')
})
agregarTareaElemento.addEventListener('click', ()=>{
    agregarTareaMenu.classList.add('agregar-tarea-active');
})
btnTareaMenuCancelar.addEventListener('click', ()=>{
    agregarTareaMenu.classList.remove('agregar-tarea-active');
})