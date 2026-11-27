//calcula el valor de una venta: cantidad x precio
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

//quita espacios sobrantes y pasa a minúsculas
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}

//pone la primera letra en mayúscula: "medellín" -> "Medellín"
function formatearCiudad(ciudad) {
    const limpia = normalizarTexto(ciudad);
    return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

//suma el valor de todas las ventas
function totalVendido(ventas) {
    let total = 0; //acumulador
    for (const venta of ventas) {
        total += valorVenta(venta);
    }
    return total; //si el arreglo está vacío devuelve 0
}

//suma las unidades de todas las ventas
function unidadesVendidas(ventas) {
    let unidades = 0; //acumulador
    for (const venta of ventas) {
        unidades += venta.cantidad;
    }
    return unidades; //si el arreglo está vacío devuelve 0
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
    let total = 0; //acumulador de valor
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
    let total = 0; //acumulador
    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase(); //normaliza la ciudad del registro
        if (ciudadVenta === buscada) {
            total += valorVenta(venta);
        }
    }
    return total; //si no hay coincidencias devuelve 0
}

//versión con métodos: suma el valor de todas las ventas
function totalVendidoM(ventas) {
    return ventas.reduce((total, venta) => total + valorVenta(venta), 0); //reduce con valor inicial 0
}

//versión con métodos: suma las unidades de todas las ventas
function unidadesVendidasM(ventas) {
    return ventas.reduce((unidades, venta) => unidades + venta.cantidad, 0);
}

//versión con métodos: filtra la ciudad y suma su valor
function ventasPorCiudadM(ventas, ciudad) {
    const buscada = normalizarTexto(ciudad);
    return ventas
        .filter(venta => normalizarTexto(venta.ciudad) === buscada) //solo esa ciudad
        .reduce((total, venta) => total + valorVenta(venta), 0);
}

//total vendido por cada ciudad, en un objeto { Ciudad: total }
function totalPorCiudad(ventas) {
    return ventas.reduce((totales, venta) => {
        const ciudad = formatearCiudad(venta.ciudad); //"Bogotá " y "Bogotá" quedan igual
        totales[ciudad] = (totales[ciudad] || 0) + valorVenta(venta);
        return totales;
    }, {}); //objeto vacío como valor inicial
}

//unidades vendidas por cada producto, en un objeto { Producto: unidades }
function unidadesPorProducto(ventas) {
    return ventas.reduce((unidades, venta) => {
        const producto = venta.producto.trim();
        unidades[producto] = (unidades[producto] || 0) + venta.cantidad;
        return unidades;
    }, {});
}

//los k productos que más dinero generaron, de mayor a menor
function topProductosPorValor(ventas, k) {
    const valorPorProducto = ventas.reduce((valores, venta) => {
        const producto = venta.producto.trim();
        valores[producto] = (valores[producto] || 0) + valorVenta(venta);
        return valores;
    }, {});

    return Object.entries(valorPorProducto)
        .map(([producto, valor]) => ({ producto, valor })) //arreglo nuevo, no toca ventas
        .sort((a, b) => b.valor - a.valor) //de mayor a menor
        .slice(0, k); //solo los primeros k
}

//exportamos las funciones
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};