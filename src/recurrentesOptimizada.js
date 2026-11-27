//clientes recurrentes con Set: una pasada, sin recorrer la lista
function clientesRecurrentesSet(ventas) {
    const vistos = new Set();      //clientes que ya compraron al menos una vez
    const recurrentes = new Set(); //clientes que compraron más de una vez
    for (const venta of ventas) {
        if (vistos.has(venta.cliente)) {
            recurrentes.add(venta.cliente); //segunda compra o más
        } else {
            vistos.add(venta.cliente);
        }
    }
    return [...recurrentes.values()]; //devuelve un arreglo, como la versión original
}

//cuántas compras hizo cada cliente: Map de cliente -> número de compras
function comprasPorCliente(ventas) {
    const compras = new Map();
    for (const venta of ventas) {
        compras.set(venta.cliente, (compras.get(venta.cliente) || 0) + 1);
    }
    return compras;
}

//clientes recurrentes a partir del Map de compras (compras >= 2)
function clientesRecurrentesMap(ventas) {
    const recurrentes = [];
    for (const [cliente, numeroCompras] of comprasPorCliente(ventas)) {
        if (numeroCompras >= 2) {
            recurrentes.push(cliente);
        }
    }
    return recurrentes;
}

//exportamos las versiones optimizadas
module.exports = { clientesRecurrentesSet, comprasPorCliente, clientesRecurrentesMap };