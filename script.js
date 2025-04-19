const todos = JSON.parse(localStorage.getItem('todos')) || [];
const RENDER_EVENT = "render_todos";

const addList = document.getElementById('addList');
const mapel = document.getElementById('mapel');
const day = document.getElementById('day');
const desc = document.getElementById('desc');
const todoList = document.getElementById('todoList');
const formTodo = document.getElementById('formTodo');

document.addEventListener('DOMContentLoaded', () => {
    formTodo.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
        formTodo.reset();
    });
    document.addEventListener(RENDER_EVENT, () => {
        renderTodo();
    });
});


function addTodo() {
    const todo = {
        id: +new Date(),
        mapel: mapel.value,
        day: day.value,
        desc: desc.value,
    };
    todos.push(todo);
    saveTodo();
};

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
    document.dispatchEvent(new Event(RENDER_EVENT));
};

function renderTodo() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const cardItem = document.createElement('div');
        cardItem.setAttribute('id', `${todo.id}`)
        cardItem.classList.add('card');
        cardItem.innerHTML = `
        <div class="main-card">
            <aside>
            <h3 class="card-content">${todo.mapel}</h3>
            <p class="card-content">
            <strong>Hari:</strong>
            <span>${todo.day}</span>
            </p>
            <p class="card-content card-desc">
            <strong>Tugas:</strong>
            <span>${todo.desc}</span>
            </p>
            </aside>
            <input type="checkbox" name="check" class="checkbox">
            </div>
            <button class="card-button-delete">Hapus</button>
            `;
            todoList.append(cardItem);
            
            const buttonDelete = cardItem.querySelector('.card-button-delete')
            const checkbox = cardItem.querySelector('.checkbox');
            buttonDelete.addEventListener('click', (e) => {
                deleteTodo(e.target, checkbox);
            });
        });
    };

function deleteTodo(todolisted, checkbox) {
    const todoCard = todolisted.parentNode;
    const id = parseInt(todoCard.getAttribute("id"));
    const index = todos.findIndex(todo => todo.id === id);

    if(todos !== -1 && checkbox.checked) {
        todos.splice(index, 1);
        saveTodo();
    }
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((error) => console.log("Service Worker registration failed:", error));
};


saveTodo();