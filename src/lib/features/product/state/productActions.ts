import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
	Product,
	ProductInput,
	ProductQuery,
} from "../model/product.model";
import { productApi } from "../productApi";

export const fetchProducts = createAsyncThunk(
	"products/fetchAll",
	async (query: ProductQuery | undefined, { rejectWithValue }) => {
		try {
			return await productApi.getAllProducts(query);
		} catch (error: unknown) {
			return rejectWithValue(
				(error as any).response?.data?.message || "Failed to fetch products",
			);
		}
	},
);

export const fetchProduct = createAsyncThunk(
	"products/fetchOne",
	async (id: string, { rejectWithValue }) => {
		try {
			return await productApi.getProduct(id);
		} catch (error: unknown) {
			return rejectWithValue(
				(error as any).response?.data?.message || "Failed to fetch product",
			);
		}
	},
);

export const createProduct = createAsyncThunk(
	"products/create",
	async (data: ProductInput, { rejectWithValue }) => {
		try {
			return await productApi.createProduct(data);
		} catch (error: unknown) {
			return rejectWithValue(
				(error as any).response?.data?.message || "Failed to create product",
			);
		}
	},
);

export const updateProduct = createAsyncThunk(
	"products/update",
	async (
		{ id, data }: { id: string; data: Partial<Product> },
		{ rejectWithValue },
	) => {
		try {
			return await productApi.updateProduct(id, data);
		} catch (error: unknown) {
			return rejectWithValue(
				(error as any).response?.data?.message || "Failed to update product",
			);
		}
	},
);

export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (id: string, { rejectWithValue }) => {
		try {
			return await productApi.deleteProduct(id);
		} catch (error: unknown) {
			return rejectWithValue(
				(error as any).response?.data?.message || "Failed to delete product",
			);
		}
	},
);

export const fetchCategories = createAsyncThunk(
	"products/fetchCategories",
	async (_unused, { rejectWithValue }) => {
		return [];
	},
);
