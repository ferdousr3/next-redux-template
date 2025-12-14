import axios from "axios";

const baseURL =
	process.env.NEXT_PUBLIC_API_URL || "https://managex-o.netlify.app";

export const httpClient = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

httpClient.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("auth_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Queue to hold requests while refreshing
let isRefreshing = false;
let failedQueue: Array<any> = []; // Using any to avoid complex type errors with axios queue

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

httpClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			// CHECK FOR MOCK TOKEN (Social Login Demo)
			// If we are using a mock token, the backend WILL reject it with 401.
			// We must NOT try to refresh it (backend will also reject refresh), and we MUST NOT logout.
			// Just let the request fail so the UI handles the error state.
			const storedRefreshToken =
				typeof window !== "undefined"
					? localStorage.getItem("refreshToken")
					: null;
			if (
				storedRefreshToken &&
				storedRefreshToken.includes("mock-refresh-token")
			) {
				console.warn(
					"Mock Token 401 detected - Suppressing logout/refresh for demo.",
				);
				return Promise.reject(error);
			}

			if (originalRequest.url?.includes("/refresh-token")) {
				// Refresh token failed, logout
				if (typeof window !== "undefined") {
					localStorage.clear(); // Clear all auth data
					window.location.href = "/login";
				}
				return Promise.reject(error);
			}

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return httpClient(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");

				if (!refreshToken) {
					throw new Error("No refresh token available");
				}

				// Use a new instance to avoid interceptors
				const response = await axios.post(`${baseURL}/v1/auth/refresh-token`, {
					refreshToken,
				});

				const { accessToken, refreshToken: newRefreshToken } =
					response.data.data;

				if (typeof window !== "undefined") {
					localStorage.setItem("accessToken", accessToken);
					localStorage.setItem("refreshToken", newRefreshToken);
					localStorage.setItem("auth_token", accessToken);
				}

				httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
				processQueue(null, accessToken);

				// Retry original request
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return httpClient(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				if (typeof window !== "undefined") {
					// Don't redirect if it's the mock environment, for safety, but usually we should.
					// Keeping the "mock safety" check or just logging out.
					// For "Auto Refresh" feature, we strictly assume real backend logic now.
					localStorage.clear();
					window.location.href = "/login";
				}
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);
