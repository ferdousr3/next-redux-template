export interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export interface LoadingButtonProps {
	loading: boolean;
	children: React.ReactNode;
	className?: string;
}

export interface PageLoadingProps {
	message?: string;
}

export interface TableLoadingProps {
	columns?: number;
	rows?: number;
}
