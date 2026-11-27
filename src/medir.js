//generador de datos y funciones instrumentadas
const { generarVentas } = require('./generador');
const { crearContador, totalVendidoI, ventaMayorI, totalPorCiudadI, primeraVenta } = require('./instrumentadas');

//tamaños a medir
const tamanos = [100, 1000, 10000, 100000];

//cuenta las operaciones de cada función con los mismos datos
function medirTamano(n) {
    const ventas = generarVentas(n);

    const cTotal = crearContador();
    totalVendidoI(ventas, cTotal);

    const cMayor = crearContador();
    ventaMayorI(ventas, cMayor);

    const cCiudad = crearContador();
    totalPorCiudadI(ventas, cCiudad);

    const cPrimera = crearContador();
    primeraVenta(ventas, cPrimera);

    return {
        n,
        totalVendido: cTotal.operaciones,
        ventaMayor: cMayor.operaciones,
        totalPorCiudad: cCiudad.operaciones,
        primeraVenta: cPrimera.operaciones
    };
}

//resultados para cada tamaño
const resultados = tamanos.map(medirTamano);

//tabla con las operaciones de cada función
console.log('Operaciones por función');
console.table(resultados);

//crecimiento: cuántas veces más operaciones que el tamaño anterior
const crecimiento = resultados.slice(1).map((fila, i) => {
    const anterior = resultados[i];
    const razon = (clave) => (fila[clave] / anterior[clave]).toFixed(2);
    return {
        'n (anterior -> actual)': `${anterior.n} -> ${fila.n}`,
        totalVendido: razon('totalVendido'),
        ventaMayor: razon('ventaMayor'),
        totalPorCiudad: razon('totalPorCiudad'),
        primeraVenta: razon('primeraVenta')
    };
});

console.log('Crecimiento al multiplicar n por 10');
console.table(crecimiento);