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

---

Ventas de prueba: `C01, C02, C01, C03, C02`.

| par (i, j) | clientes | ¿igual? | ¿llamada a `includes`? | acción |
|---|---|---|---|---|
| (0,1) | C01 vs C02 | no | no | - |
| (0,2) | C01 vs C01 | sí | sí, lista vacía | agrega C01 |
| (0,3) | C01 vs C03 | no | no | - |
| (0,4) | C01 vs C02 | no | no | - |
| (1,2) | C02 vs C01 | no | no | - |
| (1,3) | C02 vs C03 | no | no | - |
| (1,4) | C02 vs C02 | sí | sí, lista [C01] | agrega C02 |
| (2,3) | C01 vs C03 | no | no | - |
| (2,4) | C01 vs C02 | no | no | - |
| (3,4) | C03 vs C02 | no | no | - |

Resultado: 10 comparaciones de cliente, 2 llamadas a `includes`, lista final `[C01, C02]`.

**Generalización:** el ciclo interno hace una comparación por cada par de ventas, es decir `n(n-1)/2`. Con `n = 5` son 10 ✓. Como `n(n-1)/2` crece con `n²`, al duplicar `n` el número de comparaciones se multiplica por cerca de 4.

### Medición (`node src/medir_recurrentes.js`)

Se midió cada tamaño con dos escenarios: datos del generador (clientes entre 1 y n/3) y un control con solo 8 clientes.

**Ejecución 1 (usada para la estimación):**

| n | ms (clientes variables) | ms (8 clientes) |
|---|---|---|
| 1.000 | 12,1 | 5,1 |
| 2.000 | 12,4 | 13,5 |
| 4.000 | 45,3 | 52,5 |
| 8.000 | 224,6 | 217,5 |
| 16.000 | 1.105,8 | 844,6 |

Razón al duplicar `n`:

| n (anterior → actual) | razón (clientes variables) | razón (8 clientes) |
|---|---|---|
| 1.000 → 2.000 | 1,02 | 2,65 |
| 2.000 → 4.000 | 3,65 | 3,89 |
| 4.000 → 8.000 | 4,96 | 4,14 |
| 8.000 → 16.000 | 4,92 | 3,88 |

**Ejecución 2 (repetición, solo razones):**

| n (anterior → actual) | razón (clientes variables) | razón (8 clientes) |
|---|---|---|
| 1.000 → 2.000 | 2,46 | 2,72 |
| 2.000 → 4.000 | 3,67 | 3,88 |
| 4.000 → 8.000 | 5,08 | 3,98 |
| 8.000 → 16.000 | 6,07 | 4,24 |

**Nota sobre la variación:** las razones cambian entre ejecuciones, sobre todo en los tamaños chicos y en la última duplicación con clientes variables (4,9 en la ejecución 1 y 6,1 en la 2). Los tiempos de milisegundos no son estables, así que las conclusiones se apoyan en el patrón general y no en un número exacto.

### Análisis

- **Con 8 clientes** las razones se quedan cerca de 4 en los tamaños grandes, en las dos ejecuciones. Eso es crecimiento cuadrático, O(n²). La razón de 2,65 o 2,72 en la primera fila es ruido: los tiempos son muy pequeños y el motor todavía está calentando.
- **Con clientes variables** las razones son mayores que 4 en los tamaños grandes. Eso se explica porque la lista `recurrentes` también crece con `n`: en `n = 16.000` hay 4.260 clientes recurrentes, y cada `includes` recorre más elementos.

### Estimación para 100.000 y 1.000.000 (a partir de la medición)

Base: 1.105,8 ms con `n = 16.000` (clientes variables, ejecución 1).

| N | Estimación cuadrática (exponente 2) | Estimación con exponente medido (2,30, ejecución 1) |
|---|---|---|
| 100.000 | 43 s | 75 s |
| 1.000.000 | 4.320 s (unos 72 min) | 14.852 s (unas 4 h 8 min) |

Exponente medido en la ejecución 1: `log₂(4,92) ≈ 2,30`. En la ejecución 2 la última duplicación da `log₂(6,07) ≈ 2,60`, lo que alargaría la estimación de 1.000.000 a varias horas más.

**Conclusión sobre la estimación:** para 1.000.000 el resultado es un orden de magnitud: entre 1 hora y varias horas. Depende de la máquina y de cuánto crezca la lista `recurrentes`.

**Decisión:** como la estimación de 100.000 es menor a 2 minutos, se ejecutó. **Resultado real: 58,4 s**, con 26.722 clientes recurrentes. Queda dentro del rango estimado (43 s a 75 s), en una sola ejecución.

**No se ejecutó 1.000.000**, porque la estimación es de horas. Solo tiene la estimación.

### Costo oculto: `recurrentes.includes`

Instrumentación con los datos del generador en `n = 16.000`:

- Pares revisados: 127.992.000.
- Coincidencias de cliente (llamadas a `includes`): 23.966.
- Pasos dentro de `includes`: 63.409.757.

Es decir, `includes` agrega cerca de la mitad del trabajo del ciclo.

**Peor caso:** `includes` se ejecuta en cada coincidencia de cliente, no solo la primera vez, porque la comprobación de `includes` va después de la igualdad. Cada llamada cuesta hasta `k` pasos, donde `k` es el tamaño de `recurrentes`. Con `m` coincidencias, el costo extra es O(m·k). En el peor caso, `m` se acerca a `n²/2` y `k` se acerca a `n`, y el total llega a O(n³). Por ejemplo, si un cliente tiene casi todas las ventas y muchos otros clientes ya están en la lista, cada coincidencia de ese cliente recorre una lista larga.

En los datos típicos del generador, `k` crece con `n`, así que la función se comporta como O(n²) con un factor extra. En el peor caso teórico es O(n³).

### Clasificación

- **`clientesRecurrentes` con datos típicos: O(n²).** El ciclo doble domina.
- **Peor caso: O(n³)**, por `includes` dentro del ciclo doble.

### Conclusión para la gerente

El reporte de clientes recurrentes compara cada venta con todas las demás, una por una. Con 100 ventas hace unas 5.000 comparaciones; con 16.000 hace unas 128 millones; con 100.000 hace unos 5.000 millones. Por eso el tiempo sube muy rápido: cada vez que el historial se duplica, el reporte tarda alrededor de cuatro veces más o más. Con el historial anual de unas 100.000 ventas tarda cerca de un minuto, y con un millón de ventas tardaría horas.

La corrección es revisar cada venta una sola vez y llevar un registro de los clientes que ya se contaron. Eso debería reducir el tiempo a una fracción de segundo, pero hay que probarlo antes de darlo por hecho.


**Qué generó Claude:**
- `src/medir_recurrentes.js`: medición con `console.time` y `console.timeEnd`, tabla de tiempos y tabla de razones.
- La traza de 5 ventas y la instrumentación de comparaciones y pasos de `includes`.
- La estimación para 100.000 y 1.000.000, calculada a partir de las mediciones.
- La ejecución real de 100.000 y su comparación con la estimación.
- La conclusión para la gerente y esta sección de la bitácora.

**Qué no hizo la IA:**
- No escribió la función `clientesRecurrentes`; es el código del compañero, sin cambios.
- No corrigió la función. Solo la diagnosticó.

**Qué decidió el estudiante (o hay que confirmar):**
- Los tamaños de la tabla (1.000 a 16.000).
- El control con 8 clientes para separar el efecto de `n`.
- La regla de ejecutar 100.000 solo si la estimación es menor a 2 minutos.

---

### Comprobación de resultados (10.000 ventas del generador)

| ciudad | encadenada | una pasada | ¿igual? |
|---|---|---|---|
| Medellín | 505.535.000 | 505.535.000 | OK |
| Bogotá | 477.524.000 | 477.524.000 | OK |
| Cali | 500.929.000 | 500.929.000 | OK |
| Pereira | 509.539.000 | 509.539.000 | OK |

### Recorridos y arreglos intermedios

**Versión encadenada** (`map` → `filter` → `map` → `reduce`), con 10.000 ventas y `m = 2.439` ventas de Bogotá:

| paso | recorre | arreglo nuevo |
|---|---|---|
| `map` (normaliza) | 10.000 | 10.000 |
| `filter` (ciudad) | 10.000 | 2.439 |
| `map` (valor) | 2.439 | 2.439 |
| `reduce` (suma) | 2.439 | 0 |

- Recorridos completos: **4 pasadas** en total. Dos sobre los `n` datos originales y dos sobre el arreglo filtrado de tamaño `m`.
- Arreglos nuevos: **3** (tamaños `n`, `m` y `m`).
- Tiempo: `n + n + m + m`, y como `m ≤ n`, el peor caso es `4n`. Es **O(n)** en tiempo.
- Espacio auxiliar: `n + m + m`, con peor caso `3n`. Es **O(n)** en espacio.

**Versión de una pasada** (`for...of` con acumulador):

- Recorridos completos: **1** (las 10.000 visitas).
- Arreglos nuevos: **0**. Solo usa dos variables (`buscada` y `total`).
- Tiempo: **O(n)**.
- Espacio auxiliar: **O(1)**.

### Por qué `O(4n)` se simplifica a `O(n)`

Big O describe cómo crece el tiempo cuando `n` se hace muy grande. El factor 4 es una constante: no depende de `n`, depende de cuántos recorridos escribimos. Si `n` se duplica, el tiempo de la versión encadenada se duplica, igual que el de la versión de una pasada. Las dos crecen en línea recta, así que las dos son O(n).

La regla de simplificación elimina las constantes multiplicativas (`4n → n`) y los términos de menor grado. Por eso la diferencia de 4 pasadas contra 1 no cambia la clase de complejidad, aunque sí afecte el tiempo real. Lo mismo pasa con `2n + 2m`: como `m ≤ n`, queda `O(n)`.

### Clasificación de complejidad espacial de todas las funciones del motor

| Función | Espacio auxiliar | Razón |
|---|---|---|
| `valorVenta` | O(1) | solo calcula un número |
| `normalizarTexto`, `formatearCiudad` | O(1) | trabajan con un texto corto, no con el arreglo |
| `totalVendido`, `unidadesVendidas` | O(1) | solo un acumulador |
| `ventaMayor` | O(1) | guarda una referencia a un registro |
| `ticketPromedio` | O(1) | dos acumuladores |
| `ventasPorCiudad` | O(1) | un acumulador |
| `totalVendidoM`, `unidadesVendidasM` | O(1) | `reduce` no crea arreglo |
| `ventasPorCiudadM` | O(m) | `filter` crea un arreglo con las ventas de la ciudad; peor caso O(n) |
| `totalCiudadCadena` | O(n) | tres arreglos intermedios |
| `totalCiudadUnaPasada` | O(1) | sin arreglos intermedios |
| `totalPorCiudad` | O(c) | un objeto con una clave por ciudad; `c` es fijo (4), así que en la práctica O(1); peor caso O(n) si cada venta fuera de otra ciudad |
| `unidadesPorProducto` | O(p) | un objeto con una clave por producto; `p` es fijo (5); peor caso O(n) |
| `topProductosPorValor` | O(p) | dos objetos y un arreglo `{producto, valor}` de tamaño `p`; el `sort` sobre `p` elementos; peor caso O(n) |
| `ventasDelDia` | O(d) | `filter` crea un arreglo con las ventas del día; peor caso O(n) |
| `clientesRecurrentes` | O(r) | arreglo de clientes recurrentes, `r ≤ n` |
| `primeraVenta` | O(1) | una referencia |
| `generarVentas(n)` | O(n) | crea los `n` registros, que es la salida misma |
| funciones instrumentadas (`totalVendidoI`, etc.) | O(1) | solo el contador |

**Puntos a destacar:**
- `totalPorCiudad` y `topProductosPorValor` guardan resultados en objetos, así que su memoria crece con la cantidad de ciudades o productos distintos, no con `n`. Con los datos actuales es constante, pero si el negocio vendiera en cientos de ciudades, el espacio crecería.
- `ventasPorCiudadM` tiene el mismo patrón de `filter` que la versión encadenada, pero en menor escala: crea un solo arreglo en lugar de tres.

### Decisión: qué versión queda en el motor

**Se deja `totalCiudadUnaPasada`.**

Argumentos de recursos:
- Recorre los datos una sola vez y no crea arreglos. Con el historial anual de 100.000 ventas, la versión encadenada crearía del orden de 200.000 registros intermedios para una sola ciudad; la de una pasada no crea ninguno.
- El costo de una pasada es el mínimo posible: hay que mirar cada venta al menos una vez.

Argumentos de legibilidad:
- La versión encadenada se lee como una frase (normalizar, filtrar, calcular, sumar), y eso ayuda a entender el flujo.
- La versión de una pasada usa un ciclo `for...of` y un `if`, que el equipo ya conoce de los MiniRetos. Son pocas líneas y el propósito queda claro con el nombre de la función y el comentario.

Conclusión: la diferencia de legibilidad es pequeña y la de recursos es grande, así que se prefiere la versión de una pasada. La versión encadenada se conserva en `src/totalCiudad.js` como referencia para comparar, pero el reporte no la usa.


**Qué generó Claude:**
- `src/totalCiudad.js`: `totalCiudadCadena` y `totalCiudadUnaPasada`.
- `src/comprobar_totalCiudad.js`: comparación de resultados con 10.000 ventas y el conteo paso a paso de los arreglos.
- Las tablas de recorridos y arreglos, la explicación de la simplificación Big O y la clasificación espacial.

**Qué decidió el estudiante (o hay que confirmar):**
- Qué versión queda en el motor (se recomendó `totalCiudadUnaPasada`).
- Si `ventasPorCiudadM` se reemplaza por una versión de una pasada o se mantiene como ejemplo.