### Qué devuelve cada función con arreglo vacío

| Función            | Devuelve con `[]` | Razón                           |
|:-------------------|:------------------|:--------------------------------|
| `valorVenta`       | no aplica         | recibe una venta, no un arreglo |
| `totalVendido`     | `0`               | el acumulador no cambia         |
| `unidadesVendidas` | `0`               | el acumulador no cambia         |
| `ventaMayor`       | `null`            | no hay registro que devolver    |
| `ticketPromedio`   | `0`               | evita dividir entre cero        |
| `ventasPorCiudad`  | `0`               | no hay coincidencias            |

---

### Traza manual 1: `ventasPorCiudad(ventas, "Medellín")`

* **Entrada normalizada:** `"medellín"`. Se suma solo cuando la ciudad coincide.

| id | ciudad normalizada | coincide | cantidad | precio | valor  | total acumulado |
|:--:|:-------------------|:--------:|:--------:|:------:|:------:|:---------------:|
| 1  | medellín           |    sí    |    2     | 42000  | 84000  |      84000      |
| 2  | bogotá             |    no    |    1     | 26000  |   -    |      84000      |
| 3  | cali               |    no    |    1     | 95000  |   -    |      84000      |
| 4  | medellín           |    sí    |    1     | 42000  | 42000  |     126000      |
| 5  | medellín           |    sí    |    3     | 45000  | 135000 |     261000      |
| 6  | bogotá             |    no    |    2     | 26000  |   -    |     261000      |
| 7  | bogotá             |    no    |    1     | 120000 |   -    |     261000      |
| 8  | cali               |    no    |    0     | 42000  |   -    |     261000      |
| 9  | cali               |    no    |    2     | 45000  |   -    |     261000      |
| 10 | pereira            |    no    |    4     | 42000  |   -    |     261000      |
| 11 | medellín           |    sí    |    1     | 95000  | 95000  |     356000      |
| 12 | bogotá             |    no    |    3     | 26000  |   -    |     356000      |

> **Resultado a mano:** `356000`. El registro `5` tiene `"medellín"` en minúscula y se cuenta igual gracias a
> `toLowerCase()`.

---

### Traza manual 2: `ticketPromedio(ventas)`

* Solo cuentan las ventas con `cantidad > 0`. La venta `8` tiene cantidad `0` y no entra.

| id | cantidad | válida | valor  | total acumulado | contador de válidas |
|:--:|:--------:|:------:|:------:|:---------------:|:-------------------:|
| 1  |    2     |   sí   | 84000  |      84000      |          1          |
| 2  |    1     |   sí   | 26000  |     110000      |          2          |
| 3  |    1     |   sí   | 95000  |     205000      |          3          |
| 4  |    1     |   sí   | 42000  |     247000      |          4          |
| 5  |    3     |   sí   | 135000 |     382000      |          5          |
| 6  |    2     |   sí   | 52000  |     434000      |          6          |
| 7  |    1     |   sí   | 120000 |     554000      |          7          |
| 8  |    0     |   no   |   -    |     554000      |          7          |
| 9  |    2     |   sí   | 90000  |     644000      |          8          |
| 10 |    4     |   sí   | 168000 |     812000      |          9          |
| 11 |    1     |   sí   | 95000  |     907000      |         10          |
| 12 |    3     |   sí   | 78000  |     985000      |         11          |

> **Resultado a mano:** `985000 / 11 = 89545.45`
> ------
**Uso de la IA:**

* Claude escribió analitica.js (a partir explorar.js, datos.js) y la bitácora, siguiendo las
  instrucciones y la rúbrica del ejercicio.
* Las decisiones sobre el arreglo vacío fueron propuestas por Claude y están documentadas.
-------------

### Funciones de colecciones

* **Las cinco preguntas:** ¿qué recorro?, ¿qué filtro?, ¿qué transformo?, ¿qué acumulo?, ¿cómo agrupo?

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `totalVendidoM` | todas las ventas | nada | valor de cada venta con `valorVenta` | suma con `reduce` (inicial `0`) | no aplica |
| `unidadesVendidasM` | todas las ventas | nada | nada, usa `cantidad` directo | suma de `cantidad` con `reduce` (inicial `0`) | no aplica |
| `ventasPorCiudadM` | todas las ventas | ciudad normalizada igual a la buscada | valor de cada venta | suma con `reduce` (inicial `0`) | no aplica |
| `totalPorCiudad` | todas las ventas | nada | ciudad con formato `"Medellín"` y valor de la venta | suma por ciudad en un objeto con `reduce` (inicial `{}`) | por ciudad (la clave del objeto) |
| `unidadesPorProducto` | todas las ventas | nada | producto sin espacios sobrantes | suma de `cantidad` por producto | por producto (la clave del objeto) |
| `topProductosPorValor` | todas las ventas, y luego el resumen por producto | nada | objeto a arreglo `{ producto, valor }` con `Object.entries` y `map` | valor por producto con `reduce`; luego `sort` de mayor a menor y `slice(0, k)` | por producto (la clave del objeto) |


---
### Reporte de la v0.1

`node src/reporte.js` muestra cuatro secciones más la de ventas por día: resumen general, ventas por ciudad, unidades por producto, top 3 por valor y ventas por día. Los valores en pesos usan `toLocaleString("es-CO")` y se redondean para no mostrar decimales.

- Día con ventas: `2026-09-03` (2 ventas, 5 unidades, $ 187.000).
- Día sin ventas: `2026-09-07` (mensaje "sin ventas registradas ese día", sin error).

### Uso de IA en esta versión

**Herramienta:** Claude (Anthropic), usado como asistente de programación en el chat.

**Qué generó Claude en v0.1:**
- `src/reporte.js`: estructura de las cinco secciones, formato de pesos y alineación.
- `analitica.js`: función `ventasDelDia`, agregada a las exportaciones.
- `README.md`: descripción, estructura, requisitos, cómo ejecutar y preguntas que responde.
- Esta bitácora: tablas de funciones y estructura de los apartados de errores.
- Verificación: ejecución de `node src/reporte.js` para revisar que no aparezcan `NaN` ni `undefined`.

**Qué decidió el estudiante (o hay que confirmar):**
- Los dos días de ejemplo (`2026-09-03` con ventas y `2026-09-07` sin ventas).
- Los criterios de orden (mayor a menor) y el número de productos del top (3).

**Qué no hizo la IA:**
- No reprodujo los dos errores de la gerente, porque no se describieron. Esa parte queda pendiente.
- No hizo commit ni push: no tiene acceso al repositorio local en la máquina del estudiante.


-------------------------------------------------------------------------------
## v0.2: medición de operaciones (Big O)

### Predicciones (escritas antes de medir)

Pregunta: si n se multiplica por 10, ¿cuánto se multiplica el número de operaciones de cada función?

| Función | Conteo que espero | Predicción al multiplicar n por 10 |
|---|---|---|
| `totalVendido` | 1 operación por visita, n visitas | ×10 |
| `ventaMayor` | n visitas + n-1 comparaciones, unas 2n | ×10 |
| `totalPorCiudad` | n visitas + n revisiones de clave, unas 2n | ×10 |
| `primeraVenta` | 1 acceso, sin importar n | ×1 |

Clasificación que espero: las tres primeras O(n), `primeraVenta` O(1), ninguna O(n²).

### Resultados (`node src/medir.js`)

| n | totalVendido | ventaMayor | totalPorCiudad | primeraVenta |
|---|---|---|---|---|
| 100 | 100 | 199 | 200 | 1 |
| 1.000 | 1.000 | 1.999 | 2.000 | 1 |
| 10.000 | 10.000 | 19.999 | 20.000 | 1 |
| 100.000 | 100.000 | 199.999 | 200.000 | 1 |

Al multiplicar n por 10:

| Función | Razón entre operaciones | Predicción | ¿Coincide? |
|---|---|---|---|
| `totalVendido` | 10.00 | ×10 | sí |
| `ventaMayor` | 10.05 y luego 10.00 | ×10 | sí |
| `totalPorCiudad` | 10.00 | ×10 | sí |
| `primeraVenta` | 1.00 | ×1 | sí |

### Clasificación Big O

- **`totalVendido`: O(n).** Hay una visita por elemento y no hay ciclos anidados. Cuenta exactamente n operaciones.
- **`ventaMayor`: O(n).** Hay n visitas y n-1 comparaciones, es decir 2n-1 operaciones. La constante 2 no cambia la clase.
- **`totalPorCiudad`: O(n).** Hay n visitas y n revisiones de clave en el objeto. Suponemos que buscar una clave en el objeto cuesta O(1), así que el total es 2n.
- **`primeraVenta`: O(1).** Accede a una posición fija sin recorrer el arreglo. Siempre cuenta 1, sin importar n.
- **Ninguna función es O(n²).** Ninguna tiene ciclos anidados sobre `ventas`, y la razón entre tamaños consecutivos es 10, no 100.

**Limitaciones de la medición:** contamos operaciones lógicas, no tiempo de ejecución. El tiempo real puede variar por memoria o por cómo el motor optimiza el código. Además, el conteo de `totalPorCiudad` supone que la búsqueda en objeto es O(1), lo cual es lo habitual pero no está garantizado en todos los casos.

### Uso de IA en v0.2

**Qué generó Claude:**
- `src/generador.js`: `generarVentas(n)` con listas fijas de productos y ciudades, y elección al azar de cliente, cantidad y fecha.
- `src/instrumentadas.js`: versiones instrumentadas de `totalVendido`, `ventaMayor`, `totalPorCiudad` y `primeraVenta`, con un contador pasado por referencia.
- `src/medir.js`: ejecución para los cuatro tamaños, tablas de operaciones y de crecimiento.
- Las predicciones de esta sección las escribió Claude antes de ejecutar `medir.js`.
- Esta sección de la bitácora.

**Qué decidió el estudiante (o hay que confirmar):**
- Qué cuenta como "operación" (visita, comparación, revisión de clave).
- Que los datos de prueba sean aleatorios pero con la misma estructura que el Día 1.