import NextAuth from "next-auth";
import { authOptions } from "@/lib/features/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
