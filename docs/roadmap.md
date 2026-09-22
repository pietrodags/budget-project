# Roadmap — Proyecto Budget

Lista de trabajo del sprint.

- `[ ]` pendiente · `[x]` hecho

---

## Fase 0 — Preparación

- [x] **Proyecto Angular 22 generado y limpio**
      Fuera el placeholder de bienvenida. `App` con `<router-outlet />` y `app.routes.ts` vacío.
- [x] **Git Flow montado**
      Ramas `main` y `develop`. El ciclo es: `git switch -c feature/x develop` para abrir,
      y `git switch develop` + `git merge --no-ff feature/x` para cerrar.
      El `--no-ff` fuerza un commit de merge, así el histórico conserva qué trabajo
      formaba parte de cada rama.
- [x] **Modelo de datos**
      Qué campos tiene un servicio, una opción y un presupuesto guardado.

---

## Fase 1 — Cálculo del presupuesto (Épica 1)

> Rama: `feature/services-config`, luego una rama por paso.

- [x] **JSON de servicios** — `public/data/services.json`
      Los tres servicios con sus precios y, en la Web, sus dos opciones configurables.
      Vive en `public/` y no en `src/` porque el enunciado exige poder cambiar datos y
      textos sin recompilar: lo que está en `public/` se copia tal cual al build.
- [x] **Interfaces TypeScript** — `src/app/models/`
      `Service`, `ServiceOption`, `OptionInfo` y el tipo de la raíz del fichero.     
- [x] **Servicio de carga con HttpClient**
      Leer el JSON de forma asíncrona y exponerlo como signal, así que
      la plantilla tiene que saber pintar también el estado "todavía cargando".
- [x] **Componente lista de servicios**
      Una tarjeta por servicio con nombre, descripción, precio y checkbox "Afegir".
      Recorre la lista con `@for`.
- [x] **Estado de selección**
      Qué servicios están marcados. Esto es estado de la aplicación, no configuración:
      nunca se escribe dentro de los objetos venidos del JSON.
- [x] **Total reactivo**
      Suma de los servicios marcados, recalculada sola. Con signals se hace con
      `computed()`: declaras cómo se obtiene el total a partir de la selección y
      Angular se encarga de mantenerlo al día.
- [x] **Panel de configuración de la Web**
      Contadores de páginas e idiomas con botones `−` / `+`, visibles solo cuando la
      Web está marcada. Tope inferior en el `min` de cada opción (1).
      Fórmula: `500 + (páginas + idiomas) × 30`.
- [x] **Modal informativo ⓘ**
      Abre el `info` de cada opción (mockup 4). Ojo con el foco del teclado:
      al abrirse debe recibir el foco y `Esc` debe cerrarlo.

---

## Fase 2 — Cliente e histórico (Épicas 2 y 3)

- [x] **Formulario de cliente**
      Nombre, teléfono y email con validación. Para validar de verdad, tienen que ser reactivos.
- [x] **Guardar presupuesto**
      Al pulsar "Sol·licitar pressupost" se crea un registro con `id` único,
      `createdAt`, datos del cliente, líneas y total.
      Las líneas **copian** nombre y precio del JSON en ese momento (snapshot):
      un presupuesto guardado no vuelve a consultar la configuración nunca más.
- [~] **Persistencia** — El histórico vive solo en memoria.
- [x] **Lista del histórico**
      Tabla o tarjetas con los presupuestos guardados (mockup 3).
- [x] **Buscar y ordenar**
      Filtro por texto y orden por fecha, importe y nombre (mockup 5).
      Ordenar no debe modificar la lista original, sino derivar una vista de ella.

---

## Fase 3 — Compartir (Épica 4)

- [x] **Ruta de detalle** — `/pressupost/:id`
      Página con el presupuesto completo, accesible por URL directa.
      No hay mockup de esta pantalla: lo haré tipo factura.
- [~] **Botón de compartir** — DESCARTADO 
- [~] **Bonus: exportar a PDF** — DESCARTADO
      Solo si sobra tiempo. No cuenta para los requisitos mínimos.

---

## Transversal — se trabaja en todas las fases

- [x] **Responsive mobile-first, mínimo 2 breakpoints**
      Los mockups son de escritorio. Se diseña primero la versión móvil y se amplía
      con `min-width`, no al revés.
- [~] **HTML semántico y accesible** — ARIA donde haga falta y contraste suficiente.
- [x] **Tests unitarios con escenarios Gherkin**
      Cada test descrito como `Given / When / Then` antes de escribirlo.
      Los candidatos claros: la fórmula del total y el orden del histórico.
- [ ] **Deploy**
      Netlify, Vercel o GitHub Pages. 
- [x] **README**
      Qué es el proyecto y cómo arrancarlo.

---
