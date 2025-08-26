import type { PropsWithChildren } from 'react';

export interface FormGridProps extends PropsWithChildren {
	cols?: 2 | 3 | 4;
}

export function FormGrid({ cols = 3, children }: FormGridProps) {
	const mdCols =
		cols === 4
			? 'md:grid-cols-4'
			: cols === 2
				? 'md:grid-cols-2'
				: 'md:grid-cols-3';
	return (
		<div className={`grid gap-3 sm:grid-cols-2 ${mdCols}`}>{children}</div>
	);
}
