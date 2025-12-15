import { Check, X } from "lucide-react";
import type { PasswordRequirementsProps } from "@/types/PasswordRequirementsType";

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
	const requirements = [
		{ label: "At least 8 characters", met: password.length >= 8 },
		{ label: "One lowercase letter", met: /[a-z]/.test(password) },
		{ label: "One uppercase letter", met: /[A-Z]/.test(password) },
		{ label: "One number", met: /[0-9]/.test(password) },
	];

	return (
		<div className="mt-2 space-y-1">
			<p className="text-xs text-muted-foreground mb-1">
				Password requirements:
			</p>
			{requirements.map((req) => (
				<div key={req.label} className="flex items-center gap-2 text-xs">
					{req.met ? (
						<Check className="h-3 w-3 text-emerald-500" />
					) : (
						<X className="h-3 w-3 text-muted-foreground" />
					)}
					<span
						className={req.met ? "text-emerald-600" : "text-muted-foreground"}
					>
						{req.label}
					</span>
				</div>
			))}
		</div>
	);
}
