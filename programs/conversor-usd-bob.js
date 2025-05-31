/**
 * Práctica 6 - Conversor USD/BOB
 * Consulta tipo de cambio desde múltiples fuentes
 * Autor: [Tu nombre]
 * Fecha: [Fecha actual]
 */

// Simulación de datos para cuando las APIs no estén disponibles
const MOCK_DATA = {
    oficial: 6.96,
    paralelo: 7.85,
    lastUpdate: new Date().toISOString()
};

/**
 * Obtiene tipo de cambio oficial desde API alternativa confiable
 * @returns {Promise<object>} Datos del tipo de cambio oficial
 */
async function obtenerTipoCambioOficial() {
    try {
        // Usando ExchangeRate API (gratuita y confiable)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
        const bobRate = data.rates.BOB;
        
        return {
            rate: bobRate,
            source: 'ExchangeRate-API (Oficial)',
            timestamp: new Date().toISOString(),
            success: true
        };
        
    } catch (error) {
        console.warn('API oficial no disponible, usando datos mock:', error.message);
        
        return {
            rate: MOCK_DATA.oficial,
            source: 'Datos simulados (BCB referencia)',
            timestamp: MOCK_DATA.lastUpdate,
            success: false,
            error: error.message
        };
    }
}

/**
 * Simula obtener tipo de cambio paralelo (mock data)
 * En un caso real, esto vendría de casas de cambio o mercado negro
 * @returns {Promise<object>} Datos del tipo de cambio paralelo
 */
async function obtenerTipoCambioParalelo() {
    // Simulamos una llamada asíncrona con delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
        // Simulamos variación del paralelo (generalmente 10-20% más alto que oficial)
        const oficial = await obtenerTipoCambioOficial();
        const variacion = 1.10 + (Math.random() * 0.15); // 10% a 25% más alto
        const paraleloRate = oficial.rate * variacion;
        
        return {
            rate: parseFloat(paraleloRate.toFixed(2)),
            source: 'Mercado Paralelo (Simulado)',
            timestamp: new Date().toISOString(),
            success: true,
            variacionPorcentual: ((variacion - 1) * 100).toFixed(1) + '%'
        };
        
    } catch (error) {
        return {
            rate: MOCK_DATA.paralelo,
            source: 'Datos simulados (Paralelo)',
            timestamp: MOCK_DATA.lastUpdate,
            success: false,
            error: error.message
        };
    }
}

/**
 * Obtiene ambos tipos de cambio de manera simultánea
 * @returns {Promise<object>} Objeto con ambos tipos de cambio
 */
async function obtenerTiposCambio() {
    try {
        // Ejecutar ambas consultas en paralelo
        const [oficial, paralelo] = await Promise.all([
            obtenerTipoCambioOficial(),
            obtenerTipoCambioParalelo()
        ]);
        
        return {
            oficial: oficial,
            paralelo: paralelo,
            diferencia: {
                absoluta: (paralelo.rate - oficial.rate).toFixed(2),
                porcentual: (((paralelo.rate - oficial.rate) / oficial.rate) * 100).toFixed(1) + '%'
            },
            timestamp: new Date().toISOString(),
            success: true
        };
        
    } catch (error) {
        throw new Error(`Error al obtener tipos de cambio: ${error.message}`);
    }
}

/**
 * Convierte USD a BOB usando tipo de cambio especificado
 * @param {number} usdAmount - Cantidad en dólares
 * @param {string} tipo - 'oficial' o 'paralelo'
 * @returns {Promise<object>} Resultado de la conversión
 */
async function convertirUsdABob(usdAmount, tipo = 'oficial') {
    if (typeof usdAmount !== 'number' || usdAmount < 0) {
        throw new Error('La cantidad en USD debe ser un número positivo');
    }
    
    if (!['oficial', 'paralelo'].includes(tipo)) {
        throw new Error('Tipo debe ser "oficial" o "paralelo"');
    }
    
    try {
        const tiposCambio = await obtenerTiposCambio();
        const rate = tipo === 'oficial' ? tiposCambio.oficial.rate : tiposCambio.paralelo.rate;
        const bobAmount = usdAmount * rate;
        
        return {
            usd: usdAmount,
            bob: parseFloat(bobAmount.toFixed(2)),
            tipoCambio: rate,
            tipoUsado: tipo,
            fuente: tipo === 'oficial' ? tiposCambio.oficial.source : tiposCambio.paralelo.source,
            timestamp: new Date().toISOString(),
            conversion: `${usdAmount} USD = ${bobAmount.toFixed(2)} BOB (${tipo})`
        };
        
    } catch (error) {
        throw new Error(`Error en conversión: ${error.message}`);
    }
}

/**
 * Convierte BOB a USD usando tipo de cambio especificado
 * @param {number} bobAmount - Cantidad en bolivianos
 * @param {string} tipo - 'oficial' o 'paralelo'
 * @returns {Promise<object>} Resultado de la conversión
 */
async function convertirBobAUsd(bobAmount, tipo = 'oficial') {
    if (typeof bobAmount !== 'number' || bobAmount < 0) {
        throw new Error('La cantidad en BOB debe ser un número positivo');
    }
    
    try {
        const tiposCambio = await obtenerTiposCambio();
        const rate = tipo === 'oficial' ? tiposCambio.oficial.rate : tiposCambio.paralelo.rate;
        const usdAmount = bobAmount / rate;
        
        return {
            bob: bobAmount,
            usd: parseFloat(usdAmount.toFixed(2)),
            tipoCambio: rate,
            tipoUsado: tipo,
            fuente: tipo === 'oficial' ? tiposCambio.oficial.source : tiposCambio.paralelo.source,
            timestamp: new Date().toISOString(),
            conversion: `${bobAmount} BOB = ${usdAmount.toFixed(2)} USD (${tipo})`
        };
        
    } catch (error) {
        throw new Error(`Error en conversión: ${error.message}`);
    }
}

/**
 * Muestra comparación completa de tipos de cambio
 * @returns {Promise<object>} Reporte completo
 */
async function reporteCompleto() {
    try {
        const tiposCambio = await obtenerTiposCambio();
        
        return {
            tiposCambio: tiposCambio,
            ejemplosConversion: {
                usd100_oficial: await convertirUsdABob(100, 'oficial'),
                usd100_paralelo: await convertirUsdABob(100, 'paralelo'),
                bob1000_oficial: await convertirBobAUsd(1000, 'oficial'),
                bob1000_paralelo: await convertirBobAUsd(1000, 'paralelo')
            },
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        throw new Error(`Error generando reporte: ${error.message}`);
    }
}

// Función de pruebas
async function runTests() {
    console.log("=== PRUEBAS DEL CONVERSOR USD/BOB ===");
    
    try {
        // Prueba 1: Obtener tipos de cambio
        console.log("1. Obteniendo tipos de cambio...");
        const tiposCambio = await obtenerTiposCambio();
        console.log("✅ Tipos de cambio obtenidos:");
        console.log(`   Oficial: ${tiposCambio.oficial.rate} BOB/USD`);
        console.log(`   Paralelo: ${tiposCambio.paralelo.rate} BOB/USD`);
        console.log(`   Diferencia: ${tiposCambio.diferencia.porcentual}`);
        
        // Prueba 2: Conversiones
        console.log("\n2. Probando conversiones...");
        const conv1 = await convertirUsdABob(100, 'oficial');
        const conv2 = await convertirUsdABob(100, 'paralelo');
        
        console.log(`✅ ${conv1.conversion}`);
        console.log(`✅ ${conv2.conversion}`);
        
        // Prueba 3: Reporte completo
        console.log("\n3. Generando reporte completo...");
        const reporte = await reporteCompleto();
        console.log("✅ Reporte generado exitosamente");
        console.log("   Ejemplos incluidos: USD->BOB y BOB->USD en ambos tipos");
        
        return reporte;
        
    } catch (error) {
        console.error("❌ Error en pruebas:", error.message);
        throw error;
    }
}

// Ejecutar pruebas si se ejecuta directamente
if (require.main === module) {
    runTests()
        .then(reporte => {
            console.log("\n=== REPORTE FINAL ===");
            console.log(JSON.stringify(reporte, null, 2));
        })
        .catch(error => {
            console.error("Error final:", error.message);
        });
}

// Exportar funciones
module.exports = {
    obtenerTipoCambioOficial,
    obtenerTipoCambioParalelo,
    obtenerTiposCambio,
    convertirUsdABob,
    convertirBobAUsd,
    reporteCompleto
};