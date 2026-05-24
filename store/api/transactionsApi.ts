import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getTransactions: builder.query<
      any,
      { search: string; type: string; page: number }
    >({
      query: ({ search, type, page }) =>
        `/transactions?search=${search}&type=${type}&page=${page}`,
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
