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
    constructor(name, pomos, position) {
        this.name = name;
        this.pomos = pomos;
        this.position = position;
        this.checked = false;
        this.body = `
        <div class="card__container">
            <div class="card__left">
                <div class="${position} card__check"></div>
                <p class="card__title-tarea">${name}<span class="card__line-check"></span></p>
            </div>
            <div class="card__right">
                <div>
                    <p class="pomos-completados">0</p><p class="pomos-establecidos">${pomos}</p>
                </div>
                <img src="./assets/icons8-more-48-grey.png" alt="">
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


let funcionCheck;
let btnCheck;
let lineCheck;

function guardarNuevaTarea() {
    let nameTarea = document.querySelector('.agregar-card__name-tarea').value;
    let pomosTarea = document.querySelector('.agregar-card__input').value;
    let position = listaTareas.length + 1;

    let newTarea = new NewCard(nameTarea, pomosTarea, position);
    listaTareas.push(newTarea);
    cardTareasContainer.innerHTML += listaTareas[listaTareas.length - 1].body;
    objMidSection.tareaActiva = listaTareas[0].name;
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

}
btnTareaMenuGuardar.addEventListener('click', guardarNuevaTarea);
