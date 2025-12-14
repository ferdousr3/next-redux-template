import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { authApi } from "@/lib/features/auth/api";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const response = await authApi.login({
						email: credentials.email,
						password: credentials.password,
					});

					if (response?.user) {
						return {
							id: response.user.id,
							email: response.user.email,
							firstName: response.user.firstName,
							lastName: response.user.lastName,
							profilePhoto: response.user.profilePhoto,
							name: `${response.user.firstName} ${response.user.lastName}`,
							image: response.user.profilePhoto,
							accessToken: response.accessToken,
							refreshToken: response.refreshToken,
							user: response.user,
						};
					}
					return null;
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// MOCK API Call to save user to database
			if (account?.provider === "google" || account?.provider === "github") {
				console.log("Saving user to database:", {
					email: user.email,
					name: user.name,
					image: user.image,
					provider: account.provider,
				});
				// await authApi.socialLogin({ ... })
			}
			return true;
		},
		async jwt({ token, user, account }: any) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.user = user.user;
			}
			// For social login, ensure we persist the image and name
			if (
				account &&
				(account.provider === "google" || account.provider === "github")
			) {
				token.picture = user?.image;
				token.name = user?.name;
				// Mock tokens for social login to satisfy SessionSync and Redux
				token.accessToken = `mock-access-token-${account.provider}`;
				token.refreshToken = `mock-refresh-token-${account.provider}`;
			}
			return token;
		},
		async redirect({ url, baseUrl }) {
			// If duplicate redirect or home, go to dashboard
			if (url === "/" || url === baseUrl) {
				return `${baseUrl}/dashboard`;
			}
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url;
			return `${baseUrl}/dashboard`;
		},
		async session({ session, token }: any) {
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.user = {
				...session.user,
				...token.user,
				image: token.picture || session.user?.image,
				name: token.name || session.user?.name,
				profilePhoto: token.picture || session.user?.image, // Sync for Redux AuthUser compatibility
			};
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET || "supersecret",
};
