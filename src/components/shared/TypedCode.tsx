"use client";

import { useEffect, useRef, useState } from "react";

import type { TypedCodeProps } from "@/types/TypedCodeType";

export function TypedCode({
	code,
	speed = 30,
	startDelay = 0,
	className,
	triggerInView = true,
}: TypedCodeProps) {
	const [displayedText, setDisplayedText] = useState("");
	const [started, setStarted] = useState(false);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!triggerInView) {
			setStarted(true);
			return;
		}

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setStarted(true);
				observer.disconnect();
			}
		});

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => observer.disconnect();
	}, [triggerInView]);

	useEffect(() => {
		if (!started) return;

		let timeoutId: NodeJS.Timeout;
		let currentIndex = 0;

		const startTyping = () => {
			const intervalId = setInterval(() => {
				if (currentIndex >= code.length) {
					clearInterval(intervalId);
					return;
				}

				setDisplayedText((prev) => prev + code[currentIndex]);
				currentIndex++;
			}, speed);

			return () => clearInterval(intervalId);
		};

		timeoutId = setTimeout(() => {
			startTyping();
		}, startDelay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [started, code, speed, startDelay]);

	return (
		<div ref={elementRef} className={className}>
			{displayedText}
			<span className="animate-pulse inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle"></span>
		</div>
	);
}
