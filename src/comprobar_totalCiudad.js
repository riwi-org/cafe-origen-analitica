//datos de prueba del generador
const { generarVentas } = require('./generador');
const { totalCiudadCadena, totalCiudadUnaPasada } = require('./totalCiudad');

const ventas = generarVentas(10000);
const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Pereira'];

//1. ¿devuelven el mismo valor para cada ciudad?
console.log('--- mismo valor con 10.000 ventas ---');
const filas = ciudades.map(ciudad => {
    const cadena = totalCiudadCadena(ventas, ciudad);
    const unaPasada = totalCiudadUnaPasada(ventas, ciudad);
    return { ciudad, cadena, unaPasada, iguales: cadena === unaPasada ? 'OK' : 'DIFERENTE' };
});
console.table(filas);

//2. recorridos y arreglos intermedios de la versión encadenada, paso a paso
const ciudad = 'Bogotá';
const buscada = ciudad.trim().toLowerCase();
const arreglo1 = ventas.map(venta => ({ ciudad: venta.ciudad.trim().toLowerCase(), venta }));
const arreglo2 = arreglo1.filter(item => item.ciudad === buscada);
const arreglo3 = arreglo2.map(item => item.venta.cantidad * item.venta.precio);
const totalPaso = arreglo3.reduce((total, valor) => total + valor, 0);

console.log('--- versión encadenada (paso a paso) ---');
console.table([
    { paso: 'map (normaliza)', recorre: ventas.length, arregloNuevo: arreglo1.length },
    { paso: 'filter (ciudad)', recorre: arreglo1.length, arregloNuevo: arreglo2.length },
    { paso: 'map (valor)', recorre: arreglo2.length, arregloNuevo: arreglo3.length },
    { paso: 'reduce (suma)', recorre: arreglo3.length, arregloNuevo: 0 }
]);
console.log('total por paso:', totalPaso, '| coincide con la función:', totalPaso === totalCiudadCadena(ventas, ciudad));

//3. versión de una pasada: 1 recorrido de n elementos, 0 arreglos nuevos
let visitas = 0;
for (const venta of ventas) visitas++;
console.log('--- versión de una pasada ---');
console.log('recorridos completos: 1 | visitas:', visitas, '| arreglos nuevos: 0');