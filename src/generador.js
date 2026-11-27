//listas fijas para generar datos de prueba
const productos = [
    { nombre: "Origen Huila 500 g", precio: 42000 },
    { nombre: "Origen Nariño 250 g", precio: 26000 },
    { nombre: "Origen Sierra 500 g", precio: 45000 },
    { nombre: "Prensa francesa", precio: 95000 },
    { nombre: "Molino manual", precio: 120000 }
];
const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

//número al azar entre min y max, ambos incluidos
function aleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//elige un elemento al azar de una lista
function elegirAlAzar(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

//genera n ventas con la misma estructura de datos.js
function generarVentas(n) {
    const ventas = [];
    const maxClientes = Math.max(1, Math.floor(n / 3)); //entre 1 y n/3 clientes distintos
    for (let i = 0; i < n; i++) {
        const producto = elegirAlAzar(productos);
        const idCliente = aleatorioEntre(1, maxClientes);
        ventas.push({
            id: i + 1,
            fecha: `2026-09-0${aleatorioEntre(1, 6)}`, //días del 1 al 6, como en datos.js
            cliente: `C${String(idCliente).padStart(2, "0")}`,
            producto: producto.nombre,
            ciudad: elegirAlAzar(ciudades),
            cantidad: aleatorioEntre(1, 5),
            precio: producto.precio
        });
    }
    return ventas;
}

//exportamos el generador
module.exports = { generarVentas };