"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Layout, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-white text-slate-900 pt-20 pb-12 lg:pt-32 lg:pb-20">
			{/* Background Decor */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-3xl opacity-60" />
				<div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-emerald-50 to-teal-50 blur-3xl opacity-60" />
				<div
					className="absolute inset-0 opacity-[0.4]"
					style={{
						backgroundImage:
							"radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.4) 1px, transparent 0)",
						backgroundSize: "24px 24px",
					}}
				/>
			</div>

			<div className="container relative z-10 px-6 mx-auto">
				<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="lg:w-1/2 text-left"
					>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium mb-6 backdrop-blur-sm">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
							</span>
							Redux Toolkit + Next.js 14
						</div>

						<h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
							Modern State <br />
							<span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
								Management
							</span>
						</h1>

						<p className="text-lg text-slate-600 mb-8 leading-normal max-w-lg">
							A production-ready template featuring Redux Toolkit, RTK Query,
							Shadcn UI, and Biome. Built for scale, performance, and developer
							experience.
						</p>

						<div className="flex flex-wrap gap-3">
							<Link href="/dashboard">
								<Button
									size="lg"
									className="h-12 px-6 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
								>
									Get Started <ArrowRight className="ml-2 w-4 h-4" />
								</Button>
							</Link>
							<Link href="https://github.com" target="_blank">
								<Button
									size="lg"
									variant="outline"
									className="h-12 px-6 text-sm font-medium rounded-full border-slate-200 hover:bg-slate-50 transition-all hover:scale-105"
								>
									<Github className="mr-2 w-4 h-4" /> GitHub Repo
								</Button>
							</Link>
						</div>
					</motion.div>

					{/* Visual Content */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
						className="lg:w-1/2 w-full max-w-xl mx-auto lg:mx-0"
					>
						<div className="relative group">
							<div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-purple-500/10 rounded-3xl blur-xl transition-opacity opacity-75 group-hover:opacity-100" />

							{/* Floating Cards Visualization */}
							<div className="absolute top-6 -left-6 z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 animate-float-slow">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
										<Zap className="w-4 h-4" />
									</div>
									<div>
										<p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
											Performance
										</p>
										<p className="text-xs font-bold text-slate-900">100/100</p>
									</div>
								</div>
							</div>

							<div className="absolute -bottom-6 -right-2 z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 animate-float-slow delay-700">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
										<Layout className="w-4 h-4" />
									</div>
									<div>
										<p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
											Components
										</p>
										<p className="text-xs font-bold text-slate-900">
											Shadcn UI
										</p>
									</div>
								</div>
							</div>

							{/* Gradient Block */}
							<div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-[4/3] shadow-2xl ring-1 ring-slate-900/10">
								<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

								{/* Code Mockup */}
								<div className="absolute inset-3 bg-[#0B1120] rounded-2xl overflow-hidden border border-slate-800/60 shadow-inner">
									<div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800/50 bg-[#0F172A]">
										<div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
										<div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
										<div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
									</div>
									<div className="p-5 font-mono text-[10px] md:text-xs text-slate-400 leading-relaxed overflow-hidden">
										<div className="flex gap-2 mb-1.5 opacity-50">
											<span>{"// redux/slices/userSlice.ts"}</span>
										</div>
										<div className="flex gap-2 mb-1.5">
											<span className="text-purple-400">import</span>
											<span className="text-white">{"{ createSlice }"}</span>
											<span className="text-purple-400">from</span>
											<span className="text-emerald-400">
												'@reduxjs/toolkit'
											</span>
										</div>
										<div className="flex gap-2 mb-1.5">
											<span className="text-purple-400">const</span>
											<span className="text-blue-400">userSlice</span>
											<span className="text-slate-500">=</span>
											<span className="text-blue-400">createSlice</span>
											<span className="text-slate-300">({"{"}</span>
										</div>
										<div className="pl-4 mb-1">
											<span className="text-slate-300">name:</span>
											<span className="text-emerald-400">'user'</span>,
										</div>
										<div className="pl-4 mb-1">
											<span className="text-slate-300">initialState:</span>
											<span className="text-slate-300">{"{ value: 0 }"}</span>,
										</div>
										<div className="pl-4 mb-1">
											<span className="text-slate-300">reducers:</span>
											<span className="text-slate-300">{"{"}</span>
										</div>
										<div className="pl-8 mb-1">
											<span className="text-blue-400">increment:</span>
											<span className="text-slate-300">(state) {"=> {"}</span>
										</div>
										<div className="pl-12 mb-1">
											<span className="text-slate-300">state.value += 1</span>
										</div>
										<div className="pl-8 mb-1">
											<span className="text-slate-300">{"}"}</span>
										</div>
										<div className="pl-4 mb-1.5">
											<span className="text-slate-300">{"}"}</span>
										</div>
										<div className="">
											<span className="text-slate-300">{"})"}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
