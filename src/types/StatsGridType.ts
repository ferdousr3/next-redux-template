import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
	name: string;
	value: number;
	icon: LucideIcon;
	href: string;
	color: string;
	bgColor: string;
	iconColor: string;
}

export interface StatsGridProps {
	stats: DashboardStat[];
}
