import { TrendingUp } from "lucide-react";

import type { WelcomeHeaderProps } from "@/types/WelcomeHeaderType";

export function WelcomeHeader({ userFirstName }: WelcomeHeaderProps) {
	return (
		<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white">
			<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
			<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
			<div className="relative z-10">
				<div className="flex items-center gap-2 mb-2">
					<TrendingUp className="h-5 w-5" />
					<span className="text-emerald-100 text-sm font-medium">
						Dashboard Overview
					</span>
				</div>
				<h1 className="text-3xl font-bold mb-2">
					Welcome back, {userFirstName || "User"}! 👋
				</h1>
				<p className="text-emerald-100 max-w-lg">
					Here's what's happening with your content today. Manage all your
					resources from one place.
				</p>
			</div>
		</div>
	);
}
