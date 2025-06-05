/**
 * Práctica 6 - Programa Factorial
 * Calcula el factorial de un número dado
 * Autor: [Tu nombre]
 * Fecha: [Fecha actual]
 */
//ricardo test factorial
 //factorial NEW
/**
 * Calcula el factorial de un número
 * @param {number} n - Número del cual calcular el factorial
 * @returns {number} Factorial de n
 */
function factorial(n) {
    // Validación de entrada
    if (typeof n !== 'number') {
        throw new Error("El input debe ser un número");
    }
    
    if (n < 0) {
        throw new Error("No se puede calcular factorial de números negativos");
    }
    
    if (n > 170) {
        throw new Error("Número demasiado grande (máximo 170 para evitar overflow)");
    }
    
    if (!Number.isInteger(n)) {
        throw new Error("El número debe ser un entero");
    }
    
    // Casos base
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Cálculo iterativo del factorial
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

/**
 * Versión recursiva del factorial (para comparación)
 * @param {number} n - Número del cual calcular el factorial
 * @returns {number} Factorial de n
 */
function factorialRecursive(n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}

/**
 * Calcula factorial con información adicional
 * @param {number} n - Número del cual calcular el factorial
 * @returns {object} Objeto con resultado y metadata
 */
function factorialDetailed(n) {
    const startTime = Date.now();
    const result = factorial(n);
    const endTime = Date.now();
    
    return {
        input: n,
        result: result,
        resultString: result.toLocaleString(),
        digits: result.toString().length,
        executionTime: endTime - startTime + " ms"
    };
}

/**
 * Calcula factoriales en un rango
 * @param {number} start - Número inicial
 * @param {number} end - Número final
 * @returns {object[]} Array de resultados
 */
function factorialRange(start, end) {
    if (start > end) {
        throw new Error("El número inicial debe ser menor o igual al final");
    }
    
    const results = [];
    for (let i = start; i <= end; i++) {
        try {
            results.push({
                n: i,
                factorial: factorial(i),
                notation: `${i}! = ${factorial(i).toLocaleString()}`
            });
        } catch (error) {
            results.push({
                n: i,
                error: error.message
            });
        }
    }
    
    return results;
}

// Función de pruebas
function runTests() {
    console.log("=== PRUEBAS DEL PROGRAMA FACTORIAL ===");
    
    try {
        // Pruebas básicas
        console.log("Factorial(5):", factorial(5));
        console.log("Factorial(10):", factorial(10));
        console.log("Factorial(0):", factorial(0));
        console.log("Factorial(1):", factorial(1));
        
        // Prueba detallada
        console.log("\n--- Factorial detallado ---");
        console.log(factorialDetailed(15));
        
        // Prueba de rango
        console.log("\n--- Factoriales del 1 al 7 ---");
        const range = factorialRange(1, 7);
        range.forEach(item => {
            if (item.error) {
                console.log(`${item.n}!: ERROR - ${item.error}`);
            } else {
                console.log(item.notation);
            }
        });
        
        // Comparación iterativo vs recursivo
        console.log("\n--- Comparación Iterativo vs Recursivo ---");
        const n = 10;
        console.log(`Iterativo: ${factorial(n)}`);
        console.log(`Recursivo: ${factorialRecursive(n)}`);
        
    } catch (error) {
        console.error("Error en pruebas:", error.message);
    }
    
    // Pruebas de validación
    console.log("\n--- Pruebas de Validación ---");
    
    const invalidInputs = [-1, 3.14, "texto", 200];
    invalidInputs.forEach(input => {
        try {
            factorial(input);
        } catch (error) {
            console.log(`✅ Input inválido (${input}): ${error.message}`);
        }
    });
}

// Ejecutar pruebas si se ejecuta directamente
if (require.main === module) {
    runTests();
}

// Exportar funciones
module.exports = {
    factorial,
    factorialRecursive,
    factorialDetailed,
    factorialRange
};