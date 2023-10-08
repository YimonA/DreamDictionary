import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dreamApi = createApi({
  reducerPath: "dreamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dream-dictionary.onrender.com/`,
  }),
  tagTypes: ["dream"],

  endpoints: (builder) => ({
    getBlogHeader: builder.query({
      query: () => ({
        url: "/BlogHeader",
      }),
      providesTags: ["dream"],
    }),
    getBlogDetail: builder.query({
      query: () => ({
        url: "/BlogDetail",
      }),
      providesTags: ["dream"],
    }),
  }),
});

export const {
  useGetBlogHeaderQuery,useGetBlogDetailQuery
} = dreamApi;
