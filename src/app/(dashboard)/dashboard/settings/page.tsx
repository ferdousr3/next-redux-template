"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChangePasswordForm } from "@/components/settings/ChangePasswordForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authApi } from "@/lib/features/auth/api";
import type { ChangePasswordFormValues } from "@/schemas/auth.schema";

export default function SettingsPage() {
	const [loading, setLoading] = useState(false);

	async function onSubmit(data: ChangePasswordFormValues) {
		setLoading(true);
		try {
			await authApi.changePassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
			});
			toast.success("Password changed successfully!");
		} catch (error: unknown) {
			const err = error as { response?: { data?: { message?: string } } };
			toast.error(err.response?.data?.message || "Failed to change password");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-500 mt-1">Manage your account settings</p>
			</div>

			<Card className="max-w-xl">
				<CardHeader>
					<CardTitle>Change Password</CardTitle>
					<CardDescription>
						Update your password to keep your account secure
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChangePasswordForm onSubmit={onSubmit} loading={loading} />
				</CardContent>
			</Card>
		</div>
	);
}
