import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./api/dashboardApi";
import { transactionsApi } from "./api/transactionsApi";

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(transactionsApi.middleware),
});
