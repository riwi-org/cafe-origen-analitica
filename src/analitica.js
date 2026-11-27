//import de array
const ventas = require('./datos.js');

//cantidad x precio
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

//suma el valor de todas las ventas
function totalVendido(ventas) {
    let total = 0; //acumulador
    for (const venta of ventas) {
        total += valorVenta(venta);
    }
    return total;
}

//suma las unidades de todas las ventas
function unidadesVendidas(ventas) {
    let unidades = 0; //acumulador
    for (const venta of ventas) {
        unidades += venta.cantidad;
    }
    return unidades;
}

//busca el registro completo de la venta con mayor valor
function ventaMayor(ventas) {
    if (ventas.length === 0) {
        return null; //sin ventas no hay registro, devuelve null
    }
    let mayor = null; //máximo, empieza sin valor
    for (const venta of ventas) {
        if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor;
}

//promedio del valor de las ventas válidas (cantidad mayor que 0)
function ticketPromedio(ventas) {
    let total = 0;
    let validas = 0; //contador de ventas válidas
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            validas++;
        }
    }
    if (validas === 0) {
        return 0; //evita dividir entre cero
    }
    return total / validas;
}

//total vendido en una ciudad, sin importar mayúsculas ni espacios
function ventasPorCiudad(ventas, ciudad) {
    const buscada = ciudad.trim().toLowerCase(); //normaliza la ciudad buscada
    let total = 0;
    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase(); //normaliza la ciudad del registro
        if (ciudadVenta === buscada) {
            total += valorVenta(venta);
        }
    }
    return total;
}

//exportamos las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};

//console.log(valorVentas());
