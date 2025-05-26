import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import http from "./http-service";

const fetchFn = async ({ url, method, body, headers, notification }) => {
  try {
    const response = await http[method.toLowerCase()](url, body, {
      headers,
    });

    const onlyShowServerMessage = notification === null || notification;

    if (onlyShowServerMessage && response.data?.message)
      toast.success(response.data?.message);
    if (onlyShowServerMessage && response.data?.messages)
      toast.success(response.data?.messages);
    if (notification === "init") {
      toast.success("عملیات با موفقیت انجام شد .");
    }

    if (response.data) {
      return { data: response.data };
    }

    return { data: response };
  } catch (error) {
    console.error("API Error:", error);
    return {
      error: {
        status: error?.response?.status || 500,
        data: error?.response?.data || error.message,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: (args) => {
    const { url, method, body, headers, notification, isPublic } = args || {};
    return fetchFn({ url, method, body, headers, notification, isPublic });
  },
  endpoints: () => ({}),
});
