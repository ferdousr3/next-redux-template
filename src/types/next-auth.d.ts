import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		refreshToken?: string;
		user: {
			id: string;
			firstName?: string;
			lastName?: string;
			profilePhoto?: string | null;
		} & DefaultSession["user"];
	}

	interface User {
		accessToken?: string;
		refreshToken?: string;
		id: string;
		firstName: string;
		lastName: string;
		profilePhoto: string | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
		refreshToken?: string;
		user?: any;
	}
}
