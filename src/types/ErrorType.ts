export interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
	className?: string;
}

export interface ErrorCardProps {
	title?: string;
	message: string;
	onRetry?: () => void;
}

export interface PageErrorProps {
	message?: string;
	onRetry?: () => void;
}
