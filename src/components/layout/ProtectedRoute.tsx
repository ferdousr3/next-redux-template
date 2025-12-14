"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, loading } = useSelector(
		(state: RootState) => state.auth,
	);
	const { status } = useSession(); // "loading" | "authenticated" | "unauthenticated"
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Check localStorage directly for client-side persistence match
		const hasToken =
			typeof window !== "undefined"
				? !!localStorage.getItem("accessToken")
				: false;

		// Only redirect if:
		// 1. Redux is not loading
		// 2. NextAuth is done loading (not "loading")
		// 3. Redux is not authenticated
		// 4. NextAuth is "unauthenticated"
		// 5. No token in local storage

		const isAuthCheckFinished = !loading && status !== "loading";
		const isUnauthenticated =
			!isAuthenticated && status === "unauthenticated" && !hasToken;

		if (isAuthCheckFinished && isUnauthenticated) {
			router.push(`/login?from=${encodeURIComponent(pathname)}`);
		}
	}, [isAuthenticated, loading, status, router, pathname]);

	// Show loader while either Redux or NextAuth is loading
	if (loading || status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return <>{children}</>;
}
