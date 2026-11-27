//datos del Día 1 y generador
const ventas = require('./datos');
const { generarVentas } = require('./generador');

//versión original y versiones optimizadas
const { clientesRecurrentes } = require('./recurrentes');
const { clientesRecurrentesSet, clientesRecurrentesMap } = require('./recurrentesOptimizada');

//casos de prueba: Día 1, 5.000 generadas y casos borde
const casos = [
    { nombre: 'Día 1 (12 ventas)', datos: ventas },
    { nombre: 'generadas (5.000 ventas)', datos: generarVentas(5000) },
    { nombre: 'vacío', datos: [] },
    { nombre: 'una sola venta', datos: [ventas[0]] },
    { nombre: 'un solo cliente', datos: ventas.map(v => ({ ...v, cliente: 'C01' })) }
];

//el orden puede cambiar entre versiones, así que se compara ordenado
const ordenar = arreglo => [...arreglo].sort();
const iguales = (x, y) => JSON.stringify(ordenar(x)) === JSON.stringify(ordenar(y));

const filas = casos.map(({ nombre, datos }) => {
    const original = clientesRecurrentes(datos);
    const set = clientesRecurrentesSet(datos);
    const map = clientesRecurrentesMap(datos);
    //el Set no debe tener repetidos: su tamaño debe coincidir con el largo del arreglo
    const sinRepetidos = new Set(set).size === set.length;
    return {
        caso: nombre,
        'original (n)': original.length,
        'Set (n)': set.length,
        'Map (n)': map.length,
        'sin repetidos': sinRepetidos ? 'OK' : 'DIFERENTE',
        'original = Set': iguales(original, set) ? 'OK' : 'DIFERENTE',
        'original = Map': iguales(original, map) ? 'OK' : 'DIFERENTE'
    };
});

console.log('--- comparación de resultados (ordenados) ---');
console.table(filas);

//muestra los clientes del Día 1 para revisar a mano
console.log('Día 1 ordenado (original):', ordenar(clientesRecurrentes(ventas)));
console.log('Día 1 ordenado (Set):     ', ordenar(clientesRecurrentesSet(ventas)));
console.log('Día 1 ordenado (Map):     ', ordenar(clientesRecurrentesMap(ventas)));