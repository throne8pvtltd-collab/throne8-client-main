# src/store/
    
#   ├── 📁 features/
### │   ├── 📁 auth/
    │   │   ├── 📄 auth.types.ts       ✅ Auth TypeScript types
    │   │   ├── 📄 authSlice.ts        ✅ Auth state management
    │   │   ├── 📄 authThunks.ts       ✅ Auth async operations
    │   │   └── 📄 index.ts            ✅ Auth module exports
    │   │
### │   └── 📁 profile/
    │       ├── 📄 profile.types.ts    ✅ Profile TypeScript types
    │       ├── 📄 profileSlice.ts     ✅ Profile state management
    │       ├── 📄 profileThunks.ts    ✅ Profile async operations
    │       └── 📄 index.ts            ✅ Profile module exports
    │
##  ├── 📁 hooks/
    │   ├── 📄 useAuthActions.ts       ✅ Auth operations hook
    │   ├── 📄 useProfileActions.ts    ✅ Profile operations hook
    │   └── 📄 index.ts                ✅ Hooks exports
    │
##  ├── 📁 providers/
    │   └── 📄 ReduxProvider.tsx       ✅ Redux Provider
    │
##  ├── 📁 types/
    │   └── 📄 index.ts                ✅ Central types export
    │
    ├── 📄 store.ts                    ✅ Store configuration
    ├── 📄 index.ts                    ✅ Central exports
    ├── 📄 token.storage.ts            ✅ Token management
    └── 📄 README.md                   ✅ Documentation