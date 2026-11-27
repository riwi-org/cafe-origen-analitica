//medición de tiempo de clientesRecurrentes
const { performance } = require('perf_hooks');
const { generarVentas } = require('./generador');
const { clientesRecurrentes } = require('./recurrentes');

//tamaños que se duplican
const tamanos = [1000, 2000, 4000, 8000, 16000];

//control: mismas ventas pero solo 8 clientes distintos
function conPocosClientes(ventas) {
    return ventas.map((venta, i) => ({ ...venta, cliente: `C0${(i % 8) + 1}` }));
}

//mide el tiempo con console.time y también devuelve los milisegundos para la tabla
function medir(etiqueta, ventas) {
    console.time(etiqueta);
    const inicio = performance.now();
    clientesRecurrentes(ventas);
    const ms = performance.now() - inicio;
    console.timeEnd(etiqueta);
    return ms;
}

//tabla con los dos escenarios
const filas = tamanos.map(n => {
    const ventas = generarVentas(n);
    const msVariables = medir(`clientes variables n=${n}`, ventas);
    const msPocos = medir(`8 clientes n=${n}`, conPocosClientes(ventas));
    return {
        n,
        'ms (clientes variables)': Number(msVariables.toFixed(1)),
        'ms (8 clientes)': Number(msPocos.toFixed(1))
    };
});

console.log('Tiempos de clientesRecurrentes');
console.table(filas);

//razón entre cada tamaño y el anterior, para ver si se multiplica por 4
const razones = filas.slice(1).map((fila, i) => {
    const anterior = filas[i];
    return {
        'n (anterior -> actual)': `${anterior.n} -> ${fila.n}`,
        'razón (clientes variables)': (fila['ms (clientes variables)'] / anterior['ms (clientes variables)']).toFixed(2),
        'razón (8 clientes)': (fila['ms (8 clientes)'] / anterior['ms (8 clientes)']).toFixed(2)
    };
});
console.log('Razón al duplicar n (cuadrática sería cerca de 4)');
console.table(razones);