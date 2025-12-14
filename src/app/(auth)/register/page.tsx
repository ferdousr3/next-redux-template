"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Chrome, Eye, EyeOff, Github, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	type RegistrationFormValues,
	registrationSchema,
} from "@/schemas/auth.schema";
import { useRegisterMutation } from "@/store/features/auth/authApiSlice";
import type { RootState } from "@/store/store";

// Password requirement checker
function PasswordRequirements({ password }: { password: string }) {
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
			{requirements.map((req, _index) => (
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

export default function RegistrationPage() {
	const router = useRouter();
	// const dispatch = useDispatch<AppDispatch>(); // Removed generic dispatch
	const { loading: authLoading } = useSelector(
		(state: RootState) => state.auth,
	);
	const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [socialLoading, setSocialLoading] = useState<string | null>(null);

	const handleSocialLogin = async (provider: "google" | "github") => {
		setSocialLoading(provider);
		await signIn(provider, { callbackUrl: "/dashboard" });
	};

	const form = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const watchedPassword = form.watch("password");

	// Error handling might be different with RTK Query (it returns error object)
	// For now we keep the existing Redux state error if still used, or handle api error

	async function onSubmit(data: RegistrationFormValues) {
		try {
			const _result = await registerUser({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
			}).unwrap();

			toast.success("Account created successfully! Please login.");
			router.push("/login");
		} catch (err: unknown) {
			const error = err as { data?: { message?: string } };
			toast.error(error?.data?.message || "Registration failed");
		}
	}

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/50 p-4 w-full">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
					<div className="grid grid-cols-2 gap-4 mt-4">
						<Button
							variant="outline"
							onClick={() => handleSocialLogin("google")}
							disabled={!!socialLoading || authLoading}
						>
							{socialLoading === "google" ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Chrome className="mr-2 h-4 w-4" />
							)}
							Google
						</Button>
						<Button
							variant="outline"
							onClick={() => handleSocialLogin("github")}
							disabled={!!socialLoading || authLoading}
						>
							{socialLoading === "github" ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Github className="mr-2 h-4 w-4" />
							)}
							GitHub
						</Button>
					</div>
					<div className="relative mt-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or register with email
							</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="John" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="john@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Create a strong password"
													{...field}
												/>
												<button
													type="button"
													className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</button>
											</div>
										</FormControl>
										<PasswordRequirements password={watchedPassword || ""} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showConfirmPassword ? "text" : "password"}
													placeholder="Confirm your password"
													{...field}
												/>
												<button
													type="button"
													className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}
												>
													{showConfirmPassword ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full"
								disabled={isRegistering || !!socialLoading}
							>
								{isRegistering ? (
									<span className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										Creating account...
									</span>
								) : (
									"Create account"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary font-medium hover:underline"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
