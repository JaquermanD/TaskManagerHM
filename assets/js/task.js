$(function () {
    $.ajax({
        url: './controllers/taskController.php',
        type: 'POST',
        data: { _action:"READ" },
        success: function (res) {
            const data = JSON.parse(res);
            taskList.html("");
            data.forEach(element => {
                createTask(element['text'],element['status']);
            });
        },
        error: function (xhr) {
            console.error('Error en la solicitud. Código de estado: ' + xhr.status);
        }
    });
});

// Obtenemos los elementos de la interfaz
const taskInput = $('#taskInput');
const taskList = $('#taskList');

// Función para añadir una nueva tarea
function addTask() {
    const taskText = taskInput.val().trim();

    // Validación: Verificar que la tarea no esté vacía
    if (taskText === "") {
        console.error("Error: La tarea no puede estar vacía");
        alert("La tarea no puede estar vacía");
        return;
    }

    //PROCESO DE GUARDAR LA TAREA
    $.ajax({
        url: './controllers/taskController.php',
        type: 'POST',
        data: { _action:"CREATE", texto: taskText },
        success: function(res) {
            console.log(res);
        },
        error: function (xhr) {
            console.error('Error en la solicitud. Código de estado: ' + xhr.status);
        }
    });

    createTask(taskText);

    // Limpiar el Input
    taskInput.val('');
}

function createTask(taskText, status) {
    // Crear una nueva tarea
    let complete = '';
    if (status == 1) {
        complete = "completed";
    }
    const taskItem = $(`
        <div class="box task-item ${complete}">
            <span class="task-text">${taskText}</span>
            <div class="task-buttons">
                <button class="button is-small is-info is-outlined edit-btn">✏️</button>
                <button class="button is-small is-success is-outlined complete-btn">✔️</button>
                <button class="button is-small is-danger is-outlined delete-btn">❌</button>
            </div>
        </div>
    `);
    // Agregar la nueva tarea a la lista
    taskList.append(taskItem);
}

// Función para marcar una tarea como completada
$(document).on('click', '.complete-btn', function() {
    const taskItem = $(this).closest('.task-item');
    taskItem.toggleClass('completed');
});

// Función para eliminar una tarea
$(document).on('click', '.delete-btn', function() {
    const taskItem = $(this).closest('.task-item');
    taskItem.remove();
});

// Función para editar una tarea
$(document).on('click', '.edit-btn', function() {
    const taskItem = $(this).closest('.task-item');
    const taskTextElement = taskItem.find('.task-text');

    // Crear un Input para editar la tarea
    const taskInput = $('<input type="text" class="input">').val(taskTextElement.text());

    // Reemplazar el texto de la tarea con el Input
    taskTextElement.replaceWith(taskInput);

    // Cambiar el botón de editar por un botón de guardar
    $(this).text('💾').removeClass('is-info').addClass('is-warning').off('click').on('click', function() {
        saveTask(taskInput, $(this));
    });
});

// Función para guardar una tarea editada
function saveTask(inputElement, button) {
    const taskItem = button.closest('.task-item');

    // Validación: Verificar que la tarea no esté vacía
    if (inputElement.val().trim() === "") {
        console.error("Error: La tarea no puede estar vacía");
        alert("La tarea no puede estar vacía");
        return;
    }

    // Crear un elemento de texto para la tarea
    const taskTextElement = $('<span class="task-text"></span>').text(inputElement.val());

    // Reemplazar el campo de entrada con el texto de la tarea
    inputElement.replaceWith(taskTextElement);

    // Cambiar el botón de guardar por un botón de editar
    button.text('✏️').removeClass('is-warning').addClass('is-info').off('click').on('click', function() {
        editTask(button);
    });
}

// Validaciones adicionales
taskInput.on('keypress', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
