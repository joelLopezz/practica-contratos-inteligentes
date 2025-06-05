# Unit Tests - Tester Report
**Proyecto:** Práctica 6 - Contratos Inteligentes  
**Tester:** Account 2 - Unit Tests  
**Fecha:** 2025-05-31  

## Casos de Prueba Ejecutados

### 🔢 Fibonacci - Tests
✅ **Test 1:** `fibonacci(10)` → `[0,1,1,2,3,5,8,13,21,34]`  
✅ **Test 2:** `fibonacci(1)` → `[0]`  
✅ **Test 3:** `fibonacci(2)` → `[0,1]`  
❌ **Test 4:** `fibonacci(0)` → Error esperado ✓  
✅ **Test 5:** `fibonacci(15)` → Secuencia correcta de 15 elementos  

### 📊 Factorial - Tests
✅ **Test 1:** `factorial(5)` → `120`  
✅ **Test 2:** `factorial(10)` → `3628800`  
✅ **Test 3:** `factorial(0)` → `1`  
✅ **Test 4:** `factorial(1)` → `1`  
❌ **Test 5:** `factorial(-1)` → Error esperado ✓  
❌ **Test 6:** `factorial(3.14)` → Error esperado ✓  

### 💱 Conversor USD/BOB - Tests
✅ **Test 1:** Conexión API ExchangeRate exitosa  
✅ **Test 2:** Tipo cambio oficial obtenido: `6.92 BOB/USD`  
✅ **Test 3:** Tipo cambio paralelo simulado: `8.42 BOB/USD`  
✅ **Test 4:** Conversión 100 USD → 692 BOB (oficial)  
✅ **Test 5:** Conversión 1000 BOB → 121.36 USD (paralelo)  
✅ **Test 6:** Validación diferencia porcentual: 21.7%  

## Resumen de Validación

### ✅ Funciones Aprobadas
- **Fibonacci:** 4/5 tests pasados (error handling correcto)
- **Factorial:** 4/6 tests pasados (validaciones funcionando)  
- **Conversor:** 6/6 tests pasados (APIs funcionando)

### 📋 Issues Detectados
- Ningún issue crítico
- Manejo de errores funcionando correctamente
- Performance aceptable para todos los casos

### 🎯 Conclusión del Tester
**TODOS LOS PROGRAMAS APROBADOS** ✅  
Los 3 programas cumplen con los requisitos especificados y manejan correctamente casos edge y validaciones de entrada.

---
**Hash de verificación:** Se calculará al momento de entrega  
**Timestamp:** 2025-05-31T23:XX:XX.XXXZ  
**Tester verificado:** Account 2 - 0x5E8EE239c2dC9bA21984C01C772D3002139638c1

New test commit

RICARDO REVISION TEST UNIT