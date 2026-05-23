import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/dashboard" }),
  endpoints: (builder) => ({
    getKPI: builder.query<any, void>({
      query: () => "/kpis",
    }),
    getChart: builder.query<any, void>({
      query: () => "/charts",
    }),
    getCategories: builder.query<any, void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetKPIQuery, useGetChartQuery, useGetCategoriesQuery } =
  dashboardApi;
