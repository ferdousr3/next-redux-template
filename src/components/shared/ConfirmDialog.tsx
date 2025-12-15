import { Loader2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type {
	ConfirmDialogProps,
	DeleteConfirmDialogProps,
} from "@/types/ConfirmDialogType";

export function ConfirmDialog({
	open,
	onOpenChange,
	title = "Are you sure?",
	description = "This action cannot be undone.",
	confirmText = "Continue",
	cancelText = "Cancel",
	onConfirm,
	loading = false,
	variant = "default",
}: ConfirmDialogProps) {
	const handleConfirm = async () => {
		await onConfirm();
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						disabled={loading}
						className={
							variant === "destructive"
								? "bg-destructive hover:bg-destructive/90"
								: ""
						}
					>
						{loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function DeleteConfirmDialog({
	open,
	onOpenChange,
	itemName = "this item",
	onConfirm,
	loading = false,
}: DeleteConfirmDialogProps) {
	return (
		<ConfirmDialog
			open={open}
			onOpenChange={onOpenChange}
			title="Delete Confirmation"
			description={`Are you sure you want to delete ${itemName}? This action cannot be undone.`}
			confirmText="Delete"
			onConfirm={onConfirm}
			loading={loading}
			variant="destructive"
		/>
	);
}
