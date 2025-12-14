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
