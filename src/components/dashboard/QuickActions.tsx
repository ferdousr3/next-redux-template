import { FileText, Package, StickyNote } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function QuickActions() {
	return (
		<Card className="border-0 overflow-hidden">
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Quick Actions
					</span>
				</CardTitle>
				<CardDescription>Get started with common tasks</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<Link
					href="/dashboard/posts"
					className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
				>
					<div>
						<div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
							Create a new post
						</div>
						<div className="text-sm text-gray-500">
							Share your thoughts with the world
						</div>
					</div>
					<FileText className="h-8 w-8 text-gray-300 group-hover:text-blue-500 transition-colors" />
				</Link>
				<Link
					href="/dashboard/products"
					className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
				>
					<div>
						<div className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
							Add a product
						</div>
						<div className="text-sm text-gray-500">
							List a new product in your store
						</div>
					</div>
					<Package className="h-8 w-8 text-gray-300 group-hover:text-emerald-500 transition-colors" />
				</Link>
				<Link
					href="/dashboard/notes"
					className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
				>
					<div>
						<div className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
							Create a note
						</div>
						<div className="text-sm text-gray-500">
							Jot down your ideas quickly
						</div>
					</div>
					<StickyNote className="h-8 w-8 text-gray-300 group-hover:text-amber-500 transition-colors" />
				</Link>
			</CardContent>
		</Card>
	);
}
