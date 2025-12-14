"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AuthUser, authApi } from "@/lib/features/auth/api";
import { setCredentials, setTokens } from "@/lib/features/auth/slice";

export default function SessionSync() {
	const { data: session } = useSession();
	const dispatch = useDispatch();

	useEffect(() => {
		if (session?.user && session?.accessToken && session?.refreshToken) {
			// Sync session to Redux
			const user = session.user as unknown as AuthUser;
			dispatch(
				setCredentials({
					user,
					accessToken: session.accessToken as string,
					refreshToken: session.refreshToken as string,
				}),
			);
		}
	}, [session, dispatch]);

	// Auto Refresh Token every 5 minutes
	useEffect(() => {
		const intervalId = setInterval(
			async () => {
				const refreshToken = localStorage.getItem("refreshToken");

				// 1. Check if token exists
				if (!refreshToken) return;

				// 2. Skip Mock Tokens (Social Logic)
				if (refreshToken.includes("mock-refresh-token")) {
					console.log("Auto-Refresh: Skipping mock token");
					return;
				}

				// 3. Attempt Refresh
				try {
					console.log("Auto-Refresh: Validating token...");
					const response = await authApi.refreshToken(refreshToken);
					dispatch(
						setTokens({
							accessToken: response.accessToken,
							refreshToken: response.refreshToken,
						}),
					);
					console.log("Auto-Refresh: Success");
				} catch (error) {
					console.error("Auto-Refresh Failed:", error);
					// Optional: Logout if refresh fails?
					// existing http-client interceptor handles 401s, so we can just log here.
				}
			},
			5 * 60 * 1000,
		); // 5 minutes

		return () => clearInterval(intervalId);
	}, [dispatch]);

	return null;
}
