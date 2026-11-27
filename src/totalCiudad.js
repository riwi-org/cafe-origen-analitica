//normaliza el texto: quita espacios sobrantes y pasa a minúsculas
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}

//versión encadenada: map, filter, map y reduce (4 recorridos, 3 arreglos nuevos)
function totalCiudadCadena(ventas, ciudad) {
    const buscada = normalizarTexto(ciudad);
    return ventas
        .map(venta => ({ ciudad: normalizarTexto(venta.ciudad), venta })) //arreglo 1: tamaño n
        .filter(item => item.ciudad === buscada)                           //arreglo 2: tamaño m
        .map(item => item.venta.cantidad * item.venta.precio)              //arreglo 3: tamaño m
        .reduce((total, valor) => total + valor, 0);                       //sin arreglo nuevo
}

//versión de una pasada: un solo ciclo, sin arreglos intermedios
function totalCiudadUnaPasada(ventas, ciudad) {
    const buscada = normalizarTexto(ciudad);
    let total = 0; //acumulador
    for (const venta of ventas) {
        if (normalizarTexto(venta.ciudad) === buscada) {
            total += venta.cantidad * venta.precio;
        }
    }
    return total;
}

//exportamos las dos versiones
module.exports = { totalCiudadCadena, totalCiudadUnaPasada };