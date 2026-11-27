//referencia al array de objetos de datos.js
const ventas = require('./datos'); //'require' accede a lo que está dentro de module.exports
const { totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad } = require('./analitica');

//tamaño del array
console.log(ventas.length);

//elementos
console.log(ventas[0]);//primer elemento
console.log(ventas[ventas.length - 1]);//ultimo elemento

//valor de 'producto' en la posicion 4
console.log(ventas[4].producto);

//tabla del array de objetos
console.table(ventas);



//console.log(typeof ventas);

//pruebas con tres entradas: arreglo completo, un elemento y vacío
const unElemento = [ventas[0]];
const vacio = []; //sin ventas

console.log('totalVendido (completo, un elemento, vacío)');
console.log(totalVendido(ventas), totalVendido(unElemento), totalVendido(vacio), "\n");

console.log('unidadesVendidas (completo, un elemento, vacío)');
console.log(unidadesVendidas(ventas), unidadesVendidas(unElemento), unidadesVendidas(vacio), "\n");

console.log('entaMayor (completo, un elemento, vacío)');
console.log(ventaMayor(ventas));
console.log(ventaMayor(unElemento));
console.log(ventaMayor(vacio));

console.log('ticketPromedio (completo, un elemento, vacío)');
console.log(ticketPromedio(ventas), ticketPromedio(unElemento), ticketPromedio(vacio), "\n");

console.log('ventasPorCiudad "  medellÍN " (completo, un elemento, vacío)');
console.log(ventasPorCiudad(ventas, '  medellÍN '), ventasPorCiudad(unElemento, 'Medellín'), ventasPorCiudad(vacio, 'Medellín'), "\n");