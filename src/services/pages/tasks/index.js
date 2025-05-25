// import { apiSlice } from "../api-slice";

import { apiSlice } from "@/services/api-slice";

export const profile = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetTasksQuery } = profile;
