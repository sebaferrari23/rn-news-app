# RN News App

Aplicación de lectura de noticias desarrollada con React Native y Expo.

---

## DEMO

<img src="./assets/screenshots/demo.gif" width="350" />

---

## Cómo levantar el proyecto

### Requisitos previos

- Node.js 20+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go en el dispositivo, o un simulador iOS/Android configurado

### Instalación

```bash
# 1. Clonar el repositorio y acceder a la carpeta
git clone https://github.com/sebaferrari23/rn-news-app.git
cd rn-news-app

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env.local
```

Contenido del archivo `.env.local`:

```
EXPO_PUBLIC_API_URL=https://jsonplaceholder.org
```

### Correr la app

```bash
# Iniciar el servidor de desarrollo
npm start

# iOS
npm run ios

# Android
npm run android
```

---

## Arquitectura

### Estructura de carpetas

```
src/
├── api/              # Cliente HTTP genérico
├── core/             # Componentes, hooks y tema compartidos
│   ├── components/   # Header, SearchBar
│   ├── hooks/        # useDebounce
│   └── theme/        # colors, spacing, typography
├── features/         # Módulos por dominio
│   ├── news/
│   │   ├── components/   # NewsCard, NewsList
│   │   ├── hooks/        # useNews, useNewsItem, useNewsSearch, useNavigateToNewsDetail
│   │   ├── screens/      # HomeScreen, NewsDetailScreen
│   │   └── types/        # News, NewsResponse, mapper
│   ├── favorites/
│   │   ├── store/        # useFavoritesStore
│   │   └── screens/      # FavoritesScreen
│   └── users/
│       ├── components/   # UserAvatar, UserCard, UserList, UserDetailModal
│       ├── hooks/        # useUsers, useUsersSearch
│       ├── screens/      # UsersScreen
│       └── types/        # User, UserResponse, mapper
├── navigation/       # Tipos, rutas, tabs y navegadores
└── providers/        # AppProvider (QueryClient + NavigationContainer)
```

El proyecto sigue una **arquitectura feature-based**: cada dominio agrupa sus propias pantallas, componentes, hooks y tipos. La capa `core/` concentra lo que es genuinamente transversal a toda la app.

### Capa de datos

Cada feature define:

- Un tipo `*Response` que refleja exactamente la forma de la API
- Un tipo de dominio (`News`, `User`) con los campos que la UI necesita
- Una función `map*` pura que convierte uno en el otro

Esto desacopla la UI de los contratos de la API: si el backend cambia un campo, se actualiza solo el mapper.

### Navegación

La navegación está completamente tipada con React Navigation v7. Se definen `RootStackParamList` y `MainTabParamList` centralizados, con helpers `RootStackScreenProps<T>` y `MainTabScreenProps<T>` (usando `CompositeScreenProps`) para que cada pantalla tenga sus props correctamente tipadas sin repetición. El tipo raíz está registrado globalmente para que `useNavigation()` quede tipado en toda la app sin anotaciones manuales.

Las tabs se generan de forma **data-driven** desde un array de configuración (`tabs.config.ts`), lo que permite agregar o reordenar tabs sin tocar el componente `MainTabs`.

---

## Decisiones técnicas

### React Query — caché de datos

Se usa `@tanstack/react-query` para todas las llamadas a la API. Provee caché automático, estados de carga/error y deduplicación de requests. El hook `useNewsItem` implementa un patrón **cache-first**: antes de hacer fetch a `/posts/:id`, busca el ítem en el caché de la lista ya cargada. Si el usuario navegó desde el home, el detalle aparece de forma instantánea sin request adicional.

### Zustand — estado global de favoritos

Se eligió Zustand sobre Context API por su menor boilerplate y por el middleware `persist`, que serializa el estado en AsyncStorage con una sola línea de configuración. Los favoritos persisten entre reinicios de la app sin ninguna lógica adicional.

Los selectores en los componentes son **derivados directamente** del estado (`s.favorites.some(...)`) en lugar de seleccionar funciones del store. Esto garantiza que Zustand detecte los cambios y re-renderice correctamente.

### Búsqueda con debounce

La búsqueda es client-side (la API pública no soporta filtrado). Se implementó un hook genérico `useDebounce<T>` en `core/hooks/` y un hook específico `useNewsSearch` en la feature de news. El debounce de 300ms evita filtrar en cada keystroke. La misma arquitectura se replicó en `useUsersSearch`.

---

## Librerías utilizadas

| Librería                                    | Uso                                       |
| ------------------------------------------- | ----------------------------------------- |
| `expo` ~54                                  | Plataforma y herramientas de desarrollo   |
| `react-navigation` v7                       | Navegación (native-stack + bottom-tabs)   |
| `@tanstack/react-query` v5                  | Fetching, caché y sincronización de datos |
| `zustand` v5                                | Estado global de favoritos                |
| `@react-native-async-storage/async-storage` | Persistencia de favoritos                 |
| `react-native-safe-area-context`            | Manejo de safe areas                      |
| `@expo-google-fonts/urbanist`               | Tipografía                                |
| `@expo/vector-icons`                        | Íconos (Ionicons)                         |

---

## To Do

- [ ] **Unit tests** — cobertura del store de favoritos, hooks de búsqueda y componentes clave con `jest-expo` y `@testing-library/react-native`
- [ ] **Data caching persistente** — extender React Query con `@tanstack/react-query-persist-client` + `@tanstack/query-async-storage-persister` para que el caché sobreviva reinicios y la app funcione offline con datos previos
- [ ] **Login flow** — autenticación mock con navegación condicional (AuthStack / AppStack), persistencia de sesión con Zustand
- [ ] **Sistema de multi-idioma** — i18n con `i18next` + `react-i18next`, detección automática del idioma del dispositivo con `expo-localization`
- [ ] **Dark mode** — tema oscuro con un segundo objeto de colores y detección del esquema del sistema vía `useColorScheme`
