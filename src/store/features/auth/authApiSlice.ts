import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/register", // Adjust to match your actual backend endpoint path relative to baseUrl
				method: "POST",
				body: credentials,
			}),
		}),
		// Login is handled by NextAuth, but if we needed a direct API call:
		// login: builder.mutation({ ... })
	}),
});

export const { useRegisterMutation } = authApiSlice;
