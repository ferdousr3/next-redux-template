export interface PostInput {
	title: string;
	content?: string;
	published?: boolean;
}

export interface Post extends PostInput {
	id: string;
	authorId: string | null;
	creatorId?: string | null;
	createdAt: string;
	updatedAt: string;
}
export interface PostQuery {
	search?: string;
	page?: number;
	limit?: number;
	published?: boolean;
}

export interface PostState {
	posts: Post[];
	selectedPost: Post | null;
	loading: boolean;
	creating: boolean;
	updating: boolean;
	deleting: string | null;
	error: string | null;
	query: PostQuery;
	initialized: boolean;
}
