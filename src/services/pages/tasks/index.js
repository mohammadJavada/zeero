// import { apiSlice } from "../api-slice";

import { apiSlice } from "../../api-slice";

export const tasks = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/eb2da7a6-ff40-4962-a408-13ab027ba6be/load",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        console.log('API Response:', response);
        return response;
      },
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksQuery } = tasks;
