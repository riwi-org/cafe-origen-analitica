# Café Origen: análisis de ventas

Proyecto en JavaScript (Node.js) que lee un arreglo de ventas y genera un reporte con los indicadores principales del negocio.

## Estructura

```
cafe-origen-analitica/
├── README.md
└── src/
    ├── datos.js          # arreglo de ventas
    ├── analitica.js      # funciones de cálculo (con ciclos y con métodos de arreglo)
    ├── explorar.js       # exploración del arreglo y pruebas básicas
    ├── verificar.js      # compara versión con ciclo vs. versión con métodos
    ├── reporte.js        # reporte completo en consola
    └── bitacora.md       # decisiones, trazas, errores y uso de IA
```

## Requisitos

- Node.js 18 o superior (probado con Node 22).

## Cómo ejecutarlo

Desde la carpeta raíz del proyecto (`cafe-origen-analitica/`):

```bash
node src/explorar.js        # exploración y pruebas básicas
node src/verificar.js       # debe mostrar OK en todas las comparaciones
node src/reporte.js         # reporte completo
```

## Qué preguntas responde

- **¿Cuánto se vendió en total y cuántas unidades?** Resumen general.
- **¿Cuál es el ticket promedio y cuál fue la venta más grande?** Resumen general.
- **¿Qué ciudades generan más ventas?** Ventas por ciudad. "Bogotá" y "Bogotá " se cuentan como una sola ciudad.
- **¿Qué productos se venden más en unidades?** Unidades por producto.
- **¿Qué 3 productos generan más dinero?** Top 3 por valor.
- **¿Cuánto se vendió en un día concreto?** Ventas por día, con un ejemplo con ventas y otro sin ventas.

## Notas

- Los valores en pesos se muestran con formato colombiano (`$ 985.000`).
- Las funciones no modifican el arreglo original de ventas.