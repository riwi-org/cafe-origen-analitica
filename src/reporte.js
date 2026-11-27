//datos del proyecto
const ventas = require('./datos');

//funciones de analitica.js
const {
    totalVendido, unidadesVendidas, ventaMayor, ticketPromedio,
    totalPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia
} = require('./analitica');

//da formato de pesos colombianos: 985000 -> "$ 985.000"
function pesos(valor) {
    return `$ ${Math.round(valor).toLocaleString("es-CO")}`; //redondea para no mostrar decimales largos
}

//imprime un título con su línea separadora
function titulo(texto) {
    console.log('');
    console.log(texto);
    console.log('-'.repeat(texto.length));
}

//imprime una fila alineada: etiqueta a la izquierda, valor a la derecha
function fila(etiqueta, valor) {
    console.log(`${etiqueta.padEnd(28)}${valor.padStart(18)}`);
}

//1. resumen general de todas las ventas
titulo('RESUMEN GENERAL');
fila('Total vendido', pesos(totalVendido(ventas)));
fila('Unidades vendidas', String(unidadesVendidas(ventas)));
fila('Ticket promedio', pesos(ticketPromedio(ventas)));

const mayor = ventaMayor(ventas); //registro completo de la venta más grande
if (mayor === null) {
    fila('Venta mayor', 'sin ventas');
} else {
    fila('Venta mayor', `#${mayor.id} ${pesos(mayor.cantidad * mayor.precio)}`);
}

//2. ventas por ciudad, de mayor a menor
titulo('VENTAS POR CIUDAD');
const porCiudad = Object.entries(totalPorCiudad(ventas))
    .sort((a, b) => b[1] - a[1]); //ordena por valor
for (const [ciudad, total] of porCiudad) {
    fila(ciudad, pesos(total));
}

//3. unidades por producto, de mayor a menor
titulo('UNIDADES POR PRODUCTO');
const porProducto = Object.entries(unidadesPorProducto(ventas))
    .sort((a, b) => b[1] - a[1]); //ordena por unidades
for (const [producto, unidades] of porProducto) {
    fila(producto, String(unidades));
}

//4. top 3 de productos por valor generado
titulo('TOP 3 PRODUCTOS POR VALOR');
topProductosPorValor(ventas, 3).forEach((item, posicion) => {
    fila(`${posicion + 1}. ${item.producto}`, pesos(item.valor));
});

//5. ventas de días específicos: uno con ventas y uno sin ventas
titulo('VENTAS POR DÍA');
for (const fecha of ['2026-09-03', '2026-09-07']) {
    const delDia = ventasDelDia(ventas, fecha);
    if (delDia.length === 0) {
        console.log(`${fecha}: sin ventas registradas ese día`);
    } else {
        console.log(`${fecha}: ${delDia.length} ventas, ${unidadesVendidas(delDia)} unidades, total ${pesos(totalVendido(delDia))}`);
    }
}
console.log('');