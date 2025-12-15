import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import type { AccountSummaryProps } from "@/types/AccountSummaryType";

export function AccountSummary({ user, totalItems }: AccountSummaryProps) {
	return (
		<Card className="border-0 overflow-hidden">
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
						Account Summary
					</span>
				</CardTitle>
				<CardDescription>Your account details</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-4">
					<div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
						{user?.firstName?.charAt(0).toUpperCase() || "U"}
					</div>
					<div>
						<h3 className="font-semibold text-lg text-gray-900">
							{user?.firstName} {user?.lastName}
						</h3>
						<p className="text-gray-500 text-sm">{user?.email}</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 pt-4 border-t">
					<div className="text-center p-3 rounded-lg bg-gray-50">
						<div className="text-2xl font-bold text-gray-900">{totalItems}</div>
						<div className="text-xs text-gray-500">Total Items</div>
					</div>
					<div className="text-center p-3 rounded-lg bg-gray-50">
						<div className="text-2xl font-bold text-emerald-600">Active</div>
						<div className="text-xs text-gray-500">Account Status</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
