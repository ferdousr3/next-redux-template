import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust base URL as needed, usually points to internal API
	tagTypes: ["User"],
	endpoints: (_builder) => ({}),
});
