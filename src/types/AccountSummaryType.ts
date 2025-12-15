export interface AccountSummaryProps {
	user?: {
		firstName?: string;
		lastName?: string;
		email?: string;
	} | null;
	totalItems: number;
}
