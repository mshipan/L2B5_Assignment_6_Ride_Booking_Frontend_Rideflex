import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_API_URL,
  //   credentials: "include",
  // }),
  tagTypes: ["USER", "RIDES"],
  endpoints: () => ({}),
});

export default baseApi;
