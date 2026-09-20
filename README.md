# Presupuestos de servicios digitales

Aplicación SPA hecha con **Angular 22** que permite configurar y calcular el presupuesto
de una web: se eligen los servicios, se configuran las opciones de la web y se ve el
total actualizado al momento. Los presupuestos solicitados quedan en un histórico que se
puede buscar y ordenar, con una página de detalle para cada uno.

Proyecto formativo del **Sprint 04 de la IT Academy**.

![Vista principal de la aplicación: la lista de servicios con sus precios, el precio total, el formulario para solicitar un presupuesto y el histórico de presupuestos con búsqueda y ordenación.](public/img/preview.png)

## Demo

*(Pendiente de despliegue.)*

## Puesta en marcha

Hace falta **Node.js 20 o superior**.

```bash
npm install
npm start
```

La aplicación queda en `http://localhost:4200/`.

## Tests

```bash
npm test
```

Los escenarios están escritos en **Gherkin** dentro de los nombres de los tests, con la
estructura `Feature` → `Scenario` → `Given / When / Then`, de manera que se leen
directamente en la salida del comando.

## Reglas de negocio

| Servicio | Precio |
|---|---|
| SEO | 300 € |
| Ads | 400 € |
| Web | 500 € de base |

La web es configurable: cada página y cada idioma suman 30 €.

```
total del servicio = precio base + Σ (cantidad × precio unitario de cada opción)
```

Ejemplo: una web con 1 página y 3 idiomas vale `500 + (1 + 3) × 30 = 620 €`.

## Datos configurables

El catálogo vive en `public/data/services.json` y se carga en tiempo de ejecución, así
que se pueden cambiar precios, descripciones, opciones y los textos de los modales
informativos **sin recompilar**.

## Estructura

```
src/app/
├── components/   piezas reutilizables (lista de servicios, total, formulario, histórico…)
├── pages/        vistas que pinta el router (inicio y detalle de un presupuesto)
├── services/     estado compartido (catálogo, presupuesto en curso, histórico)
├── models/       interfaces de datos
└── utils/        funciones puras (cálculo de precios)
```

Hay dos familias de modelos: las que describen **el catálogo** (`Service`,
`ServiceOption`) y las que describen **un presupuesto guardado** (`SavedBudget`,
`BudgetLine`, `ChosenOption`). Un presupuesto guardado copia nombres y precios del
momento en que se creó, de forma que un cambio posterior en el catálogo no altera los
presupuestos antiguos.

## Rutas

| Ruta | Vista |
|---|---|
| `/` | configuración del presupuesto, formulario e histórico |
| `/pressupost/:id` | detalle desglosado de un presupuesto guardado |

## Accesibilidad

Marcado semántico, todos los controles accesibles con teclado, etiquetas visualmente
ocultas para los campos del formulario, `aria-label` en los botones de icono, estados de
foco visibles y regiones anunciadas con `aria-live`.

La interfaz está en catalán; el código y la documentación, no.

## Diseño responsive

Mobile-first: el estilo base es el de móvil y se amplía con `min-width` en los
breakpoints de **40rem** (tableta) y **64rem** (escritorio).

## Flujo de trabajo con Git

Git Flow: `main` para las versiones desplegadas, `develop` como rama de integración y una
rama `feature/…` o `fix/…` por cada pieza, integrada con `merge --no-ff`.

## Alcance

Implementado:

- Épica 1 — creación y cálculo del presupuesto
- Épica 2 — datos del cliente y vista de detalle
- Épica 3 — histórico con búsqueda y ordenación

Fuera de alcance, por decisión propia:

- **Épica 4** — compartir por URL y exportación a PDF.
- **Persistencia** — el histórico vive solo en memoria: al recargar la página se vacía.
- **Textos de la interfaz configurables por JSON** — los datos y los textos de negocio sí
  salen de `services.json`; los textos de la interfaz están en el código.
