//Variables/Constantes/Arrays
let notas = [];  
const cantidadMaterias = 3;  

//Funciones
//Para Entry Notes le pedi ayuda en el prompt a chatgpt pq no me salia la parte de "${i + 1}:"  
//Entrada de datos
function EntryNotes() {
    for (let i = 0; i < cantidadMaterias; i++) {
        let nota = parseFloat(prompt(`Ingresa la nota para la materia ${i + 1}:`));
        while (isNaN(nota) || nota < 0 || nota > 10) {
            nota = parseFloat(prompt(`Nota inválida. Ingresa la nota para la materia ${i + 1} (entre 0 y 10):`));
        }
        notas.push(nota);
    }
}

//Procesamiento de los datos
function Average() {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    let promedio = suma / notas.length;
    return promedio.toFixed(2);
}


function Exitos(promedio) {
    const notaAprobacion = 4.0;  
    if (promedio >= notaAprobacion) {
        alert("¡Felicidades! Aprobaste con un promedio de " + promedio + ".");
    } else {
        alert("Lamentablemente, no aprobaste. Tu promedio es " + promedio + ".");
    }
}


EntryNotes();  
let promedioFinal = Average();  
Exitos(promedioFinal);  

//Mostrar los resultados
console.log("Notas ingresadas:", notas);
console.log("Promedio final:", promedioFinal);