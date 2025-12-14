"use client";

import {
	BookOpen,
	Cpu,
	GitBranch,
	Layers,
	Layout,
	ShieldCheck,
	Terminal,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqItems = [
	{
		id: "nextjs",
		question: "Next.js 14 App Router & Server Actions",
		icon: BookOpen,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					We utilize the <strong>App Router</strong> (`src/app`) for modern
					routing. Pages are Server Components by default. Use `use client` at
					the top of file only when you need interactivity (hooks, event
					listeners).
				</p>
				<p>
					<strong>Server Actions</strong> are used for form submissions and data
					mutations without needing API routes. Define them in `actions.ts`
					files or inline with `use server`.
				</p>
			</div>
		),
	},
	{
		id: "redux",
		question: "Redux Toolkit & RTK Query",
		icon: Layers,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					State management is handled by <strong>Redux Toolkit</strong>. Slices
					are located in `src/lib/*/state/*Slice.ts`.
				</p>
				<p>
					<strong>RTK Query</strong> is used for data fetching. Defined in
					`src/lib/*/state/*Api.ts`. It automatically caches data and manages
					loading states. Use the auto-generated hooks (e.g.,
					`useGetProductsQuery`) in your components.
				</p>
			</div>
		),
	},
	{
		id: "shadcn",
		question: "Shadcn UI Components",
		icon: Layout,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					UI components are built using <strong>Radix Primitives</strong> and
					styled with <strong>Tailwind CSS</strong>. They are located in
					`src/components/ui`.
				</p>
				<p>
					To add a new component, run:
					<code className="block mt-2 bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs">
						npx shadcn@latest add [component-name]
					</code>
				</p>
				<p>
					Components are copy-paste friendly. You possess the code, so
					customization is strictly done by editing the component file directly.
				</p>
			</div>
		),
	},
	{
		id: "forms",
		question: "React Hook Form & Zod",
		icon: ShieldCheck,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					Forms are managed with <strong>React Hook Form</strong> for
					performance and <strong>Zod</strong> for schema validation.
				</p>
				<div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
					<p className="font-semibold mb-2">Basic Workflow:</p>
					<ol className="list-decimal list-inside space-y-1">
						<li>Define Zod schema (`formSchema.ts`)</li>
						<li>Use `useForm&lt;z.infer&lt;typeof schema&gt;&gt;()`</li>
						<li>Bind shadcn `Form` components to the hook</li>
					</ol>
				</div>
				<p>This ensures full type safety from form input to server action.</p>
			</div>
		),
	},
	{
		id: "biome",
		question: "Biome Linting & Formatting",
		icon: Cpu,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					We use <strong>Biome</strong> for extremely fast linting and
					formatting, replacing ESLint and Prettier.
				</p>
				<p>
					Run checks:
					<code className="block mt-2 bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs">
						npx @biomejs/biome check src
					</code>
				</p>
				<p>
					Auto-fix issues:
					<code className="block mt-2 bg-slate-100 p-2 rounded border border-slate-200 font-mono text-xs">
						npx @biomejs/biome check --write src
					</code>
				</p>
			</div>
		),
	},
	{
		id: "lefthook",
		question: "Lefthook & Git Hooks",
		icon: GitBranch,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					<strong>Lefthook</strong> manages pre-commit hooks to ensure code
					quality. It automatically runs Biome checks before you commit code.
				</p>
				<p>
					Configuration is found in `lefthook.yml`. If a commit fails, fix the
					reported linting errors or type issues.
				</p>
			</div>
		),
	},
	{
		id: "lucide",
		question: "Lucide React Icons",
		icon: Terminal,
		answer: (
			<div className="space-y-4 text-sm text-slate-600">
				<p>
					We use <strong>Lucide React</strong> for all iconography. It provides
					a consistent, clean set of SVG icons as React components.
				</p>
				<p>
					Usage: Import the named icon and use it as a component. Props like
					`size`, `color`, and `strokeWidth` are supported.
				</p>
			</div>
		),
	},
];

export function FAQSection() {
	return (
		<section className="py-24 bg-slate-50 border-t border-slate-200">
			<div className="container px-6 mx-auto max-w-4xl">
				<div className="text-center mb-16">
					<Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
						Documentation
					</Badge>
					<h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
						Tech Stack Guide
					</h2>
					<p className="text-slate-600">
						Everything you need to know to build with this template.
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
					<Accordion type="single" collapsible className="w-full">
						{faqItems.map((item) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className="border-slate-100 last:border-0"
							>
								<AccordionTrigger className="hover:no-underline hover:text-emerald-600 py-5 group">
									<div className="flex items-center gap-3 text-left">
										<div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
											<item.icon className="w-4 h-4" />
										</div>
										<span className="font-semibold text-base">
											{item.question}
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent className="pt-0 pb-6 pl-[3.25rem]">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
