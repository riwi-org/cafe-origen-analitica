# Rendimiento del motor: Café Origen

Este informe resume la complejidad de tiempo (T) y de espacio auxiliar (E) de cada función del motor, con sus mediciones con 10.000 ventas y una proyección a 1.000.000 de ventas.

**Notación:** `n` es el número de ventas; `m` las ventas que cumplen un filtro; `c` las ciudades distintas; `p` los productos distintos; `d` las ventas de un día; `r` los clientes recurrentes; `k` el número de productos del top.

**Cómo se midió:** `node src/medir_rendimiento.js`. Cada tiempo es un promedio de varias repeticiones. Los datos vienen de `generarVentas`, así que los valores cambian entre ejecuciones; las operaciones de las versiones instrumentadas no cambian. Las funciones menores a 1 ms tienen ruido de medición y se leen como órdenes de magnitud.

---

## 1. Tabla de funciones

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación (basada en el código) | Operaciones o tiempo medido (10.000 ventas) |
|---|---|---|---|---|---|
| `valorVenta` | Calcula cantidad × precio de una venta | O(1) | O(1) | Una sola multiplicación, sin ciclos ni arreglos | 1 operación; < 0,001 ms |
| `normalizarTexto` | Quita espacios y pasa a minúsculas | O(1) | O(1) | Trabaja con un texto corto; no depende de `n` | Auxiliar, no medido por separado |
| `formatearCiudad` | Pone mayúscula inicial a la ciudad | O(1) | O(1) | Llama a `normalizarTexto` y cambia una letra | Auxiliar, no medido por separado |
| `totalVendido` | Suma el valor de todas las ventas | O(n) | O(1) | Un `for...of` sobre las `n` ventas con un acumulador | 10.000 visitas; 0,22 ms |
| `unidadesVendidas` | Suma las cantidades | O(n) | O(1) | Un `for...of` y un acumulador | 0,03 ms |
| `ventaMayor` | Devuelve el registro con mayor valor | O(n) | O(1) | Un `for...of` que guarda una referencia; cada venta se compara una vez | 19.999 operaciones (10.000 visitas + 9.999 comparaciones); 0,17 ms |
| `ticketPromedio` | Promedio del valor de las ventas con cantidad > 0 | O(n) | O(1) | Un `for...of` con dos acumuladores | 0,18 ms |
| `ventasPorCiudad` | Total vendido en una ciudad | O(n) | O(1) | Un `for...of` que normaliza la ciudad de cada venta (costo fijo) | 0,40 ms |
| `totalVendidoM` | Versión con `reduce` de `totalVendido` | O(n) | O(1) | `reduce` recorre una vez y no crea arreglo | 0,12 ms |
| `unidadesVendidasM` | Versión con `reduce` de `unidadesVendidas` | O(n) | O(1) | `reduce` recorre una vez y no crea arreglo | 0,09 ms |
| `ventasPorCiudadM` | Versión con `filter` y `reduce` de `ventasPorCiudad` | O(n) | O(m); peor caso O(n) | `filter` crea un arreglo con las ventas de la ciudad | 0,45 ms |
| `totalPorCiudad` | Total por cada ciudad, en un objeto | O(n) | O(c) | `reduce` con un objeto que tiene una clave por ciudad | 20.000 operaciones; 0,89 ms |
| `unidadesPorProducto` | Unidades por cada producto, en un objeto | O(n) | O(p) | `reduce` con un objeto que tiene una clave por producto | 0,31 ms |
| `topProductosPorValor` | Los k productos que más dinero generan | O(n + p log p) | O(p) | `reduce` a objeto (O(n)), luego `sort` de p productos y `slice` de k | 0,33 ms |
| `ventasDelDia` | Ventas de una fecha exacta | O(n) | O(d); peor caso O(n) | `filter` recorre las `n` ventas y guarda las del día | 0,15 ms |
| `clientesRecurrentes` | Clientes con más de una compra | O(n²) típico; O(n³) peor caso | O(r) | Ciclo doble: `n(n-1)/2` comparaciones; `includes` se ejecuta en cada coincidencia y recorre la lista de recurrentes | 366 ms; 49.995.000 comparaciones de cliente |
| `totalCiudadCadena` | Total de una ciudad con `map`, `filter`, `map` y `reduce` | O(n) | O(n) | Cuatro recorridos (dos sobre `n`, dos sobre `m`) y tres arreglos intermedios de tamaños `n`, `m` y `m` | 0,53 ms |
| `totalCiudadUnaPasada` | Total de una ciudad en un solo ciclo | O(n) | O(1) | Un `for...of`, sin arreglos intermedios | 0,29 ms |
| `reporteCompleto` (`src/reporte.js`) | Todos los cálculos del reporte, sin `clientesRecurrentes` | O(n) | O(c + p + d) | Nueve llamadas, cada una O(n), y objetos pequeños para resultados | 2,24 ms |
| `generarVentas` | Genera n ventas de prueba | O(n) | O(n) | Un ciclo que crea n objetos; el arreglo es la salida | No medido en esta tabla (solo genera datos) |
| `totalVendidoI`, `ventaMayorI`, `totalPorCiudadI` | Versiones instrumentadas (cuentan operaciones) | O(n) | O(1) | Igual que la original, más un contador | 10.000; 19.999; 20.000 operaciones |
| `primeraVenta` | Devuelve la primera venta | O(1) | O(1) | Acceso directo a `ventas[0]` | 1 operación; < 0,001 ms |

**Nota sobre `totalPorCiudad`, `unidadesPorProducto` y `topProductosPorValor`:** su espacio depende de cuántas ciudades y productos distintos existan (`c` y `p`), no del número de ventas. Con los datos actuales son fijos (4 ciudades y 5 productos). En el peor caso, con una ciudad o un producto distinto por venta, llegan a O(n).

---

## 2. Proyección a 1.000.000 de ventas

**Método:** para las funciones lineales, `T(1M) = T(100k) × 10`, porque al multiplicar `n` por 10 el tiempo debe multiplicarse por 10. Se usó el tiempo medido con 100.000 ventas (`medir_rendimiento.js`). Para `clientesRecurrentes` se usó la medición real de 100.000 de v0.3 (58,4 s) y el exponente entre 16.000 y 100.000 (≈ 2,16), porque su crecimiento no es lineal.

| Función | Tiempo medido con 100.000 | Proyección a 1.000.000 | Comentario |
|---|---|---|---|
| `clientesRecurrentes` | 58,4 s (medido en v0.3) | **≈ 2,3 horas** | Crecimiento cuadrático; es el único reporte que no es casi instantáneo |
| `reporteCompleto` | 25,96 ms | ≈ 0,26 s | Suma de funciones lineales |
| `totalCiudadCadena` | 14,6 ms | ≈ 0,15 s (lineal); hasta ≈ 0,40 s con el exponente medido de 1,44 | Crece un poco más que lineal por la memoria de los arreglos intermedios |
| `totalPorCiudad` | 7,77 ms | ≈ 0,08 s | Lineal |
| `ventasPorCiudadM` | 5,24 ms | ≈ 0,05 s | Lineal |
| `topProductosPorValor` | 3,71 ms | ≈ 0,04 s | Lineal |
| `unidadesPorProducto` | 3,55 ms | ≈ 0,04 s | Lineal |
| `ventasPorCiudad` | 3,52 ms | ≈ 0,04 s | Lineal |
| `totalCiudadUnaPasada` | 2,73 ms | ≈ 0,03 s | Lineal |
| `ventasDelDia` | 1,71 ms | ≈ 0,02 s | Lineal |
| `ventaMayor` | 1,79 ms | ≈ 0,02 s | Lineal |
| `totalVendidoM` | 1,61 ms | ≈ 0,02 s | Lineal |
| `ticketPromedio` | 0,71 ms | ≈ 0,01 s | Lineal |
| `totalVendido` | 0,61 ms | ≈ 0,01 s | Lineal |
| `unidadesVendidasM` | 1,08 ms | ≈ 0,01 s | Lineal |
| `unidadesVendidas` | 0,39 ms | < 0,01 s | Lineal |
| `valorVenta`, `primeraVenta` | < 0,001 ms | < 0,001 s | Constante; no depende de `n` |

**Conclusión de la proyección:** con 1.000.000 de ventas, todas las funciones lineales siguen respondiendo en menos de un segundo. El único riesgo real es `clientesRecurrentes`, que tardaría unas 2,3 horas.

---

## 3. Riesgos

**Criterio de orden:**
1. **Primero, el crecimiento de la complejidad temporal.** Una función cuadrática o cúbica se vuelve inviable antes que una lineal, aunque ambas parezcan rápidas con 10.000 datos.
2. **Después, el espacio auxiliar.** Si la memoria crece con `n`, el riesgo sube aunque el tiempo sea lineal.
3. **Por último, la proyección medida a 1.000.000.** Confirma o desmiente lo que dicen los dos criterios anteriores.

**Orden de mayor a menor riesgo:**

| Posición | Función | Motivo | Proyección a 1M |
|---|---|---|---|
| 1 | `clientesRecurrentes` | Tiempo cuadrático (O(n²)), peor caso cúbico (O(n³)) por `includes`, y el reporte ya tardó minutos en la práctica | ≈ 2,3 h |
| 2 | `totalCiudadCadena` | Tiempo lineal, pero tres arreglos intermedios de tamaño O(n) y crecimiento medido algo mayor que lineal | ≈ 0,15 a 0,40 s |
| 3 | `ventasPorCiudadM` y `ventasDelDia` | Tiempo lineal, pero `filter` crea arreglos que pueden llegar a O(n) | ≈ 0,02 a 0,05 s |
| 4 | `totalPorCiudad`, `unidadesPorProducto`, `topProductosPorValor` | Tiempo lineal y espacio proporcional a ciudades o productos distintos, que hoy son pocos | ≈ 0,04 a 0,08 s |
| 5 | `reporteCompleto` | Suma de funciones lineales; tiempo bajo | ≈ 0,26 s |
| 6 | Resto de funciones lineales con espacio O(1) | Sin arreglos intermedios; el costo crece solo en línea recta | < 0,03 s |
| 7 | `valorVenta`, `primeraVenta`, `formatearCiudad`, `normalizarTexto` | Constantes | Sin riesgo |

---

## 4. Plan de optimización (función de mayor riesgo: `clientesRecurrentes`)

Esta sección describe la idea de mejora. **No se implementa todavía.**

### ¿Qué trabajo se repite?

1. **El ciclo doble vuelve a comparar cada par de ventas.** Cada venta se compara con todas las siguientes, así que el mismo cliente se compara muchas veces. Con 10.000 ventas son casi 50 millones de comparaciones.
2. **`includes` busca en la lista de recurrentes en cada coincidencia.** Cada vez que se encuentra un par del mismo cliente, la función vuelve a recorrer la lista desde el principio para saber si ese cliente ya está. Es trabajo repetido: la misma pregunta ("¿ya lo tengo?") se responde recorriendo una lista.

### ¿Qué información se podría guardar para no buscarla de nuevo?

Un **conteo por cliente**: un diccionario (o `Map`) donde la clave es el cliente y el valor es cuántas compras se han visto hasta ahora.

Con ese conteo:
- Se recorre el arreglo **una sola vez**: por cada venta, se suma 1 al conteo de su cliente.
- Al final, los clientes con conteo mayor o igual a 2 son los recurrentes.
- Preguntar "¿ya es recurrente?" deja de requerir recorrer una lista: basta con mirar el conteo, que cuesta un tiempo fijo en promedio.

### Resultado esperado 

| Aspecto | Actual | Con conteo por cliente |
|---|---|---|
| Tiempo | O(n²) típico, O(n³) peor caso | O(n) |
| Espacio auxiliar | O(r) | O(c), con `c` el número de clientes distintos |
| Operaciones con 10.000 ventas | ≈ 50 millones de comparaciones | ≈ 10.000 incrementos |

La mejora no cambia el resultado: los mismos clientes recurrentes, en el mismo orden de aparición si se conserva el orden del arreglo. Esto debe comprobarse con la función actual como referencia antes de reemplazarla.

---

## 5. Revisión por un compañero

**Estado: PENDIENTE.** Este informe debe revisarlo una persona del equipo. Las observaciones de la revisión y la respuesta a al menos una de ellas van en la bitácora.

### Revision por compañero:
**Samuel Gonzales:** revisó toda la bitacora, me comentó sobre agregarle el signo de peso "$" a las tablas que trataran cantidades monetarias, también un poco más de claridad en las tablas, tal vez el nombre de las columnas no eran lo suficientemente claras para entender los registros.