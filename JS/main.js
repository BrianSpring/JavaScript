// Variables/Constantes/Arrays
let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];  // Array de objetos para almacenar estudiantes y notas
let cantidadMaterias = 3;  // Número inicial de materias (puede cambiar)

// Función para generar los campos de entrada de materias dinámicamente
function generarCamposMaterias(materias = []) {
    const materiasContainer = document.getElementById('materiasContainer');
    materiasContainer.innerHTML = '';  // Limpiar los campos previos
    for (let i = 1; i <= cantidadMaterias; i++) {
        const nombreMateria = materias[i - 1] ? materias[i - 1].materia : `Materia ${i}`;
        const nota = materias[i - 1] ? materias[i - 1].nota : '';
        
        const nuevoCampo = document.createElement('div');
        nuevoCampo.innerHTML = `
            <label>Nombre de la materia ${i}: </label>
            <input type="text" name="nombreMateria${i}" value="${nombreMateria}" required>
            <input type="number" name="materia${i}" placeholder="Nota Materia ${i}" value="${nota}" min="0" max="10" required>
        `;
        materiasContainer.appendChild(nuevoCampo);
    }
}

// Función para añadir un nuevo estudiante con sus notas y nombres de materias
function addEstudiante(nombre, materiasNotas) {
    estudiantes.push({ nombre, materiasNotas });
    guardarEstudiantes();
    mostrarHistorial();
}

// Función para calcular el promedio de las notas de un estudiante
function calcularPromedio(materiasNotas) {
    const suma = materiasNotas.reduce((total, materia) => total + materia.nota, 0);
    return (suma / materiasNotas.length).toFixed(2);
}

// Función para guardar los estudiantes en localStorage
function guardarEstudiantes() {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

// Función para recuperar estudiantes de localStorage y mostrar el historial
function mostrarHistorial() {
    const historialContainer = document.getElementById('historial');
    historialContainer.innerHTML = '';  // Limpiar el historial para no duplicar entradas

    estudiantes.forEach((estudiante, index) => {
        const promedio = calcularPromedio(estudiante.materiasNotas);
        const estudianteDiv = document.createElement('div');
        estudianteDiv.innerHTML = `
            <p><strong>${estudiante.nombre}</strong> - Promedio: ${promedio}</p>
            <ul>
                ${estudiante.materiasNotas.map(materia => `<li>${materia.materia}: ${materia.nota}</li>`).join('')}
            </ul>
            <button onclick="editarEstudiante(${index})">Editar</button>
            <button onclick="eliminarEstudiante(${index})">Eliminar</button>
        `;
        historialContainer.appendChild(estudianteDiv);
    });
}

// Función para editar un estudiante
function editarEstudiante(index) {
    const estudiante = estudiantes[index];
    const nombreInput = document.getElementById('nombre');
    nombreInput.value = estudiante.nombre;

    // Regenerar los campos de materias para coincidir con el número de materias del estudiante
    cantidadMaterias = estudiante.materiasNotas.length;
    generarCamposMaterias(estudiante.materiasNotas);

    document.getElementById('guardarCambios').onclick = function() {
        guardarCambios(index);
    };
}

// Función para guardar cambios en un estudiante
function guardarCambios(index) {
    const nombre = document.getElementById('nombre').value;
    const materiasNotas = [];
    for (let i = 1; i <= cantidadMaterias; i++) {
        const nombreMateria = document.querySelector(`input[name="nombreMateria${i}"]`).value;
        const nota = parseFloat(document.querySelector(`input[name="materia${i}"]`).value);
        materiasNotas.push({ materia: nombreMateria, nota });
    }
    estudiantes[index] = { nombre, materiasNotas };
    guardarEstudiantes();
    mostrarHistorial();
}

// Función para eliminar un estudiante del historial
function eliminarEstudiante(index) {
    estudiantes.splice(index, 1);
    guardarEstudiantes();
    mostrarHistorial();
}

// Función para vaciar completamente el historial
function vaciarHistorial() {
    estudiantes = [];
    localStorage.removeItem('estudiantes');
    mostrarHistorial();
}

// Evento para cambiar la cantidad de materias dinámicamente
document.getElementById('cantidadMaterias').addEventListener('change', function() {
    cantidadMaterias = parseInt(this.value);  // Actualizar la cantidad de materias
    generarCamposMaterias();  // Generar los campos de entrada nuevamente
});

// Evento para añadir un nuevo estudiante al enviar el formulario
document.getElementById('formEstudiante').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const materiasNotas = [];
    for (let i = 1; i <= cantidadMaterias; i++) {
        const nombreMateria = document.querySelector(`input[name="nombreMateria${i}"]`).value;
        const nota = parseFloat(document.querySelector(`input[name="materia${i}"]`).value);
        materiasNotas.push({ materia: nombreMateria, nota });
    }
    addEstudiante(nombre, materiasNotas);
    document.getElementById('formEstudiante').reset();  // Limpiar el formulario
    generarCamposMaterias();  // Regenerar los campos vacíos
});

// Inicialización: Mostrar el historial cuando se carga la página
generarCamposMaterias();
mostrarHistorial();