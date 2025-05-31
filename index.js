/**
 * Práctica 6 - Archivo Principal
 * Ejecuta todos los programas y genera reporte general
 * Autor: [Tu nombre]
 * Fecha: [Fecha actual]
 */

const fibonacci = require('./programs/fibonacci');
const factorial = require('./programs/factorial');
const conversor = require('./programs/conversor-usd-bob');
const fs = require('fs');
const path = require('path');

/**
 * Ejecuta todas las funciones y genera un reporte completo
 */
async function ejecutarTodasLasPruebas() {
    console.log("🚀 INICIANDO PRUEBAS COMPLETAS DEL PROYECTO");
    console.log("=" .repeat(60));
    
    const reporte = {
        proyecto: "Práctica 6: Contrato Inteligente de Verificación de Entregables",
        timestamp: new Date().toISOString(),
        resultados: {},
        errores: [],
        resumen: {}
    };
    
    try {
        // ===== PRUEBAS FIBONACCI =====
        console.log("\n📊 PROBANDO FIBONACCI...");
        reporte.resultados.fibonacci = {
            fibonacci_10: fibonacci.fibonacci(10),
            fibonacci_15: fibonacci.fibonacci(15),
            fibonacci_string: fibonacci.fibonacciString(8),
            status: "SUCCESS"
        };
        console.log("✅ Fibonacci: COMPLETADO");
        
        // ===== PRUEBAS FACTORIAL =====
        console.log("\n🔢 PROBANDO FACTORIAL...");
        reporte.resultados.factorial = {
            factorial_5: factorial.factorial(5),
            factorial_10: factorial.factorial(10),
            factorial_detallado: factorial.factorialDetailed(12),
            factorial_rango: factorial.factorialRange(1, 6),
            status: "SUCCESS"
        };
        console.log("✅ Factorial: COMPLETADO");
        
        // ===== PRUEBAS CONVERSOR =====
        console.log("\n💱 PROBANDO CONVERSOR USD/BOB...");
        const tiposCambio = await conversor.obtenerTiposCambio();
        const conversion100usd = await conversor.convertirUsdABob(100, 'oficial');
        const conversion1000bob = await conversor.convertirBobAUsd(1000, 'paralelo');
        
        reporte.resultados.conversor = {
            tipos_cambio: tiposCambio,
            conversion_100usd: conversion100usd,
            conversion_1000bob: conversion1000bob,
            status: "SUCCESS"
        };
        console.log("✅ Conversor: COMPLETADO");
        
        // ===== GENERAR RESUMEN =====
        reporte.resumen = {
            programas_exitosos: 3,
            programas_fallidos: 0,
            total_funciones: 12,
            estado_general: "TODOS LOS PROGRAMAS FUNCIONANDO CORRECTAMENTE"
        };
        
        console.log("\n🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE");
        
    } catch (error) {
        console.error("❌ ERROR DURANTE LAS PRUEBAS:", error.message);
        reporte.errores.push({
            mensaje: error.message,
            timestamp: new Date().toISOString()
        });
        reporte.resumen.estado_general = "ERRORES DETECTADOS";
    }
    
    // Guardar reporte en archivo
    await guardarReporte(reporte);
    
    return reporte;
}

/**
 * Guarda el reporte en archivo JSON
 * @param {object} reporte - Reporte a guardar
 */
async function guardarReporte(reporte) {
    try {
        // Crear directorio de tests si no existe
        if (!fs.existsSync('tests')) {
            fs.mkdirSync('tests');
        }
        
        // Guardar reporte completo
        const reportePath = path.join('tests', 'reporte-ejecucion.json');
        fs.writeFileSync(reportePath, JSON.stringify(reporte, null, 2));
        
        // Crear resumen en markdown
        const markdownResumen = generarResumenMarkdown(reporte);
        const markdownPath = path.join('tests', 'resumen-pruebas.md');
        fs.writeFileSync(markdownPath, markdownResumen);
        
        console.log(`\n📄 Reporte guardado en: ${reportePath}`);
        console.log(`📄 Resumen en: ${markdownPath}`);
        
    } catch (error) {
        console.error("Error guardando reporte:", error.message);
    }
}

/**
 * Genera resumen en formato Markdown
 * @param {object} reporte - Reporte de ejecución
 * @returns {string} Contenido markdown
 */
function generarResumenMarkdown(reporte) {
    return `# Reporte de Ejecución - Práctica 6

## Información General
- **Proyecto:** ${reporte.proyecto}
- **Fecha:** ${new Date(reporte.timestamp).toLocaleString()}
- **Estado:** ${reporte.resumen.estado_general}

## Resultados por Programa

### 🔢 Fibonacci
- **Estado:** ${reporte.resultados.fibonacci?.status || 'ERROR'}
- **Fibonacci(10):** [${reporte.resultados.fibonacci?.fibonacci_10?.join(', ') || 'N/A'}]
- **Fibonacci(15):** [${reporte.resultados.fibonacci?.fibonacci_15?.slice(0, 8).join(', ') || 'N/A'}...]

### 📊 Factorial
- **Estado:** ${reporte.resultados.factorial?.status || 'ERROR'}
- **Factorial(5):** ${reporte.resultados.factorial?.factorial_5 || 'N/A'}
- **Factorial(10):** ${reporte.resultados.factorial?.factorial_10?.toLocaleString() || 'N/A'}

### 💱 Conversor USD/BOB
- **Estado:** ${reporte.resultados.conversor?.status || 'ERROR'}
- **Tipo Cambio Oficial:** ${reporte.resultados.conversor?.tipos_cambio?.oficial?.rate || 'N/A'} BOB/USD
- **Tipo Cambio Paralelo:** ${reporte.resultados.conversor?.tipos_cambio?.paralelo?.rate || 'N/A'} BOB/USD
- **Diferencia:** ${reporte.resultados.conversor?.tipos_cambio?.diferencia?.porcentual || 'N/A'}

## Resumen Final
- ✅ **Programas Exitosos:** ${reporte.resumen.programas_exitosos || 0}
- ❌ **Programas Fallidos:** ${reporte.resumen.programas_fallidos || 0}
- 🔧 **Total Funciones:** ${reporte.resumen.total_funciones || 0}

${reporte.errores.length > 0 ? `## Errores Detectados\n${reporte.errores.map(e => `- ${e.mensaje}`).join('\n')}` : ''}

---
*Reporte generado automáticamente*
`;
}

/**
 * Función para obtener hashes de archivos (para el contrato)
 */
function obtenerHashesArchivos() {
    const crypto = require('crypto');
    const archivos = [
        'programs/fibonacci.js',
        'programs/factorial.js',
        'programs/conversor-usd-bob.js'
    ];
    
    const hashes = {};
    
    archivos.forEach(archivo => {
        try {
            const contenido = fs.readFileSync(archivo, 'utf8');
            const hash = crypto.createHash('sha256').update(contenido).digest('hex');
            hashes[archivo] = hash;
            console.log(`📋 Hash de ${archivo}: ${hash.substring(0, 16)}...`);
        } catch (error) {
            console.error(`Error generando hash para ${archivo}:`, error.message);
        }
    });
    
    return hashes;
}

// Función principal
async function main() {
    try {
        await ejecutarTodasLasPruebas();
        
        console.log("\n🔐 GENERANDO HASHES DE ARCHIVOS...");
        const hashes = obtenerHashesArchivos();
        
        console.log("\n✨ PROYECTO LISTO PARA EL CONTRATO INTELIGENTE");
        console.log("📋 Próximos pasos:");
        console.log("   1. Commit y push a GitHub");
        console.log("   2. Desarrollar contrato Solidity");
        console.log("   3. Desplegar en testnet Sepolia");
        
    } catch (error) {
        console.error("❌ Error en ejecución principal:", error.message);
        process.exit(1);
    }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
    main();
}

module.exports = {
    ejecutarTodasLasPruebas,
    obtenerHashesArchivos,
    guardarReporte
};