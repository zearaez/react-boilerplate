# 📚 Examples

This folder contains example components that demonstrate various features and patterns used in this React boilerplate.

## 🎯 Available Examples

### EnhancedUsersList
**File:** `EnhancedUsersList.tsx`  
**Demonstrates:**
- ✅ CRUD operations with React Query
- ✅ Optimistic updates
- ✅ Error handling and retry logic
- ✅ Prefetching strategies
- ✅ Infinite scroll prefetching
- ✅ Loading states and UX patterns
- ✅ Search and pagination
- ✅ Type-safe API integration

## 🚀 Usage

```tsx
import { EnhancedUsersList } from "@/examples";

function MyPage() {
  return <EnhancedUsersList />;
}
```

## 📁 File Organization

```
src/examples/
├── index.ts                    # Exports all examples
├── EnhancedUsersList.tsx       # Complete CRUD example
├── enhanced-users-list.css     # Styles for the example
└── README.md                   # This file
```

## 🎓 Learning Guide

1. **Start with EnhancedUsersList** - It shows a complete real-world pattern
2. **Study the hooks usage** - See how custom hooks simplify components
3. **Examine error handling** - Learn the error boundary patterns
4. **Check performance optimizations** - Prefetching and optimistic updates

## 🔧 Customization

These examples are meant to be:
- **Referenced** - Copy patterns into your own components
- **Modified** - Adapt to your specific needs
- **Extended** - Build upon the patterns shown

## 📝 Notes

- Examples use the same hooks and utilities as the main app
- All examples follow the same TypeScript patterns
- CSS classes are scoped to avoid conflicts
- Examples are excluded from production builds by default
