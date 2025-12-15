export interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void | Promise<void>;
	loading?: boolean;
	variant?: "default" | "destructive";
}

export interface DeleteConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	itemName?: string;
	onConfirm: () => void | Promise<void>;
	loading?: boolean;
}
