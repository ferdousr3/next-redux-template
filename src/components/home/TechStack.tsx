"use client";

import { Cpu, Globe, Layers, Layout, Shield, Zap } from "lucide-react";

const technologies = [
	{
		name: "Next.js 14",
		description: "App Router & Server Actions",
		icon: Globe,
		color: "text-slate-900",
	},
	{
		name: "Redux Toolkit",
		description: "State Management",
		icon: Layers,
		color: "text-purple-600",
	},
	{
		name: "TypeScript",
		description: "Type Safety",
		icon: Shield,
		color: "text-blue-600",
	},
	{
		name: "Tailwind CSS",
		description: "Utility-first Styling",
		icon: Zap,
		color: "text-cyan-500",
	},
	{
		name: "Shadcn UI",
		description: "Reusable Components",
		icon: Layout,
		color: "text-slate-900",
	},
	{
		name: "Biome",
		description: "Linting & Formatting",
		icon: Cpu,
		color: "text-orange-500",
	},
];

export function TechStack() {
	return (
		<section className="py-24 bg-slate-50 border-y border-slate-200">
			<div className="container px-6 mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-slate-900 mb-4">
						Powered by Modern Tech
					</h2>
					<p className="text-slate-600 max-w-2xl mx-auto">
						We've carefully selected the best tools in the ecosystem to ensure a
						robust and scalable foundation.
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
					{technologies.map((tech) => (
						<div
							key={tech.name}
							className="flex flex-col items-center text-center group"
						>
							<div
								className={`w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 ${tech.color}`}
							>
								<tech.icon className="w-8 h-8" />
							</div>
							<h3 className="font-bold text-slate-900">{tech.name}</h3>
							<p className="text-xs text-slate-500 mt-1">{tech.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
