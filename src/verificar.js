//datos de ventas del proyecto
const ventas = require('./datos');

//funciones con ciclo y versiones con métodos de arreglo
const {
    totalVendido, totalVendidoM,
    unidadesVendidas, unidadesVendidasM,
    ventasPorCiudad, ventasPorCiudadM
} = require('./analitica');

//tres entradas para probar: completo, un elemento y vacío
const conjuntos = [
    {nombre: 'completo', datos: ventas},
    {nombre: 'un elemento', datos: [ventas[0]]},
    {nombre: 'vacío', datos: []}
];

//ciudades a comparar
const ciudades = ['Medellín', 'Bogotá', 'Cali', 'Pereira'];

//compara el resultado del ciclo con el de métodos y muestra OK o DIFERENTE
function comparar(nombre, resultadoCiclo, resultadoMetodos) {
    const resultado = resultadoCiclo === resultadoMetodos ? 'OK' : 'DIFERENTE';
    console.log(`${nombre} | ciclo: ${resultadoCiclo} | métodos: ${resultadoMetodos} -> ${resultado}`);
}

//totalVendido vs totalVendidoM
console.log('--- totalVendido ---');
for (const c of conjuntos) {
    comparar(`totalVendido (${c.nombre})`, totalVendido(c.datos), totalVendidoM(c.datos));
}

//unidadesVendidas vs unidadesVendidasM
console.log('--- unidadesVendidas ---');
for (const c of conjuntos) {
    comparar(`unidadesVendidas (${c.nombre})`, unidadesVendidas(c.datos), unidadesVendidasM(c.datos));
}

//ventasPorCiudad vs ventasPorCiudadM
console.log('--- ventasPorCiudad ---');
for (const c of conjuntos) {
    for (const ciudad of ciudades) {
        comparar(`ventasPorCiudad (${c.nombre}, ${ciudad})`, ventasPorCiudad(c.datos, ciudad), ventasPorCiudadM(c.datos, ciudad));
    }
}