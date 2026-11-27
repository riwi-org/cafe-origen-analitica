//fuerza bruta: prueba todos los pares de productos distintos (i < j)
//tiempo O(p²), espacio O(1), con p = número de productos
function comboRegalo(catalogo, valor) {
    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null; //ningún par suma el valor
}

//optimizada: una sola pasada con un Map de precios ya vistos
//tiempo O(p), espacio O(p)
function comboRegaloOptimizado(catalogo, valor) {
    const vistos = new Map(); //precio -> producto
    for (const producto of catalogo) {
        const complemento = valor - producto.precio; //lo que falta para llegar al valor
        if (vistos.has(complemento)) {
            return [vistos.get(complemento), producto];
        }
        //se guarda después de revisar, así un producto no se combina consigo mismo
        vistos.set(producto.precio, producto);
    }
    return null; //ninguna combinación posible
}

//exportamos las dos versiones
module.exports = { comboRegalo, comboRegaloOptimizado };