import { modulesSlice } from "@/features/slice/modules";
import { baseApi } from "@/services/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";

// Configure the store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    modules: modulesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
