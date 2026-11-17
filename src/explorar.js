//referencia al array de objetos de datos.js
const ventas = require('./datos'); //'require' accede a lo que está dentro de module.exports

//tamaño del array
console.log(${ventas.length});

//elementos
console.log(ventas[0]);//primer elemento
console.log(ventas[ventas.length - 1]);//ultimo elemento

//valor de 'producto' en la posicion 4
console.log(ventas[4].producto);

//tabla del array de objetos
console.table(ventas);



//console.log(typeof ventas);
