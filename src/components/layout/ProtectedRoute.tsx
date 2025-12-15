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
	const { status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const hasToken =
			typeof window !== "undefined"
				? !!localStorage.getItem("accessToken")
				: false;

		const isAuthCheckFinished = !loading && status !== "loading";
		const isUnauthenticated =
			!isAuthenticated && status === "unauthenticated" && !hasToken;

		if (isAuthCheckFinished && isUnauthenticated) {
			router.push(`/login?from=${encodeURIComponent(pathname)}`);
		}
	}, [isAuthenticated, loading, status, router, pathname]);

	if (loading || status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return <>{children}</>;
}
