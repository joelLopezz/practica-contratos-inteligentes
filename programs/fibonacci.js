/**
 * Práctica 6 - Programa Fibonacci
 * Calcula los N primeros números de la serie de Fibonacci
 * Autor: [Tu nombre]
 * Fecha: [Fecha actual]
 */
//NUEVO SUBIDA
/**
 * Genera los N primeros números de la serie de Fibonacci
 * @param {number} n - Cantidad de números a generar
 * @returns {number[]} Array con los números de Fibonacci
 */
function fibonacci(n) {
    // Validación de entrada
    if (n <= 0) {
        throw new Error("El número debe ser mayor a 0");
    }
    
    if (n === 1) {
        return [0];
    }
    
    if (n === 2) {
        return [0, 1];
    }
    
    // Inicializar array con los primeros dos números
    const sequence = [0, 1];
    
    // Generar los números restantes
    for (let i = 2; i < n; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    
    return sequence;
}

/**
 * Función alternativa recursiva (menos eficiente, solo para demostración)
 * @param {number} n - Posición en la serie
 * @returns {number} Número de Fibonacci en la posición n
 */
function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

/**
 * Función para mostrar la serie en formato string
 * @param {number} n - Cantidad de números
 * @returns {string} Serie formateada
 */
function fibonacciString(n) {
    const sequence = fibonacci(n);
    return `Fibonacci(${n}): ${sequence.join(', ')}`;
}

// Ejemplos de uso y pruebas
function runTests() {
    console.log("=== PRUEBAS DEL PROGRAMA FIBONACCI ===");
    
    try {
        console.log(fibonacciString(10));
        console.log(fibonacciString(15));
        console.log(`Fibonacci(7): [${fibonacci(7)}]`);
        
        // Prueba de validación
        console.log("\n--- Pruebas de validación ---");
        console.log("Fibonacci(1):", fibonacci(1));
        console.log("Fibonacci(2):", fibonacci(2));
        
    } catch (error) {
        console.error("Error:", error.message);
    }
    
    // Prueba de error
    try {
        fibonacci(0);
    } catch (error) {
        console.log("✅ Validación correcta:", error.message);
    }
}

// Ejecutar pruebas si se ejecuta directamente
if (require.main === module) {
    runTests();
}

// Exportar para uso en otros archivos
module.exports = {
    fibonacci,
    fibonacciRecursive,
    fibonacciString
};