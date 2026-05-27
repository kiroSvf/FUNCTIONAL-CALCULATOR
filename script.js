// 1. Capturamos los elementos del DOM
const display = document.querySelector('.display');
const botones = document.querySelectorAll('.boton');

// 2. Variables de estado para controlar la memoria de la calculadora
let valorActual = '0';
let valorAnterior = '';
let operacion = undefined;

// Función para actualizar lo que el usuario ve en pantalla
function actualizarDisplay() {
    display.textContent = valorActual;
}

// Función para manejar la entrada de números y el punto decimal
function agregarNumero(numero) {
    // Evitar que pongan más de un punto decimal
    if (numero === '.' && valorActual.includes('.')) return;
    
    // Si hay un 0 inicial solo, lo reemplazamos. Si no, acumulamos los números.
    if (valorActual === '0' && numero !== '.') {
        valorActual = numero;
    } else {
        valorActual += numero;
    }
}

// Función para cuando se presiona +, -, * o /
function elegirOperacion(op) {
    if (valorActual === '') return;
    // Si ya había una operación pendiente y el usuario presiona otro operador, calcula primero
    if (valorAnterior !== '') {
        calcular();
    }
    operacion = op;
    valorAnterior = valorActual;
    valorActual = '0';
}

// Función que realiza la matemática real
function calcular() {
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const actual = parseFloat(valorActual);
    
    // Si no hay números válidos para operar, salimos
    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operacion) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case '*':
            resultado = anterior * actual;
            break;
        case '/':
            // Controlamos la división por cero para que no rompa el diseño
            resultado = actual === 0 ? 'Error' : anterior / actual;
            break;
        default:
            return;
    }

    valorActual = resultado.toString();
    operacion = undefined;
    valorAnterior = '';
}

// Función para resetear la calculadora (Botón C)
function limpiar() {
    valorActual = '0';
    valorAnterior = '';
    operacion = undefined;
}

// 3. Escuchador de eventos (Event Listener) para todos los botones
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const texto = boton.textContent;

        // Validamos qué tipo de botón presionó el usuario
        if (!isNaN(texto) || texto === '.') {
            agregarNumero(texto);
        } else if (texto === 'C') {
            limpiar();
        } else if (texto === '=') {
            calcular();
        } else if (texto === '+/-') {
            valorActual = (parseFloat(valorActual) * -1).toString();
        } else if (texto === '%') {
            valorActual = (parseFloat(valorActual) / 100).toString();
        } else {
            elegirOperacion(texto);
        }

        // Cada vez que pase un clic, refrescamos la pantalla
        actualizarDisplay();
    });
});