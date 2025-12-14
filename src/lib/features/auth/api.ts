import { httpClient } from "@/lib/http-client";

import type {
	AuthResponse,
	AuthTokens,
	AuthUser,
	ChangePasswordData,
	ForgotPasswordData,
	LoginCredentials,
	RegisterData,
	ResetPasswordData,
} from "./model/authModel";

export * from "./model/authModel";

class AuthApiService {
	private baseUrl = "/v1/auth";

	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const response = await httpClient.post<{ data: AuthResponse }>(
			`${this.baseUrl}/login`,
			credentials,
		);
		return response.data.data;
	}

	async register(data: RegisterData): Promise<AuthUser> {
		const response = await httpClient.post<{ data: AuthUser }>(
			`${this.baseUrl}/register`,
			data,
		);
		return response.data.data;
	}

	async refreshToken(refreshToken: string): Promise<AuthTokens> {
		const response = await httpClient.post<{ data: AuthTokens }>(
			`${this.baseUrl}/refresh-token`,
			{ refreshToken },
		);
		return response.data.data;
	}

	async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
		const response = await httpClient.post<{ message: string }>(
			`${this.baseUrl}/change-password`,
			data,
		);
		return { message: response.data.message };
	}

	async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
		const response = await httpClient.post<{ message: string }>(
			`${this.baseUrl}/forgot-password`,
			data,
		);
		return { message: response.data.message };
	}

	async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
		const response = await httpClient.post<{ message: string }>(
			`${this.baseUrl}/reset-password`,
			data,
		);
		return { message: response.data.message };
	}

	async verifyEmail(token: string): Promise<{ message: string }> {
		const response = await httpClient.get<{ message: string }>(
			`${this.baseUrl}/verify-email?token=${token}`,
		);
		return { message: response.data.message };
	}
}

export const authApi = new AuthApiService();
