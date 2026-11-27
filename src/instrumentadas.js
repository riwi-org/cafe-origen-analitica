//contador de operaciones: se pasa por referencia a cada función
function crearContador() {
    return { operaciones: 0 };
}

//totalVendido instrumentado: cuenta 1 por cada visita
function totalVendidoI(ventas, contador) {
    let total = 0;
    for (const venta of ventas) {
        contador.operaciones++; //visita
        total += venta.cantidad * venta.precio;
    }
    return total;
}

//ventaMayor instrumentado: cuenta 1 por visita y 1 por comparación
function ventaMayorI(ventas, contador) {
    let mayor = null;
    for (const venta of ventas) {
        contador.operaciones++; //visita
        if (mayor === null) {
            mayor = venta; //la primera venta no necesita comparar
        } else {
            contador.operaciones++; //comparación
            if (venta.cantidad * venta.precio > mayor.cantidad * mayor.precio) {
                mayor = venta;
            }
        }
    }
    return mayor;
}

//totalPorCiudad instrumentado: cuenta 1 por visita y 1 por revisión de la clave
function totalPorCiudadI(ventas, contador) {
    const totales = {};
    for (const venta of ventas) {
        contador.operaciones++; //visita
        const limpia = venta.ciudad.trim().toLowerCase();
        const ciudad = limpia.charAt(0).toUpperCase() + limpia.slice(1);
        const valor = venta.cantidad * venta.precio;

        contador.operaciones++; //comparación: ¿ya existe la ciudad?
        if (ciudad in totales) {
            totales[ciudad] += valor;
        } else {
            totales[ciudad] = valor;
        }
    }
    return totales;
}

//primeraVenta: un solo acceso, no depende del tamaño del arreglo
function primeraVenta(ventas, contador) {
    contador.operaciones++; //un acceso
    return ventas.length > 0 ? ventas[0] : null;
}

//exportamos las funciones instrumentadas
module.exports = { crearContador, totalVendidoI, ventaMayorI, totalPorCiudadI, primeraVenta };