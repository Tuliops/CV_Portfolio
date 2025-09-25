// Obtiene los elementos del formulario y listas de tareas
const taskForm = document.getElementById('task-form'); // Formulario para agregar tareas
const taskInput = document.getElementById('task-input'); // Campo de entrada para el texto de la tarea
const dueDateInput = document.getElementById('due-date'); // Campo de entrada para la fecha de vencimiento
const prioritySelect = document.getElementById('priority-select'); // Selector de prioridad
const altaPriorityList = document.getElementById('alta-priority-list'); // Lista de tareas de alta prioridad
const mediaPriorityList = document.getElementById('media-priority-list'); // Lista de tareas de prioridad media
const bajaPriorityList = document.getElementById('baja-priority-list'); // Lista de tareas de baja prioridad
const darkModeBtn = document.getElementById('dark-mode-btn'); // Botón para cambiar entre modo oscuro y claro

// Obtiene las tareas almacenadas localmente o inicializa un array vacío
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para renderizar las tareas en las listas de prioridad
function renderTasks() {
    // Limpia las listas de tareas
    altaPriorityList.innerHTML = '';
    mediaPriorityList.innerHTML = '';
    bajaPriorityList.innerHTML = '';

    // Ordena las tareas: primero por fecha (las más cercanas primero), luego las sin fecha al final
    tasks.sort((a, b) => {
        // Verifica si ambas tareas tienen fecha de vencimiento
        if (a.dueDate && b.dueDate) {
            // Compara las fechas de vencimiento
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (a.dueDate) {
            // Si solo la tarea 'a' tiene fecha, la coloca primero
            return -1;
        } else if (b.dueDate) {
            // Si solo la tarea 'b' tiene fecha, la coloca primero
            return 1;
        } else {
            // Si ninguna tarea tiene fecha, mantiene el orden actual
            return 0;
        }
    });

    // Itera sobre cada tarea y la agrega a la lista correspondiente
    tasks.forEach(task => {
        const taskItem = document.createElement('li'); // Crea un elemento de lista para cada tarea
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <span>${task.dueDate || 'Fecha no Especificada'}</span> 
            <span class="priority-alert" data-priority="${task.priority}"></span>
        `;

        // Agrega la tarea a la lista correspondiente según su prioridad
        switch (task.priority) {
            case 'alta':
                altaPriorityList.appendChild(taskItem);
                break;
            case 'media':
                mediaPriorityList.appendChild(taskItem);
                break;
            case 'baja':
                bajaPriorityList.appendChild(taskItem);
                break;
        }
    });

    // Agrega alertas visuales para la prioridad
    const priorityAlerts = document.querySelectorAll('.priority-alert'); // Selecciona todos los elementos de alerta de prioridad
    priorityAlerts.forEach(alert => {
        const priority = alert.dataset.priority; // Obtiene la prioridad de la alerta
        // Agrega un indicador visual según la prioridad
        switch (priority) {
            case 'alta':
                alert.textContent = '!'; // Indica prioridad alta
                alert.style.color = 'red'; // Color rojo
                break;
            case 'media':
                alert.textContent = '-'; // Indica prioridad media
                alert.style.color = 'orange'; // Color naranja
                break;
            case 'baja':
                alert.textContent = '*'; // Indica prioridad baja
                alert.style.color = 'green'; // Color verde
                break;
        }
    });
}

// Función para guardar las tareas en el almacenamiento local
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Agrega un event listener al formulario para agregar tareas
taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita la recarga de la página

    const taskText = taskInput.value; // Obtiene el texto de la tarea
    const dueDate = dueDateInput.value; // Obtiene la fecha de vencimiento
    const priority = prioritySelect.value; // Obtiene la prioridad

    // Verifica si el campo de texto está vacío
    if (!taskText) {
        alert('Por favor, ingresa el texto de la tarea.'); // Muestra una alerta específica
        taskInput.classList.add('error'); // Resalta el campo de texto
        return; // Detiene la ejecución
    } else {
        taskInput.classList.remove('error'); // Remueve el resaltado si ya no hay error
    }

    // Verifica si la prioridad no está seleccionada
    if (!priority) {
        alert('Por favor, selecciona la prioridad de la tarea.'); // Muestra una alerta específica
        prioritySelect.classList.add('error'); // Resalta el selector de prioridad
        return; // Detiene la ejecución
    } else {
        prioritySelect.classList.remove('error'); // Remueve el resaltado si ya no hay error
    }

    const newTask = {
        id: Date.now(), // Genera un ID único
        text: taskText, // Texto de la tarea
        dueDate: dueDate, // Fecha de vencimiento
        priority: priority // Prioridad
    };

    tasks.push(newTask); // Agrega la tarea al array
    saveTasks(); // Guarda las tareas
    renderTasks(); // Renderiza las tareas

    // Limpia los campos del formulario
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = '';
});

// Función para actualizar el texto del botón según el modo actual
function updateButtonText() {
    // Verifica si el body tiene la clase 'light-mode'
    if (document.body.classList.contains('light-mode')) {
        darkModeBtn.textContent = 'Modo oscuro'; // Cambia el texto a 'Modo oscuro'
    } else {
        darkModeBtn.textContent = 'Modo claro'; // Cambia el texto a 'Modo claro'
    }
}

// Agrega un event listener al botón de modo oscuro
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode'); // Alterna el modo claro
    updateButtonText(); // Actualiza el texto del botón
});

// Renderiza las tareas iniciales
renderTasks();

// Actualiza el texto del botón al cargar la página
updateButtonText();