"use client";

import { SessionProvider } from "next-auth/react";
import { useRef } from "react";
import { Provider } from "react-redux";
import SessionSync from "@/components/auth/SessionSync";
import { store } from "./store";

type AppStore = typeof store;

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>(null);
	if (!storeRef.current) {
		storeRef.current = store;
	}

	return (
		<SessionProvider>
			<Provider store={storeRef.current}>
				<SessionSync />
				{children}
			</Provider>
		</SessionProvider>
	);
}
