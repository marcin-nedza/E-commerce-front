import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import countReducer from '../../components/ui/Navigation/cartCountSlice';
import authReducer from "../../pages/Auth/authSlice";
import { api } from "../features/api/api";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    auth:authReducer,
    cartCount: countReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
