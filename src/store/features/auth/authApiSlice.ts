import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: "/auth/register",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useRegisterMutation } = authApiSlice;
