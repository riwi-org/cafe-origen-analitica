//clientes que compraron más de una vez (versión original del compañero)
function clientesRecurrentes(ventas) {
    const recurrentes = [];
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    return recurrentes;
}

//exportamos la función
module.exports = { clientesRecurrentes };