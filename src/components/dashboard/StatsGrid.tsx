import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { StatsGridProps } from "@/types/StatsGridType";

export function StatsGrid({ stats }: StatsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat) => (
				<Link key={stat.name} href={stat.href} className="group">
					<Card className="relative overflow-hidden border-0 transition-all duration-300 hover:-translate-y-1">
						{/* Gradient top bar */}
						<div
							className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
						/>

						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-gray-500">
								{stat.name}
							</CardTitle>
							<div className={`p-2 rounded-lg ${stat.bgColor}`}>
								<stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-gray-900">
								{stat.value}
							</div>
							<div className="flex items-center justify-between mt-2">
								<span className="text-xs text-gray-500">
									Total {stat.name.toLowerCase()}
								</span>
								<ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
							</div>
						</CardContent>
					</Card>
				</Link>
			))}
		</div>
	);
}
