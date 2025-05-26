import { apiSlice } from "@/services/api-slice";

export const tasks = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/eb2da7a6-ff40-4962-a408-13ab027ba6be/load",
        method: "GET",
      }),

      transformResponse: (response) => {
        console.log("API Response:", response);
        return response;
      },
      providesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: () => ({
        url: "/eb2da7a6-ff40-4962-a408-13ab027ba6be/remove",
        method: "DELETE",
        notification: "init",
      }),
    }),
  }),
});

export const { useGetTasksQuery, useDeleteTaskMutation } = tasks;
