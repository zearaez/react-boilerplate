# 🚀 Modern React Boilerplate

A production-ready React application boilerplate with advanced data handling, optimistic updates, error boundaries, and intelligent prefetching strategies.

## ✨ Features

### 🏗️ **Core Stack**
- **React 19** with TypeScript support
- **Vite 7** for lightning-fast development and builds  
- **React Query (TanStack Query)** for advanced data fetching
- **Redux Toolkit** with Redux Persist for state management
- **React Router v7** for client-side routing

### 🔄 **Advanced Data Handling**
- **Optimistic Updates** - Instant UI feedback for better UX
- **Intelligent Prefetching** - Route-based, hover-based, and infinite scroll prefetching
- **Error Boundaries** - Graceful error handling with recovery options
- **Hook-based Architecture** - Modern, composable data fetching patterns

### 🛠️ **Developer Experience**
- **TypeScript** - Full type safety throughout the application
- **ESLint & Prettier** - Code quality and consistent formatting
- **Husky** - Pre-commit hooks for code quality
- **Vitest** - Fast unit testing with React Testing Library
- **Hot Module Replacement** - Instant development feedback

### 🎨 **UI & Styling**
- **CSS Modules** support
- **Error UI Components** - Professional error handling interfaces
- **Loading States** - Proper loading indicators and disabled states
- **Responsive Design** - Mobile-first approach

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended)
- **Yarn** (preferred) or npm
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/zearaez/react-boilerplate.git

# Navigate to the project directory
cd react-boilerplate

# Install dependencies (use yarn for best experience)
yarn install
# or
npm install
```

### Development Server

```bash
# Start development server (http://localhost:5173)
yarn dev
# or
npm run dev
```

### Build for Production

```bash
# Create production build
yarn build
# or
npm run build

# Preview production build locally
yarn preview
# or
npm run preview
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test
# or
npm test

# Run tests in watch mode
yarn test:watch
# or
npm run test:watch

# Run tests with UI interface
yarn test:ui
# or
npm run test:ui

# Generate coverage report
yarn test:report
# or
npm run test:report
```

### Test Structure
- Unit tests in `src/tests/`
- Component tests co-located with components
- Coverage reports in `coverage/` directory

---

## 🏗️ Project Architecture

### 📁 **Directory Structure**

```
react-boilerplate/
├── 📁 public/                  # Static assets
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 error/          # Error handling components
│   │   ├── 📁 examples/       # Example implementations
│   │   └── 📁 layout/         # Layout components
│   ├── 📁 core/               # Core application logic
│   │   ├── 📁 api/            # API service layer
│   │   └── 📁 http/           # HTTP client and interceptors
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 router/             # Routing configuration
│   ├── 📁 screens/            # Page components
│   ├── 📁 store/              # Redux store and slices
│   ├── 📁 types/              # TypeScript type definitions
│   ├── 📁 utils/              # Utility functions
│   ├── 📄 App.tsx             # Main application component
│   ├── 📄 main.tsx            # Application entry point
│   └── 📄 init.ts             # Application initialization
├── 📄 ADVANCED_FEATURES_IMPLEMENTATION.md
├── 📄 MIGRATION_SUMMARY.md
└── 📄 README.md
```

### 🏛️ **Architecture Patterns**

#### **Data Fetching Layer**
```
UI Components
     ↓
Custom Hooks (useUsers, useAuth, etc.)
     ↓
Generic API Hooks (useApi)
     ↓
API Services (authService, apiService)
     ↓
HTTP Client (axios with interceptors)
```

#### **State Management**
- **Server State**: React Query for data fetching and caching
- **Client State**: Redux Toolkit for application state
- **Form State**: Component-level state or form libraries

---

## 🔧 Core Concepts

### 🔄 **Optimistic Updates**

The application provides instant UI feedback for better user experience:

```typescript
// Automatically handled by our hooks
const { useCreateUser } = useUsers();
const createMutation = useCreateUser();

// UI updates immediately, rolls back on error
createMutation.mutate(newUserData);
```

### 🛡️ **Error Handling**

Multi-layered error handling strategy:

```typescript
// Global error boundaries catch unhandled errors
// Query-specific error boundaries handle data fetching errors
// Inline error displays for specific components

<ErrorDisplay 
  error={error} 
  onRetry={refetch}
  message="Custom error message"
/>
```

### ⚡ **Prefetching Strategies**

> **🎛️ Feature Flag Control**: All prefetching can be disabled by setting `VITE_ENABLE_PREFETCHING=false` in your environment variables.

#### **Automatic Route Prefetching**
```typescript
// Automatically prefetches data for current and likely next routes
import { useRoutePrefetch } from '@/hooks';

const MyComponent = () => {
  useRoutePrefetch(); // Works automatically
  return <div>My Component</div>;
};
```

#### **Hover Prefetching**
```typescript
// Prefetches data when user hovers over links
<PrefetchLink 
  to="/users/123" 
  resource="users" 
  id="123"
>
  View User Details
</PrefetchLink>
```

#### **Infinite Scroll Prefetching**
```typescript
// Prefetches next page before user reaches the bottom
useInfiniteScrollPrefetch({
  resource: 'users',
  currentPage: 1,
  hasNextPage: true,
  threshold: 500 // pixels from bottom
});
```

---

## 🎯 **Development Workflow**

### 1. **Creating New Features**

#### **Step 1: Define Types**
```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
```

#### **Step 2: Create API Service**
```typescript
// src/core/api/user-service.ts
export const userService = {
  getUsers: () => http.get<User[]>('/users'),
  getUser: (id: string) => http.get<User>(`/users/${id}`),
  // ... other methods
};
```

#### **Step 3: Create Custom Hook**
```typescript
// src/hooks/useUsers.ts
export const useUsers = () => {
  const api = useApi({ resource: 'users' });
  
  return {
    useUsersList: api.useList<User>,
    useUser: api.useGet<User>,
    useCreateUser: api.useCreate<User>,
    // ... other hooks
  };
};
```

#### **Step 4: Use in Components**
```typescript
// src/components/UsersList.tsx
const UsersList = () => {
  const { useUsersList } = useUsers();
  const { data: users, isLoading, error } = useUsersList();
  
  // Component logic...
};
```

### 2. **Adding New Routes**

```typescript
// src/router/Router.tsx
const router = createBrowserRouter([
  {
    path: '/users',
    element: <UsersPage />,
  },
  // Add your routes here
]);
```

### 3. **Error Handling Best Practices**

```typescript
// Always wrap data-fetching components in error boundaries
<QueryErrorBoundary>
  <YourDataComponent />
</QueryErrorBoundary>

// Use inline error displays for specific errors
{error && (
  <ErrorDisplay 
    error={error} 
    onRetry={refetch}
  />
)}
```

---

## 📋 **Available Scripts**

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn test` | Run tests once |
| `yarn test:ui` | Run tests with UI interface |
| `yarn test:report` | Generate coverage report |
| `yarn lint` | Run ESLint |
| `yarn format` | Format code with Prettier |
| `yarn format:check` | Check code formatting |

---

## 🔧 **Configuration**

### **Environment Variables**

Create `.env.local` for local development:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=React Boilerplate

# Feature Flags  
VITE_ENABLE_PREFETCHING=true          # Controls all prefetching behavior
VITE_ENABLE_OPTIMISTIC_UPDATES=true  # Controls optimistic updates
VITE_ENABLE_QUERY_DEVTOOLS=true      # React Query DevTools in development
VITE_ENABLE_ERROR_LOGGING=true       # Controls error logging in console

# Error Tracking (Optional)
VITE_SENTRY_DSN=your_sentry_dsn_here # Sentry error tracking
```

#### **🎛️ Feature Flags Explained**

**VITE_ENABLE_PREFETCHING** - Controls all prefetching strategies:
- Route-based prefetching active
- Hover prefetching in `PrefetchLink` components  
- Infinite scroll prefetching enabled
- Set to `false` for cleaner debugging

**VITE_ENABLE_OPTIMISTIC_UPDATES** - Controls mutation behavior:
- Instant UI updates before server response
- Automatic rollback on errors
- Set to `false` to wait for server confirmation

**VITE_ENABLE_QUERY_DEVTOOLS** - Shows React Query DevTools:
- Development debugging panel
- Only visible when enabled

**VITE_ENABLE_ERROR_LOGGING** - Controls console error output:
- Error boundary logging
- Set to `false` for cleaner console during development

**VITE_SENTRY_DSN** - Enables Sentry error tracking:
- Automatic error capture and reporting
- Performance monitoring
- User session tracking
- See `SENTRY_INTEGRATION.md` for setup guide
- Automatically hidden in production

**VITE_ENABLE_ERROR_LOGGING** - Controls console error output:
- Error boundary logging
- Set to `false` for cleaner console during development

**Testing Feature Flags:**
```bash
# Test with all optimizations disabled
echo "VITE_ENABLE_PREFETCHING=false" >> .env.local
echo "VITE_ENABLE_OPTIMISTIC_UPDATES=false" >> .env.local
yarn dev
```

### **TypeScript Configuration**

The project uses strict TypeScript configuration with path mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### **React Query Configuration**

Located in `src/main.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30,   // 30 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## 🚀 **Performance Optimizations**

### **Implemented Optimizations**
- ✅ **Code Splitting** - Automatic route-based code splitting
- ✅ **Bundle Optimization** - Tree shaking and minification
- ✅ **Caching Strategies** - Intelligent React Query caching
- ✅ **Prefetching** - Multiple prefetching strategies
- ✅ **Optimistic Updates** - Instant UI feedback
- ✅ **Error Boundaries** - Prevents cascade failures

### **Performance Metrics**
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: 90+ (Performance)

---

## 🐛 **Debugging**

### **React Query DevTools**

Add React Query DevTools for development:

```bash
yarn add @tanstack/react-query-devtools
```

### **Redux DevTools**

The project includes Redux DevTools support for debugging state changes.

### **Common Issues**

#### **Build Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

#### **Type Errors**
```bash
# Check TypeScript configuration
yarn tsc --noEmit
```

---

## 📚 **Additional Resources**

### **Documentation**
- [Advanced Features Implementation](./ADVANCED_FEATURES_IMPLEMENTATION.md)
- [Migration Summary](./MIGRATION_SUMMARY.md)
- [React Query Docs](https://tanstack.com/query/latest)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

### **Example Components**
- `src/components/examples/EnhancedUsersList.tsx` - Complete CRUD example
- `src/components/PrefetchLink.tsx` - Hover prefetching example
- `src/components/error/` - Error handling examples

---

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure all linting passes
- Update documentation as needed

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing framework
- **TanStack Team** - For React Query
- **Redux Team** - For Redux Toolkit  
- **Vite Team** - For the fast build tool
- **Community Contributors** - For the ecosystem

---

## 📞 **Support**

- 📧 **Email**: [san.jeeb@live.com](mailto:san.jeeb@live.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/zearaez/react-boilerplate/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/zearaez/react-boilerplate/discussions)

---

**Happy coding! 🚀**