import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/features/auth/slice";

import notesReducer from "@/lib/features/notes/slice";
import postReducer from "@/lib/features/posts/slice";
import productReducer from "@/lib/features/product/state/productReducer";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,

		notes: notesReducer,
		posts: postReducer,
		products: productReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					"notes/fetchNotes/fulfilled",
					"posts/fetchPosts/fulfilled",
					"products/fetchProducts/fulfilled",
				],
			},
		}).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
