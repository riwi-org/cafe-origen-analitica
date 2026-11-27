//datos, catálogo y funciones nuevas
const ventas = require('./datos');
const { generarVentas } = require('./generador');
const catalogo = require('./catalogo');
const { comboRegalo, comboRegaloOptimizado } = require('./combos');
const { productoEstrellaPorCiudad, primerClienteUnico } = require('./analisis_ventas');

//nombres de un combo, para mostrarlo legible
const nombres = combo => (combo === null ? null : combo.map(p => p.nombre).join(' + '));

//1. comboRegalo: fuerza bruta y optimizada con 87.000, 61.000 y un valor imposible
console.log('--- comboRegalo ---');
for (const valor of [87000, 61000, 200000]) {
    const bruta = comboRegalo(catalogo, valor);
    const optimizada = comboRegaloOptimizado(catalogo, valor);
    console.log(`valor ${valor}: fuerza bruta -> ${nombres(bruta)} | optimizada -> ${nombres(optimizada)}`);
}

//2. casos borde del combo
console.log('catálogo vacío, 87.000:', comboRegaloOptimizado([], 87000));

//3. comprobación aleatoria: ambas versiones deben acertar la existencia y la suma
let errores = 0;
for (let prueba = 0; prueba < 2000; prueba++) {
    const p = 2 + Math.floor(Math.random() * 20);
    const cat = Array.from({ length: p }, (_, i) => ({ id: i, nombre: `P${i}`, precio: 1000 * (1 + Math.floor(Math.random() * 50)) }));
    const valor = 1000 * (2 + Math.floor(Math.random() * 100));
    const bruta = comboRegalo(cat, valor);
    const optimizada = comboRegaloOptimizado(cat, valor);
    const existeBruta = bruta !== null;
    const existeOptimizada = optimizada !== null;
    const sumaOK = !existeOptimizada || optimizada[0].precio + optimizada[1].precio === valor;
    const distintos = !existeOptimizada || optimizada[0] !== optimizada[1];
    if (existeBruta !== existeOptimizada || !sumaOK || !distintos) errores++;
}
console.log('comprobación aleatoria (2.000 catálogos), errores:', errores);

//4. productoEstrellaPorCiudad con el Día 1
console.log('--- productoEstrellaPorCiudad (Día 1) ---');
console.log(productoEstrellaPorCiudad(ventas));
console.log('sin ventas:', productoEstrellaPorCiudad([]));

//5. primerClienteUnico con el Día 1 y casos borde
console.log('--- primerClienteUnico ---');
console.log('Día 1:', primerClienteUnico(ventas), '(esperado C04)');
console.log('vacío:', primerClienteUnico([]));
console.log('todos repetidos:', primerClienteUnico([ventas[0], ventas[0]]));

//6. comparación con una versión de fuerza bruta en 5.000 ventas generadas
const grandes = generarVentas(5000);
const bruto = arr => {
    for (const v of arr) {
        if (arr.filter(x => x.cliente === v.cliente).length === 1) return v.cliente;
    }
    return null;
};
console.log('5.000 ventas: optimizada =', primerClienteUnico(grandes), '| fuerza bruta =', bruto(grandes));