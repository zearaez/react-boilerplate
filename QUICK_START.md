# 🚀 Quick Start Guide

## 🎯 **For New Developers - Get Started in 5 Minutes**

### 1. **Prerequisites Check**
```bash
# Check Node.js version (should be 18+)
node --version

# Check Yarn version (recommended package manager)
yarn --version
# If not installed: npm install -g yarn
```

### 2. **Project Setup**
```bash
# Clone and setup
git clone https://github.com/zearaez/react-boilerplate
cd react-boilerplate
yarn install

# Copy environment template
cp .env.example .env.local

# Start development server
yarn dev
```

### 3. **Verify Setup**
- Open http://localhost:5173
- You should see the login page
- Check browser console for any errors

---

## 🏗️ **Your First Feature - Adding a Products Page**

### Step 1: Create Types
```typescript
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  created_at: string;
}
```

### Step 2: Create Custom Hook
```typescript
// src/hooks/useProducts.ts
import { useApi } from './useApi';
import { Product } from '@/types/product';

export const useProducts = () => {
  const api = useApi({ resource: 'products' });
  
  return {
    useProductsList: api.useList<Product>,
    useProduct: api.useGet<Product>,
    useCreateProduct: api.useCreate<Product>,
    useUpdateProduct: api.useUpdate<Product>,
    useDeleteProduct: api.useDelete,
  };
};
```

### Step 3: Create Page Component
```typescript
// src/screens/products/products.screen.tsx
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ErrorDisplay } from '@/components/error';

const ProductsPage: React.FC = () => {
  const { useProductsList, useCreateProduct } = useProducts();
  
  const { data: products, isLoading, error, refetch } = useProductsList();
  const createMutation = useCreateProduct();

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div className="products-page">
      <h1>Products</h1>
      
      <ErrorDisplay error={error} onRetry={refetch} />
      
      <button 
        onClick={() => createMutation.mutate({
          name: 'New Product',
          price: 29.99,
          description: 'A great product'
        })}
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Add Product'}
      </button>

      <div className="products-grid">
        {products?.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
```

### Step 4: Add Route
```typescript
// src/router/Router.tsx
import ProductsPage from '@/screens/products/products.screen';

// Add to your routes array
{
  path: '/products',
  element: <ProductsPage />,
}
```

### Step 5: Test Your Feature
```bash
# Run tests
yarn test

# Check linting
yarn lint

# Build to verify everything works
yarn build
```

---

## 🎨 **Available Features & Examples**

### **Optimistic Updates** (Automatic)
```typescript
// Just use the mutation hooks - optimistic updates work automatically!
const createMutation = useCreateProduct();
createMutation.mutate(newProduct); // UI updates instantly!
```

### **Error Handling**
```typescript
// Wrap components in error boundaries
<QueryErrorBoundary>
  <YourComponent />
</QueryErrorBoundary>

// Or use inline error displays
<ErrorDisplay error={error} onRetry={refetch} />
```

### **Prefetching** 
> **🎛️ Control**: Set `VITE_ENABLE_PREFETCHING=false` to disable all prefetching for debugging

```typescript
// Hover prefetching
<PrefetchLink to="/products/123" resource="products" id="123">
  View Product
</PrefetchLink>

// Route prefetching (automatic)
useRoutePrefetch();

// Manual prefetching
const { prefetchItem } = usePrefetch();
await prefetchItem('products', '123');
```

---

## 🔧 **Common Development Tasks**

### **Adding New API Endpoints**
1. Add types in `src/types/`
2. Create hook using `useApi()` in `src/hooks/`
3. Use hook in your components

### **Styling Components**
1. Create CSS file next to component
2. Import CSS in component
3. Use CSS modules pattern: `styles.moduleName`

### **Adding Tests**
1. Create `*.test.tsx` files next to components
2. Use React Testing Library patterns
3. Test user interactions and error states

### **Debugging**
1. Use React DevTools browser extension
2. Check network tab for API calls
3. Use `console.log` with proper ESLint comments
4. Enable React Query DevTools in development

---

## 📚 **Key Concepts to Understand**

### **Hook Composition**
- `useApi()` provides generic CRUD operations
- Custom hooks like `useUsers()` wrap `useApi()` for specific resources
- Components use custom hooks, never `useApi()` directly

### **Error Boundaries**
- Global boundary catches all unhandled errors
- Query boundary handles React Query specific errors
- Inline components show specific error messages

### **State Management**
- **Server State**: Managed by React Query (use hooks)
- **Client State**: Managed by Redux (use selectors/dispatch)
- **Component State**: Use `useState` for local state

---

## 🚨 **Common Gotchas**

### **TypeScript Errors**
- Always define interfaces for your data types
- Use `@/` for absolute imports
- Check `tsconfig.json` for path mappings

### **API Integration**
- Update `VITE_API_BASE_URL` in `.env.local`
- Check network tab if requests fail
- Verify endpoint URLs in `src/core/http/endpoint-urls.ts`

### **Performance**
- Don't over-prefetch - use wisely
- Monitor bundle size with `yarn build`
- Use React DevTools Profiler for performance issues

### **Debugging Prefetching**
```bash
# Disable prefetching for cleaner debugging
echo "VITE_ENABLE_PREFETCHING=false" >> .env.local
yarn dev

# Check feature flag status in console
console.log('Prefetching enabled:', import.meta.env.VITE_ENABLE_PREFETCHING);

# Monitor Network tab in DevTools:
# - With prefetching enabled: See background requests
# - With prefetching disabled: Only user-initiated requests
```
- Use React DevTools Profiler for performance issues

---

## 🆘 **Getting Help**

1. **Check the main README.md** for comprehensive documentation
2. **Look at example components** in `src/components/examples/`
3. **Read the implementation guides** in the project root
4. **Ask questions** in team chat or create GitHub issues

---

**Happy coding! 🎉**
