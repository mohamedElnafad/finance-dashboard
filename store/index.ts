import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./api/dashboardApi";

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});
