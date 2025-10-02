# Prueba Técnica

En esta prueba he desarrollado un proyecto de aplicación web intentando adaptarme a las necesidades del proyecto en la parte de front utilizando Next.js, React 19 y TypeScript.
He utilizado los hooks principales de React como useState y useEffect para la gestión de estado y efectos secundarios.  
He implementado los estilos mediante CSS Modules, aplicados en el código con la sintaxis `className={style.nombre}`.  
Las pruebas unitarias se realizan con Vitest, ejecutables mediante interfaz interactiva con `npx vitest --ui`.

---

## Descripción funcional

La aplicación consume una API (configurable por variables de entorno) para gestionar un carro de la compra. El objetivo es permitir al usuario explorar productos, añadirlos al carrito, ajustar cantidades, eliminarlos y completar la compra a través de un flujo por multiples etapas en las que se solicitan datos personales, datos de envío y datos de pago.
Finalmente se muestra un resumen del pedido con la información detallada de la compra realizada.

### Características clave
- **Listado de productos**: se obtienen desde la API y se muestran en la interfaz.
- **Carro de la compra**: se actualiza con la Api y se muestra en la interfaz para mantener el estado actual del carrito. Permite:
  - Añadir productos.
  - Incrementar/decrementar cantidades.
  - Eliminar artículos del carrito.
  - **Cálculo del total en tiempo real**: el importe total se recalcula automáticamente al cambiar cantidades o contenidos del carrito.
- **Flujo de compra por etapas**: las tres primeras etapas tiene las correspondientes validaciones en los campos y no permite continizar la compra si no se cumplen los requisitos que tiene cada uno de los campos obligatorios.
  1. **Datos personales**.
  2. **Datos de envío**.
  3. **Datos de pago**.
  4. **Resumen final del pedido** con la información de la compra realizada.



## Tecnologías utilizadas

- [Next.js](https://nextjs.org/)  
- [React 19](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) para estilos locales  
- [Vitest](https://vitest.dev/) para testing  
- [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) para mantener un código consistente  

---

## Estructura del proyecto

```
prueba-tecnica/
├── public/                  # Archivos estáticos
├── src/
│   ├── __test__/            # Tests unitarios
│   │   ├── Formulario.test.tsx
│   │   └── Header.test.tsx
│   │
│   ├── app/                 # Código principal de la app
│   │   ├── modules/         # Módulos de la aplicación
│   │   │   ├── cart/
│   │   │   ├── envio/
│   │   │   ├── finalizar/
│   │   │   ├── formulario/
│   │   │   ├── header/
│   │   │   ├── main/
│   │   │   ├── pago/
│   │   │   └── products/
│   │   └── services/        # Servicios y lógica de negocio
│
├── tests/                   # Configuración y mocks para testing
│   ├── __mocks__/           # Mocks (ej. estilos, dependencias)
│   │   └── styleMock.js
│   └── setups/              # Configuraciones de Vitest
│
├── .env.local               # Variables de entorno (API URL, user para desarrollo) 
├── .editorconfig            # Configuración de estilo de código
├── .eslintrc.*              # Configuración ESLint
├── .prettierrc              # Configuración Prettier
├── tsconfig.json            # Configuración de TypeScript
├── vitest.config.ts         # Configuración de Vitest
├── package.json             # Dependencias y scripts
├── README.md                # Documentación
├── tsconfig.json            # Configuración de TypeScript
└── vites.config.ts          # Configuración de Vitest
```

---

## Instalación y ejecución

En este caso el proyecto se ejecuta en un entorno de desarrollo local, por lo que se necesitan los siguientes pasos:

El primer paso sera disponer de una API de prueba, que se puede encontrar en [este repositorio](https://gitlab.com/technical-exercises/fake-store-api/-/tree/main?ref_type=heads).

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Franfuentezuelas/prueba-tecnica.git
   cd prueba-tecnica
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar el archivo `.env.local` en la raíz del proyecto con la configuración para la API:
   ```env
   NEXT_PUBLIC_API_URL=https://api.ejemplo.com
   ```

4. Levantar el entorno de desarrollo:
   ```bash
   npm run dev
   ```

5. Abrir en el navegador:  
   [http://localhost:3000](http://localhost:3000)

   Puede darse el caso de que el puerto sea diferente si el entorno de desarrollo se ejecuta en otro puerto al no estar disponible el 3000.

---

## Variables de entorno

El proyecto utiliza un archivo `.env.local` para configurar la URL base de la API y el usuario.
Ejemplo:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.ejemplo.com
NEXT_PUBLIC_USER=acc1
```

Se accede en el código a través de `process.env.NEXT_PUBLIC_API_BASE_URL` y
`process.env.NEXT_PUBLIC_USER` respectivamente.

---

## Estilos con CSS Modules
En el proyecto los estilos los he implementado con **CSS Modules**.
Esto significa que cada archivo `.module.css` define clases que son importadas como un objeto JavaScript y usadas en los componentes.  

Ejemplo:

**Formulario.module.css**
```css
.nombre {
  color: red;
  font-size: 20px;
}
```

**Formulario.tsx**
```tsx
import style from "./Formulario.module.css";

export default function Formulario() {
  return <h1 className={style.nombre}>Hola!</h1>;
}
```

Next.js compila automáticamente `.nombre` a un identificador único (ejemplo: `Formulario_nombre__a1b2c`), evitando conflictos entre estilos.

---

## Ejemplos de uso de Hooks

### **useState**  
Ejemplo de un formulario con estado controlado:

```tsx
import { useState } from "react";

export default function Formulario() {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Hola, ${nombre}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

---

### **useEffect**  
Ejemplo de carga de datos desde la API configurada en `.env.local`:

```tsx
import { useState, useEffect } from "react";

export default function Productos() {
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div>
      <h1>Lista de productos</h1>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>{p.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Testing

He configurado **Vitest** para la ejecución de pruebas unitarias.  
En este caso, debido a la incompatibilidad de la versión del módulo utilizado con Vitest, he mockeado los estilos en los tests para permitir su correcta ejecución.

### Ejecutar pruebas con interfaz gráfica
```bash
npx vitest --ui
```

### Ejecutar pruebas en consola
```bash
npx vitest
```

Ejemplo de test (`Formulario.test.tsx`):

```tsx
import { render, screen } from "@testing-library/react";
import Formulario from "../app/modules/formulario/Formulario";

test("renderiza el input del formulario", () => {
  render(<Formulario />);
  expect(screen.getByPlaceholderText("Escribe tu nombre")).toBeInTheDocument();
});
```

---

## Scripts disponibles

- `npm run dev` → Inicia el servidor de desarrollo  
- `npm run build` → Compila la aplicación para producción  
- `npm run start` → Ejecuta la app en modo producción  
- `npm run lint` → Linter con ESLint  
- `npx vitest --ui` → Tests con interfaz  
- `npx vitest` → Tests en consola  

---

## Licencia

Este proyecto está bajo la **Licencia MIT**.  
Eres libre de usar, modificar y distribuir este software, siempre y cuando se conserve el aviso de copyright y la renuncia de garantías.