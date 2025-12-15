"use client";

import { FileText, Package, StickyNote } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountSummary } from "@/components/dashboard/AccountSummary";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { fetchNotes } from "@/lib/features/notes/slice";
import { fetchPosts } from "@/lib/features/posts/slice";
import { fetchProducts } from "@/lib/features/product/state/productActions";
import type { AppDispatch, RootState } from "@/store/store";
import type { DashboardStat } from "@/types/StatsGridType";

export default function DashboardHome() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	const { posts, initialized: postsInit } = useSelector(
		(state: RootState) => state.posts,
	);
	const { products, initialized: productsInit } = useSelector(
		(state: RootState) => state.products,
	);
	const { notes, initialized: notesInit } = useSelector(
		(state: RootState) => state.notes,
	);

	// Fetch data on mount if not initialized
	useEffect(() => {
		if (!postsInit) dispatch(fetchPosts({}));
		if (!productsInit) dispatch(fetchProducts({}));
		if (!notesInit) dispatch(fetchNotes({}));
	}, [dispatch, postsInit, productsInit, notesInit]);

	const stats: DashboardStat[] = [
		{
			name: "Posts",
			value: posts.length,
			icon: FileText,
			href: "/dashboard/posts",
			color: "from-blue-500 to-blue-600",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
		},
		{
			name: "Products",
			value: products.length,
			icon: Package,
			href: "/dashboard/products",
			color: "from-emerald-500 to-emerald-600",
			bgColor: "bg-emerald-50",
			iconColor: "text-emerald-600",
		},
		{
			name: "Notes",
			value: notes.length,
			icon: StickyNote,
			href: "/dashboard/notes",
			color: "from-amber-500 to-amber-600",
			bgColor: "bg-amber-50",
			iconColor: "text-amber-600",
		},
	];

	return (
		<div className="space-y-8">
			<WelcomeHeader userFirstName={user?.firstName} />
			<StatsGrid stats={stats} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<QuickActions />
				<AccountSummary
					user={user}
					totalItems={posts.length + products.length + notes.length}
				/>
			</div>
		</div>
	);
}
