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