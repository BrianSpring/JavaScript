// Variables/Constantes/Arrays
let notas = [];  // Array para almacenar las notas de cada materia

// Funciones
// Función para añadir una nueva nota al array de objetos
function addNota(materia, nota) {
    notas.push({ materia, nota: parseFloat(nota) });
}

// Función para calcular el promedio de las notas
function calcularPromedio() {
    const suma = notas.reduce((total, notaObj) => total + notaObj.nota, 0);
    return (suma / notas.length).toFixed(2);
}

// Función para mostrar los resultados en el DOM
function mostrarResultados() {
    const promedio = calcularPromedio();
    const resultadoDiv = document.getElementById('result');
    resultadoDiv.textContent = `El promedio final es: ${promedio}`;
}

// Función para guardar las notas en localStorage
function guardarNotas() {
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Función para recuperar las notas de localStorage
function recuperarNotas() {
    const notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        notas.forEach((notaObj, index) => {
            añadirCampoNota(index + 1, notaObj.nota);
        });
    }
}

// Función para borrar las notas de localStorage y del DOM
function borrarNotas() {
    localStorage.removeItem('notas');
    notas = [];
    document.getElementById('inputContainer').innerHTML = '';
    document.getElementById('result').textContent = '';
    
    // Volver a añadir los campos de notas para ingresar nuevas
    for (let i = 1; i <= 3; i++) {
        añadirCampoNota(i);
    }
}

// Eventos
// Evento para añadir las notas cuando se envía el formulario
document.getElementById('notaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputElements = document.querySelectorAll('.notaInput');
    inputElements.forEach(input => {
        const materia = input.getAttribute('data-materia');
        const nota = input.value;
        addNota(materia, nota);
    });
    guardarNotas();
    mostrarResultados();
});

// Evento para limpiar las notas cuando se hace clic en el botón de limpiar
document.getElementById('clearStorage').addEventListener('click', borrarNotas);

// Función para añadir campos de notas dinámicamente en el DOM
function añadirCampoNota(numeroMateria, notaValor = '') {
    const container = document.getElementById('inputContainer');
    const nuevoCampo = document.createElement('div');
    nuevoCampo.innerHTML = `
        <label>Materia ${numeroMateria}: </label>
        <input type="number" class="notaInput" data-materia="Materia ${numeroMateria}" value="${notaValor}" min="0" max="10" required>
    `;
    container.appendChild(nuevoCampo);
}

// Inicialización
// Añadir campos de notas al cargar la página y recuperar notas previas de localStorage
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 3; i++) {
        añadirCampoNota(i);
    }
    recuperarNotas();
});
