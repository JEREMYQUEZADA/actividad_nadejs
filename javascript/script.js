document.addEventListener("DOMContentLoaded", function () {
    // Obtener las tareas guardadas del Local Storage al cargar la página
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let tareas = storedTasks; // Inicializar las tareas con las almacenadas

    const listaTareas = document.getElementById("tareas");
    const btnCompletadas = document.getElementById("btnCompletadas");
    const btnPorCompletar = document.getElementById("btnPorCompletar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnGuardar = document.getElementById("btnGuardar");
    const btnAgregarNueva = document.getElementById("btnAgregarNueva");
    const btnBorrarCompletadas = document.getElementById("btnBorrarCompletadas");
    const editarTarea = document.getElementById("editarTarea");
    const agregarTarea = document.getElementById("agregarTarea");
    const editTaskName = document.getElementById("editTaskName");
    const newTaskName = document.getElementById("newTaskName");

    // Función para guardar las tareas en el Local Storage
    function guardarTareasEnLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tareas));
    }

    // Función para mostrar las tareas en la lista
    function mostrarTareas(completadas = false) {
        listaTareas.innerHTML = "";
        for (let i = 0; i < tareas.length; i++) {
            const tarea = tareas[i];
            if ((completadas && tarea.completed) || (!completadas && !tarea.completed)) {
                const li = document.createElement("li");
                li.textContent = tarea.name;
                if (tarea.completed) {
                    li.style.textDecoration = "line-through";
                } else {
                    const completarBtn = document.createElement("button");
                    completarBtn.textContent = "Completar";
                    completarBtn.addEventListener("click", () => {
                        tarea.completed = true;
                        guardarTareasEnLocalStorage(); // Guardar cambios
                        mostrarTareas(completadas);
                    });
                    li.appendChild(completarBtn);
                }
                li.addEventListener("click", () => {
                    editarTarea.style.display = "block";
                    editTaskName.value = tarea.name;
                    btnGuardar.addEventListener("click", () => {
                        tarea.name = editTaskName.value;
                        editarTarea.style.display = "none";
                        guardarTareasEnLocalStorage(); // Guardar cambios
                        mostrarTareas(completadas);
                    });
                });
                listaTareas.appendChild(li);
            }
        }
    }

    // Evento para ver tareas completadas
    btnCompletadas.addEventListener("click", () => {
        mostrarTareas(true); // Mostrar solo las completadas
        guardarTareasEnLocalStorage(); // Guardar cambios al hacer clic en "Ver Completadas"
    });

    // Evento para ver tareas por completar
    btnPorCompletar.addEventListener("click", () => {
        mostrarTareas(); // Mostrar solo las por completar
        guardarTareasEnLocalStorage(); // Guardar cambios al hacer clic en "Ver por Completar"
    });

    // Evento para agregar nueva tarea
    btnAgregar.addEventListener("click", () => {
        agregarTarea.style.display = "block";
        btnAgregarNueva.addEventListener("click", () => {
            const nuevaTarea = {
                name: newTaskName.value,
                completed: false,
            };
            tareas.push(nuevaTarea);
            guardarTareasEnLocalStorage(); // Guardar cambios al agregar una nueva tarea
            agregarTarea.style.display = "none";
            newTaskName.value = "";
            mostrarTareas();
        });
    });

    // Evento para borrar las tareas completadas
    btnBorrarCompletadas.addEventListener("click", () => {
        tareas = tareas.filter((tarea) => !tarea.completed);
        guardarTareasEnLocalStorage(); // Guardar cambios al borrar tareas completadas
        mostrarTareas();
    });

    mostrarTareas();
});


  




document.addEventListener("DOMContentLoaded", function () {
    // ... (código anterior)

    let verCompletadasVisible = false; // Variable de estado para Ver Completadas
    let verPorCompletarVisible = false; // Variable de estado para Ver por Completar
    let agregarTareaVisible = false; // Variable de estado para Agregar Tarea

    // Función para mostrar u ocultar Ver Completadas
    function toggleVerCompletadas() {
        verCompletadasVisible = !verCompletadasVisible;
        if (verCompletadasVisible) {
            mostrarTareas(true); // Mostrar solo las completadas
        } else if (!verPorCompletarVisible) {
            listaTareas.innerHTML = ""; // Ocultar las tareas solo si Ver por Completar no está visible
        }
        guardarTareasEnLocalStorage();
    }

    // Función para mostrar u ocultar Ver por Completar
    function toggleVerPorCompletar() {
        verPorCompletarVisible = !verPorCompletarVisible;
        if (verPorCompletarVisible) {
            mostrarTareas(); // Mostrar solo las por completar
        } else if (!verCompletadasVisible) {
            listaTareas.innerHTML = ""; // Ocultar las tareas solo si Ver Completadas no está visible
        }
        guardarTareasEnLocalStorage();
    }

    // Función para mostrar u ocultar Agregar Tarea
    function toggleAgregarTarea() {
        agregarTareaVisible = !agregarTareaVisible;
        if (agregarTareaVisible) {
            agregarTarea.style.display = "block"; // Mostrar el formulario
        } else {
            agregarTarea.style.display = "none"; // Ocultar el formulario
        }
    }

    // Evento para Ver Completadas
    btnCompletadas.addEventListener("click", toggleVerCompletadas);

    // Evento para Ver por Completar
    btnPorCompletar.addEventListener("click", toggleVerPorCompletar);

    // Evento para Agregar Tarea
    btnAgregar.addEventListener("click", () => {
        toggleAgregarTarea();
        if (!agregarTareaVisible) { // Si se está ocultando el formulario, agrega la tarea
            const nuevaTarea = {
                name: newTaskName.value,
                completed: false,
            };
            tareas.push(nuevaTarea);
            guardarTareasEnLocalStorage(); // Guardar cambios al agregar una nueva tarea
            newTaskName.value = "";
            mostrarTareas(verCompletadasVisible); // Mostrar las tareas según el estado de Ver Completadas
        }
    });

    // ... (código anterior)
});

   