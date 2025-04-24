# BeexSports App

Una aplicación móvil desarrollada con React Native que permite a los usuarios gestionar su perfil deportivo, buscar complejos deportivos, y participar en partidos adaptados a su nivel.

## Características Implementadas

- **Autenticación de usuarios**: Registro e inicio de sesión con persistencia local
- **Perfil de usuario**: Edición de datos personales y nivel de juego con barra de progreso animada
- **Búsqueda de complejos deportivos**: Listado con filtros por ciudad/nombre y marcado de favoritos
- **Gestión de partidos**: Búsqueda y creación de partidos con filtros por nivel
- **Matchmaking**: Sistema de recomendación de partidos basado en el nivel del usuario
- **Persistencia local**: Almacenamiento seguro de datos de perfil y favoritos

## Tecnologías Principales

- React Native 0.79.0
- TypeScript 5.0.4
- React Navigation v7
- AsyncStorage para persistencia local
- Context API para gestión de estado

## Requisitos del Sistema

- Node.js (versión 18 o superior)
- npm o yarn
- JDK 11 o superior (para Android)
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)
- Configuración del entorno de desarrollo para React Native

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone <https://github.com/lilieth10/Beex-sports>
cd BeexSportsApp
```

2. Instalar dependencias:
```bash
npm install
```

3. Configuración iOS (solo macOS):
```bash
cd ios
pod install
cd ..
```

## Ejecución del Proyecto

### Android
```bash
npm run android
```

### iOS (solo macOS)
```bash
npm run ios
```

## Arquitectura y Estructura

El proyecto sigue una arquitectura modular con una clara separación de responsabilidades:

```
/app
├── /context
│   ├── AuthContext.tsx
│   └── FavoritesContext.tsx
├── /navigation
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainTabNavigator.tsx
│   └── types.ts
├── /screens
│   ├── SignInScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── ComplexesScreen.tsx
│   ├── ComplexDetailsScreen.tsx
│   ├── MatchesScreen.tsx
│   ├── MatchDetailsScreen.tsx
│   ├── CreateMatchScreen.tsx
│   └── MatchmakingScreen.tsx
├── /services
│   ├── complexService.ts
│   └── matchService.ts
└── /utils
    └── providers.tsx
```

### Descripción de la Estructura

- **/navigation**: Configuración de rutas y navegación de la aplicación
  - `AppNavigator`: Navegación principal de la app
  - `AuthNavigator`: Flujo de autenticación
  - `MainTabNavigator`: Navegación con tabs post-autenticación
  - `types.ts`: Tipos para la navegación

- **/screens**: Pantallas principales de la aplicación
  - `SignInScreen` y `SignUpScreen`: Autenticación
  - `ProfileScreen`: Gestión de perfil
  - `ComplexesScreen` y `ComplexDetailsScreen`: Búsqueda y detalles de complejos
  - `MatchesScreen` y `MatchDetailsScreen`: Lista y detalles de partidos
  - `CreateMatchScreen`: Creación de nuevos partidos
  - `MatchmakingScreen`: Sistema de recomendación

- **/context**: Gestión de estado global
  - `AuthContext`: Estado de autenticación
  - `FavoritesContext`: Gestión de complejos favoritos

- **/services**: Servicios mockeados
  - `complexService`: Gestión de complejos deportivos
  - `matchService`: Gestión de partidos

- **/utils**: Utilidades
  - `providers.tsx`: Configuración de providers de contexto

## Persistencia de Datos

La aplicación utiliza AsyncStorage para mantener los datos del usuario y sus preferencias localmente. Esto incluye:
- Información del perfil
- Complejos favoritos
- Estado de autenticación

## Mejoras Futuras

- Implementación de pruebas unitarias y de integración
- Integración con backend real
- Mejora de animaciones y transiciones
- Sistema de notificaciones para partidos
- Integración con mapas para visualización de complejos
- Sistema de chat para participantes
- Optimización de rendimiento
- agregar componentes reutilizables

