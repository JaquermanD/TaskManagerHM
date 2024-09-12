// Obtenemos los elementos de la interfaz
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Función para añadir una nueva tarea
function addTask() {
    const taskText = taskInput.value.trim();

    // Validación: Verificar que la tarea no esté vacía
    if (taskText === "") {
        console.error("Error: La tarea no puede estar vacía");
        alert("La tarea no puede estar vacía");
        return;
    }

    // Crear una nueva tarea
    const taskItem = document.createElement('div');
    taskItem.className = 'box task-item';
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="button is-small is-info is-outlined" onclick="editTask(this)">✏️</button>
            <button class="button is-small is-success is-outlined" onclick="completeTask(this)">✔️</button>
            <button class="button is-small is-danger is-outlined" onclick="deleteTask(this)">❌</button>
        </div>
    `;

    // Agregar la nueva tarea a la lista
    taskList.appendChild(taskItem);

    // Limpiar el Input
    taskInput.value = "";
}

// Función para marcar una tarea como completada
function completeTask(button) {
    const taskItem = button.closest('.task-item');
    taskItem.classList.toggle('completed');
}

// Función para eliminar una tarea
function deleteTask(button) {
    const taskItem = button.closest('.task-item');
    taskList.removeChild(taskItem);
}

// Función para editar una tarea
function editTask(button) {
    const taskItem = button.closest('.task-item');
    const taskTextElement = taskItem.querySelector('.task-text');

    // Crear un Input para editar la tarea
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.className = 'input';
    taskInput.value = taskTextElement.textContent;

    // Reemplazar el texto de la tarea con el Input
    taskItem.replaceChild(taskInput, taskTextElement);

    // Cambiar el botón de editar por un botón de guardar
    button.textContent = '💾';
    button.classList.remove('is-info');
    button.classList.add('is-warning');
    button.onclick = function () {
        saveTask(taskInput, button);
    };
}

// Función para guardar una tarea editada
function saveTask(inputElement, button) {
    const taskItem = button.closest('.task-item');

    // Validación: Verificar que la tarea no esté vacía
    if (inputElement.value.trim() === "") {
        console.error("Error: La tarea no puede estar vacía");
        alert("La tarea no puede estar vacía");
        return;
    }

    // Crear un elemento de texto para la tarea
    const taskTextElement = document.createElement('span');
    taskTextElement.className = 'task-text';
    taskTextElement.textContent = inputElement.value;

    // Reemplazar el campo de entrada con el texto de la tarea
    taskItem.replaceChild(taskTextElement, inputElement);

    // Cambiar el botón de guardar por un botón de editar
    button.textContent = '✏️';
    button.classList.remove('is-warning');
    button.classList.add('is-info');
    button.onclick = function () {
        editTask(button);
    };
}

// Validaciones adicionales
taskInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
