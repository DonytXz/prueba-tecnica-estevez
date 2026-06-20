# Dashboard de Gestión de Clientes - Prueba Técnica

Una aplicación moderna en Angular construida para gestionar datos de clientes, demostrando el manejo del estado, enrutamiento y diseño de interfaz de usuario utilizando las características más recientes del framework.

## 🚀 Tecnologías Utilizadas
* **Angular 21**: Aprovechando los Componentes Standalone (Independientes) y el nuevo flujo de control `@if`.
* **Angular Signals**: Utilizado para el manejo del estado reactivo e inmutable en el `ClientService` y `AuthService` sin necesidad del código repetitivo (boilerplate) de RxJS.
* **Angular Material**: Para una interfaz de usuario responsiva, accesible y visualmente pulida.
* **Formularios Reactivos (Reactive Forms)**: Implementando validación estricta para los procesos de inicio de sesión y creación de clientes.

## ⚙️ Cómo Ejecutar el Proyecto

1. Clona este repositorio:
   `git clone https://github.com/DonytXz/prueba-tecnica-estevez.git`
2. Navega al directorio del proyecto:
   `cd prueba-tecnica-estevez`
3. Instala las dependencias:
   `npm install`
4. Inicia el servidor de desarrollo:
   `ng serve`
5. Abre tu navegador y dirígete a `http://localhost:4200/`

## 🛠 Pruebas Unitarias (Unit Testing)

Este proyecto utiliza **Vitest** como framework de pruebas. Fue seleccionado por su increíble velocidad, su configuración nativa con Vite y su integración perfecta con los módulos modernos de Angular.

### Comandos disponibles

#### 1. Ejecutar pruebas una sola vez
Ideal para CI/CD o para verificar que todo el código actual pase las pruebas antes de subir cambios a producción.
`npm test:unit`

## 🧪 Pruebas de End-to-End (E2E)

Este proyecto utiliza **Playwright** para la automatización de pruebas E2E. Gracias a la configuración de `webServer`, no necesitas iniciar el servidor manualmente; Playwright se encargará de levantar la aplicación en `localhost:4200` automáticamente durante la ejecución.

### Comandos disponibles

#### 1. Ejecutar todas las pruebas (Modo rápido)
Ideal para verificar que todo el sistema funciona correctamente antes de hacer un *commit* o *push*. Ejecuta las pruebas en segundo plano (headless).
`npx playwright test`
Tabien se puede usar el siguiente para mostrar la UI
`npx playwright test --ui`

#### 2. Ver la interaccion con el navegador (Modo lento)
Para el flujo de login use el siguiente comando
`playwright test e2e/login.spec.ts --headed`

## 🔐 Credenciales de Acceso
Para acceder al dashboard, utiliza el API en vivo de DummyJSON con estas credenciales:
* **Usuario:** emilys
* **Contraseña:** emilyspass

## ✨ Características Implementadas
* **Autenticación:** Sistema de inicio de sesión simulado protegido por un `AuthGuard` funcional.
* **Operaciones CRUD:** Funcionalidad completa para Crear, Leer, Actualizar y Eliminar clientes.
* **Inmutabilidad:** El estado se maneja puramente a través de Signals, asegurando que las actualizaciones de la interfaz sean síncronas, rápidas y predecibles.

## 🔮 Futuras Mejoras (En caso de escalar a producción)
* Integración con una API REST real utilizando `HttpClient`.
* Manejo centralizado de errores a través de Interceptores HTTP (HTTP Interceptors).
* Configuración de pruebas unitarias con Vitest o Jasmine/Karma.
* Pruebas E2E con Playwright o Cypress

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.16.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
