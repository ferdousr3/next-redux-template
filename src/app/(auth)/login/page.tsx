"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Chrome, Eye, EyeOff, Github, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { clearError, login } from "@/lib/features/auth/slice";
import { type LoginFormValues, loginSchema } from "@/schemas/auth.schema";
import type { AppDispatch, RootState } from "@/store/store";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const {
		loading: authLoading,
		error,
		isAuthenticated,
	} = useSelector((state: RootState) => state.auth);
	const callbackUrl = searchParams.get("from") || "/dashboard";
	const [showPassword, setShowPassword] = useState(false);
	const [socialLoading, setSocialLoading] = useState<string | null>(null);

	const handleSocialLogin = async (provider: "google" | "github") => {
		setSocialLoading(provider);
		await signIn(provider, { callbackUrl });
	};

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	/* ... existing useEffects ... */
	useEffect(() => {
		if (isAuthenticated) {
			router.push(callbackUrl);
		}
	}, [isAuthenticated, router, callbackUrl]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearError());
		}
	}, [error, dispatch]);

	async function onSubmit(data: LoginFormValues) {
		const result = await dispatch(login(data));
		if (login.fulfilled.match(result)) {
			toast.success("Welcome back!");
		}
	}

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/50 p-4 w-full">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
					<CardDescription>
						Enter your credentials to access your account
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
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
												<Input
													type="email"
													placeholder="john@example.com"
													className="pl-10"
													{...field}
												/>
											</div>
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
												<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													className="pl-10 pr-10"
													{...field}
												/>
												<button
													type="button"
													className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end">
								<Link
									href="/forgot-password"
									className="text-sm text-primary hover:underline font-medium"
								>
									Forgot password?
								</Link>
							</div>
							<Button
								type="submit"
								className="w-full"
								disabled={authLoading || !!socialLoading}
							>
								{authLoading ? (
									<span className="flex items-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										Signing in...
									</span>
								) : (
									"Sign in"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link
							href="/register"
							className="text-primary font-medium hover:underline"
						>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
