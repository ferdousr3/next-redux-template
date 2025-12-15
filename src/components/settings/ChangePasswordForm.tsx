"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
	type ChangePasswordFormValues,
	changePasswordSchema,
} from "@/schemas/auth.schema";
import { PasswordRequirements } from "../auth/PasswordRequirements";

interface ChangePasswordFormProps {
	onSubmit: (data: ChangePasswordFormValues) => Promise<void>;
	loading: boolean;
}

export function ChangePasswordForm({
	onSubmit,
	loading,
}: ChangePasswordFormProps) {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
		mode: "onChange",
	});

	const watchedNewPassword = form.watch("newPassword");

	const handleSubmit = async (data: ChangePasswordFormValues) => {
		await onSubmit(data);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="currentPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showCurrentPassword ? "text" : "password"}
										placeholder="Enter current password"
										{...field}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									>
										{showCurrentPassword ? (
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
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showNewPassword ? "text" : "password"}
										placeholder="Enter new password"
										{...field}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										onClick={() => setShowNewPassword(!showNewPassword)}
									>
										{showNewPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</FormControl>
							<PasswordRequirements password={watchedNewPassword || ""} />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Confirm new password"
										{...field}
									/>
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
				<Button type="submit" disabled={loading}>
					{loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
					{loading ? "Changing Password..." : "Change Password"}
				</Button>
			</form>
		</Form>
	);
}
