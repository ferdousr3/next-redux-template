"use client";

import {
	LayoutDashboard,
	Lock,
	Rocket,
	Settings,
	Smartphone,
	Users,
} from "lucide-react";

const features = [
	{
		title: "Robust Authentication",
		description:
			"Secure login/register flows with NextAuth, Google/GitHub providers, and route protection.",
		icon: Lock,
	},
	{
		title: "Interactive Dashboard",
		description:
			"A fully functional dashboard layout with sidebar navigation, breadcrumbs, and user controls.",
		icon: LayoutDashboard,
	},
	{
		title: "State Management",
		description:
			"Redux Toolkit integrated with RTK Query for efficient data fetching and global state caching.",
		icon: Users,
	},
	{
		title: "Responsive Design",
		description:
			"Mobile-first approach ensuring your application looks perfect on any device size.",
		icon: Smartphone,
	},
	{
		title: "Performance First",
		description:
			"Optimized build settings, image optimization, and code splitting out of the box.",
		icon: Rocket,
	},
	{
		title: "Developer Tools",
		description:
			"Pre-configured with Biome, Lefthook, and TypeScript for a strictly typed codebase.",
		icon: Settings,
	},
];

export function FeaturesSection() {
	return (
		<section className="py-24 bg-white">
			<div className="container px-6 mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
					<div>
						<h2 className="text-4xl font-bold text-slate-900 mb-6">
							Why choose this template?
						</h2>
						<p className="text-lg text-slate-600 mb-8 leading-relaxed">
							Starting a new project shouldn't mean setting up the same
							boilerplate every time. We provide a solid, opinionated foundation
							so you can focus on building features.
						</p>

						<ul className="space-y-4">
							{[
								"Production-ready folder structure",
								"SEO optimized meta tags",
								"Accessibility compliant components",
							].map((item, _i) => (
								<li
									key={item}
									className="flex items-center gap-3 text-slate-700 font-medium"
								>
									<div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
										<svg
											className="w-3.5 h-3.5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-labelledby={`icon-${item.replace(/\s+/g, "-").toLowerCase()}`}
										>
											<title
												id={`icon-${item.replace(/\s+/g, "-").toLowerCase()}`}
											>
												Checkmark
											</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									{item}
								</li>
							))}
						</ul>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all duration-300"
							>
								<div className="w-10 h-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-600 mb-4">
									<feature.icon className="w-5 h-5" />
								</div>
								<h3 className="font-bold text-slate-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-sm text-slate-600 leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
