<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas Tarea 1</title>
    <!-- Importar Bulma -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <div class="section">
        <div class="container">
            <h1 class="title">Lista de Tareas Tarea 1</h1>

            <!-- Input y botón para agregar tareas -->
            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input" type="text" id="taskInput" placeholder="Añade una Tarea">
                </div>
                <div class="control">
                    <button class="button is-primary" onclick="addTask()">Add</button>
                </div>
            </div>

            <!-- Lista de tareas -->
            <div class="task-list" id="taskList">
                <!-- Aquí se agregarán las tareas -->
            </div>
        </div>
    </div>

    <script src="assets/js/task.js"></script>
</body>
</html>
