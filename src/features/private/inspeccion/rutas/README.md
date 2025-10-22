# Módulo de Rutas de Inspección

Este módulo permite a los administradores generar y gestionar rutas de inspección para los inspectores registrados en el sistema.

## Funcionalidades

### 1. Gestión de Rutas de Inspección

- **Crear nuevas rutas**: Asignar fecha, hora, casa e inspector
- **Editar rutas existentes**: Modificar los datos de una ruta
- **Eliminar rutas**: Remover rutas del sistema
- **Cambiar estado**: Activar/desactivar rutas

### 2. Gestión de Casas

- **Registrar nuevas casas**: Cuando no existe la casa en el sistema
- **Datos requeridos**: Medidor, dirección, barrio, teléfono, ciudad y cliente

### 3. Gestión de Clientes

- **Registrar nuevos clientes**: Cuando no existe el cliente propietario
- **Datos requeridos**: Tipo de documento, número de documento, nombres, apellidos y teléfono

## Estructura de Archivos

```
src/features/private/inspeccion/rutas/
├── components/
│   ├── TableRutas.tsx          # Tabla para mostrar las rutas
│   ├── ModalRutas.tsx          # Modal para crear/editar rutas
│   ├── ModalCasa.tsx           # Modal para registrar casas
│   ├── ModalCliente.tsx        # Modal para registrar clientes
│   └── index.ts
├── hooks/
│   ├── useRutas.ts             # Hook personalizado para la lógica de rutas
│   └── index.ts
├── interfaces/
│   ├── rutas.interface.ts      # Interfaces TypeScript
│   └── index.ts
├── pages/
│   ├── Rutas.tsx               # Página principal del módulo
│   └── index.ts
├── services/
│   └── rutas.services.ts       # Servicios para las operaciones CRUD
└── README.md
```

## Uso

### Importar el componente principal

```typescript
import { Rutas } from "@/features/private/inspeccion/rutas/pages";
```

### Usar el hook personalizado

```typescript
import { useRutas } from "@/features/private/inspeccion/rutas/hooks";

const MyComponent = () => {
  const {
    rutas,
    casas,
    inspectores,
    handleOpen,
    onSubmitRuta,
    // ... otros métodos
  } = useRutas();

  // Tu lógica aquí
};
```

## API Endpoints

El módulo utiliza los siguientes endpoints:

- `GET /rutas` - Obtener todas las rutas
- `POST /rutas` - Crear nueva ruta
- `PUT /rutas/:id` - Actualizar ruta
- `DELETE /rutas/:id` - Eliminar ruta
- `PATCH /rutas/:id/toggle_status` - Cambiar estado de ruta

- `GET /casas` - Obtener todas las casas
- `POST /casas` - Crear nueva casa

- `GET /clientes` - Obtener todos los clientes
- `POST /clientes` - Crear nuevo cliente

- `GET /usuarios/inspectores` - Obtener inspectores
- `GET /ciudades` - Obtener ciudades
- `GET /tipos-documento` - Obtener tipos de documento

## Características Técnicas

- **React Hook Form**: Para el manejo de formularios
- **React Query**: Para el manejo de estado del servidor
- **Ant Design**: Para los componentes de UI
- **SweetAlert2**: Para las notificaciones
- **TypeScript**: Para el tipado estático

## Validaciones

- **Fecha**: Campo obligatorio
- **Hora**: Campo obligatorio
- **Casa**: Campo obligatorio (debe existir en el sistema)
- **Inspector**: Campo obligatorio (debe existir en el sistema)

Para casas y clientes nuevos, todos los campos son obligatorios según se especifica en las interfaces.
