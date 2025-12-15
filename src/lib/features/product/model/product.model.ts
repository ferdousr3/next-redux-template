export interface Product {
	id: string;
	name: string;
	description: string | null;
	price: string;
	stock: number;
	image: string | null;
	creatorId: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface ProductInput {
	name: string;
	description?: string;
	price: string;
	stock?: number;
	image?: string;
}

export interface ProductQuery {
	search?: string;
	page?: number;
	size?: number;
}

export interface ProductsResponse {
	products: Product[];
	total: number;
}

export interface ProductState {
	products: Product[];
	selectedProduct: Product | null;
	categories: string[];
	loading: boolean;
	creating: boolean;
	updating: boolean;
	deleting: string | null;
	error: string | null;
	query: ProductQuery;
	total: number;
	initialized: boolean;
}
