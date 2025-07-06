import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });
	const year = date.getFullYear();
	return { day, month, year };
}
