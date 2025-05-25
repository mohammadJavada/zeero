import { createApi } from "@reduxjs/toolkit/query/react";
import http from "./api-slice";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import public_http from "./public-http-service";
import { tagTypes } from "./tag-types";

const fetchFn = async ({
  url,
  method,
  body,
  headers,
  notification,
  isPublic = false,
}) => {
  const accessToken = getCookie("access_token");
  if (!accessToken && !isPublic) return;
  try {
    const response = isPublic
      ? await public_http[method.toLowerCase()](url, body, {
          headers,
        })
      : await http[method.toLowerCase()](url, body, {
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
    return {
      data: response?.data,
      // status: response?.status,
    };
  } catch (error) {
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
  tagTypes: tagTypes,
  endpoints: () => ({}),
});
