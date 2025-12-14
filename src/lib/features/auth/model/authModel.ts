export interface AuthUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	profilePhoto: string | null;
	verified: boolean;
	status: "active" | "inactive" | "banned";
	createdAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface ChangePasswordData {
	currentPassword: string;
	newPassword: string;
}

export interface ForgotPasswordData {
	email: string;
}

export interface ResetPasswordData {
	token: string;
	password: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
}
