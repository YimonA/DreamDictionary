import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dreamApi } from "./api/dreamApi";
import dreamSlice from "./services/dreamSlice";

export const store = configureStore({
  reducer: {
    [dreamApi.reducerPath]: dreamApi.reducer,
    dreamSlice: dreamSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dreamApi.middleware),
});

setupListeners(store.dispatch);