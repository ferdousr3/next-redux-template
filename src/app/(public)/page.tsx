"use client";

import { FAQSection } from "@/components/home/FAQSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TechStack } from "@/components/home/TechStack";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white font-sans text-slate-900">
			<HeroSection />
			<TechStack />
			<FeaturesSection />
			<FAQSection />

			<footer className="py-8 border-t border-slate-100 text-center text-slate-500 text-sm">
				<p>
					┬® {new Date().getFullYear()} Next Redux Template. Built with ┬Ñ in
					React.
				</p>
			</footer>
		</div>
	);
}
