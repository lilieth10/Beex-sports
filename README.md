# BeexSports App

Una aplicación móvil desarrollada con React Native que permite a los usuarios gestionar su perfil deportivo, buscar complejos deportivos, y participar en partidos adaptados a su nivel.

## Características

- **Autenticación de usuarios**: Registro e inicio de sesión
- **Perfil de usuario**: Edición de datos y nivel de juego con barra de progreso
- **Búsqueda de complejos deportivos**: Listado y marcado de favoritos
- **Gestión de partidos**: Creación, búsqueda y participación
- **Matchmaking**: Recomendación de partidos según el nivel del usuario
- **Persistencia local**: Almacenamiento local de datos de perfil y favoritos

## Tecnologías utilizadas

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- Context API

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- JDK 11 o superior
- Android Studio y/o Xcode (según el sistema operativo)
- Configuración del entorno de desarrollo para React Native (https://reactnative.dev/docs/environment-setup)

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd BeexSportsApp
```

2. Instalar las dependencias:
```bash
npm install
```

3. Para instalar en iOS (solo macOS):
```bash
cd ios
pod install
cd ..
```

## Ejecución

### Android

```bash
npm run android
```

### iOS (solo macOS)

```bash
npm run ios
```

## Enfoque del proyecto

Este proyecto fue desarrollado como parte de un desafío técnico para la posición de React Native Developer en Beex. El enfoque principal fue crear una aplicación modular, con componentes reutilizables y una navegación fluida.

### Estructura del proyecto

- `/app`: Directorio principal de la aplicación
  - `/components`: Componentes reutilizables
  - `/context`: Context API para gestión del estado global
  - `/navigation`: Configuración de navegación
  - `/screens`: Pantallas de la aplicación
  - `/services`: Servicios mockeados para simular APIs
  - `/utils`: Utilidades varias

### Persistencia de datos

Para la persistencia de datos se utiliza AsyncStorage, simulando lo que sería una conexión a un backend real. Los datos de perfil de usuario y complejos favoritos se guardan localmente.

### Patrones de diseño

- **Context API**: Para gestión del estado global
- **Custom Hooks**: Para lógica reutilizable
- **Component Composition**: Para mantener componentes pequeños y reutilizables
- **Mocks de Servicios**: Para simular APIs y separar la capa de datos

## Mejoras futuras

- Implementación de pruebas unitarias e integración
- Agregar autenticación real con un backend
- Mejorar animaciones y transiciones
- Implementar notificaciones para partidos próximos
- Integración con mapas para visualizar ubicación de complejos
- Agregar chat interno para participantes de un partido
