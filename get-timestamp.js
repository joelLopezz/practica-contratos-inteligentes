/**
 * SCRIPT SIMPLE PARA OBTENER TIMESTAMP UNIX DE COMMITS
 * Uso: node get-timestamp.js [commitHash]
 * Ejemplo: node get-timestamp.js b15007940f144e315f2a901b165e170b687fb4df
 */

async function getCommitTimestamp(repoOwner, repoName, commitHash) {
    try {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${commitHash}`;
        
        console.log(`🔍 Consultando GitHub...`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Obtener fecha del commit
        const commitDate = data.commit.author.date;
        const commitTimestamp = Math.floor(new Date(commitDate).getTime() / 1000);
        
        return {
            hash: commitHash,
            date: commitDate,
            timestamp: commitTimestamp,
            message: data.commit.message,
            author: data.commit.author.name
        };
        
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return null;
    }
}

async function main() {
    // Configuración de tu repositorio
    const REPO_OWNER = "joelLopezz";
    const REPO_NAME = "practica-contratos-inteligentes";
    
    // Obtener hash del commit desde argumentos o usar el por defecto
    const commitHash = process.argv[2] || "b15007940f144e315f2a901b165e170b687fb4df";
    
    console.log("🚀 OBTENIENDO TIMESTAMP DE COMMIT");
    console.log("=".repeat(50));
    console.log(`📁 Repositorio: ${REPO_OWNER}/${REPO_NAME}`);
    console.log(`🔑 Commit Hash: ${commitHash}`);
    console.log("");
    
    const result = await getCommitTimestamp(REPO_OWNER, REPO_NAME, commitHash);
    
    if (!result) {
        console.log("❌ No se pudo obtener información del commit");
        return;
    }
    
    console.log("✅ INFORMACIÓN DEL COMMIT:");
    console.log(`   📅 Fecha: ${result.date}`);
    console.log(`   👤 Autor: ${result.author}`);
    console.log(`   💬 Mensaje: ${result.message}`);
    console.log("");
    
    console.log("🎯 TIMESTAMP UNIX PARA REMIX:");
    console.log("=".repeat(30));
    console.log(`${result.timestamp}`);
    console.log("=".repeat(30));
    console.log("");
    
    console.log("📋 INSTRUCCIONES:");
    console.log("1. Copia el número de arriba");
    console.log("2. Pégalo en Remix en el campo _commitTimestamp");
    console.log("3. Completa los otros parámetros");
    console.log("4. Ejecuta submitPrograms");
    console.log("");
    
    // Convertir a fecha legible
    const readableDate = new Date(result.timestamp * 1000);
    console.log("📅 VERIFICACIÓN:");
    console.log(`   Timestamp: ${result.timestamp}`);
    console.log(`   Fecha (UTC): ${readableDate.toISOString()}`);
    console.log(`   Fecha (Bolivia): ${readableDate.toLocaleString('es-BO', {timeZone: 'America/La_Paz'})}`);
}

// Función para uso rápido con múltiples commits
async function getMultipleTimestamps(commitHashes) {
    const REPO_OWNER = "joelLopezz";
    const REPO_NAME = "practica-contratos-inteligentes";
    
    console.log("🚀 OBTENIENDO MÚLTIPLES TIMESTAMPS");
    console.log("=".repeat(50));
    
    for (let i = 0; i < commitHashes.length; i++) {
        const hash = commitHashes[i];
        console.log(`\n📝 Commit ${i + 1}: ${hash}`);
        
        const result = await getCommitTimestamp(REPO_OWNER, REPO_NAME, hash);
        
        if (result) {
            console.log(`   🎯 Timestamp: ${result.timestamp}`);
            console.log(`   📅 Fecha: ${result.date}`);
            console.log(`   💬 Mensaje: ${result.message}`);
        } else {
            console.log("   ❌ Error obteniendo información");
        }
    }
}

// Función para verificar deadline
async function checkDeadline(commitHash, deadlineTimestamp) {
    const REPO_OWNER = "joelLopezz";
    const REPO_NAME = "practica-contratos-inteligentes";
    
    const result = await getCommitTimestamp(REPO_OWNER, REPO_NAME, commitHash);
    
    if (!result) {
        return null;
    }
    
    const isOnTime = result.timestamp <= deadlineTimestamp;
    const difference = Math.abs(result.timestamp - deadlineTimestamp);
    const diffHours = Math.floor(difference / 3600);
    const diffMinutes = Math.floor((difference % 3600) / 60);
    
    console.log("⏰ VERIFICACIÓN DE DEADLINE:");
    console.log(`   Commit: ${result.timestamp}`);
    console.log(`   Deadline: ${deadlineTimestamp}`);
    console.log(`   Estado: ${isOnTime ? '✅ A TIEMPO' : '❌ TARDÍO'}`);
    console.log(`   Diferencia: ${diffHours}h ${diffMinutes}m`);
    
    return {
        commit: result,
        isOnTime: isOnTime,
        difference: { hours: diffHours, minutes: diffMinutes }
    };
}

// Ejecutar función principal si se llama directamente
if (require.main === module) {
    // Verificar si se pasaron múltiples commits
    if (process.argv.length > 3) {
        const commitHashes = process.argv.slice(2);
        getMultipleTimestamps(commitHashes).catch(console.error);
    } else {
        main().catch(console.error);
    }
}

// Exportar funciones para uso externo
module.exports = {
    getCommitTimestamp,
    getMultipleTimestamps,
    checkDeadline
};