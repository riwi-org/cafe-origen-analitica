//medición de las tres versiones de clientes recurrentes
const { performance } = require('perf_hooks');
const { generarVentas } = require('./generador');
const { clientesRecurrentes } = require('./recurrentes');
const { clientesRecurrentesSet, clientesRecurrentesMap } = require('./recurrentesOptimizada');

//tamaños de entrada; la original solo hasta 10.000 (en 100.000 tarda ~58 s, medido en v0.3)
const tamanos = [1000, 10000, 100000];
const LIMITE_ORIGINAL = 10000;

//mediana de tres repeticiones, en milisegundos
function medianaMs(fn, datos) {
    const tiempos = [];
    for (let r = 0; r < 3; r++) {
        const inicio = performance.now();
        fn(datos);
        tiempos.push(performance.now() - inicio);
    }
    tiempos.sort((x, y) => x - y);
    return tiempos[1];
}

//calentamiento para que el motor compile las funciones
const pequenas = generarVentas(1000);
clientesRecurrentes(pequenas);
clientesRecurrentesSet(pequenas);
clientesRecurrentesMap(pequenas);

const resultados = tamanos.map(n => {
    const datos = generarVentas(n);

    //original: solo hasta el límite razonable
    const msOriginal = n <= LIMITE_ORIGINAL ? medianaMs(clientesRecurrentes, datos) : null;
    const msSet = medianaMs(clientesRecurrentesSet, datos);
    const msMap = medianaMs(clientesRecurrentesMap, datos);

    //tiempo de una ejecución con console.time (para la bitácora)
    console.time(`Set n=${n}`);
    clientesRecurrentesSet(datos);
    console.timeEnd(`Set n=${n}`);
    console.time(`Map n=${n}`);
    clientesRecurrentesMap(datos);
    console.timeEnd(`Map n=${n}`);

    return { n, msOriginal, msSet, msMap };
});

//tabla de tiempos
console.log('--- tiempos (ms, mediana de 3) ---');
console.table(resultados.map(r => ({
    'n': r.n,
    'original (ms)': r.msOriginal === null ? 'no medido' : Number(r.msOriginal.toFixed(2)),
    'Set (ms)': Number(r.msSet.toFixed(2)),
    'Map (ms)': Number(r.msMap.toFixed(2))
})));

//crecimiento: razón al multiplicar n por 10 (lineal ≈ 10, cuadrático ≈ 100)
const crecimiento = resultados.slice(1).map((fila, i) => {
    const anterior = resultados[i];
    const razon = (actual, previo) => (actual === null || previo === null) ? 'n/a' : (actual / previo).toFixed(2);
    return {
        'n (anterior -> actual)': `${anterior.n} -> ${fila.n}`,
        'razón original': razon(fila.msOriginal, anterior.msOriginal),
        'razón Set': razon(fila.msSet, anterior.msSet),
        'razón Map': razon(fila.msMap, anterior.msMap)
    };
});
console.log('--- crecimiento al multiplicar n por 10 ---');
console.table(crecimiento);