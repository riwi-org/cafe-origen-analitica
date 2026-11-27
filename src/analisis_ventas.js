//quita espacios sobrantes y pasa a minúsculas
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}

//pone la primera letra en mayúscula: "medellín" -> "Medellín"
function formatearCiudad(ciudad) {
    const limpia = normalizarTexto(ciudad);
    return limpia.charAt(0).toUpperCase() + limpia.slice(1);
}

//producto estrella por ciudad: cuenta las apariciones de cada producto en cada ciudad
//desempate: si hay empate, gana el producto que apareció primero en esa ciudad
//(Map conserva el orden en que se insertaron las claves)
function productoEstrellaPorCiudad(ventas) {
    const frecuencias = new Map(); //ciudad normalizada -> Map(producto -> apariciones)
    for (const venta of ventas) {
        const ciudad = normalizarTexto(venta.ciudad);
        if (!frecuencias.has(ciudad)) {
            frecuencias.set(ciudad, new Map());
        }
        const porProducto = frecuencias.get(ciudad);
        porProducto.set(venta.producto, (porProducto.get(venta.producto) || 0) + 1);
    }

    const estrellas = {}; //ciudad -> producto más frecuente
    for (const [ciudad, porProducto] of frecuencias) {
        let mejor = null;
        let mejorCuenta = 0;
        for (const [producto, cuenta] of porProducto) {
            if (cuenta > mejorCuenta) { //mayor estricto: en empate gana el primero visto
                mejor = producto;
                mejorCuenta = cuenta;
            }
        }
        estrellas[formatearCiudad(ciudad)] = mejor;
    }
    return estrellas; //si no hay ventas devuelve {}
}

//primer cliente, en orden de las ventas, que aparece una sola vez en todo el historial
//dos recorridos: el primero cuenta, el segundo busca
function primerClienteUnico(ventas) {
    const conteo = new Map(); //cliente -> cuántas ventas tiene
    for (const venta of ventas) {
        conteo.set(venta.cliente, (conteo.get(venta.cliente) || 0) + 1);
    }
    for (const venta of ventas) {
        if (conteo.get(venta.cliente) === 1) {
            return venta.cliente;
        }
    }
    return null; //si no hay clientes únicos o no hay ventas
}

//exportamos las funciones
module.exports = { productoEstrellaPorCiudad, primerClienteUnico };