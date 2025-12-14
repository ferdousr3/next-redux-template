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
		async jwt({ token, user }: any) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.user = user.user;
			}
			return token;
		},
		async session({ session, token }: any) {
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.user = {
				...session.user,
				...token.user,
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
