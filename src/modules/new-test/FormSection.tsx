import { type PropsWithChildren, type ReactElement } from 'react';

export interface FormSectionProps extends PropsWithChildren {
	title: string;
	icon?: ReactElement;
}

export function FormSection({ title, icon, children }: FormSectionProps) {
	return (
		<section className="space-y-3 mb-6 pb-6 border-b border-black/20">
			<h3 className="text-sm font-semibold opacity-80 flex gap-x-2 items-center mb-4">
				<span className="w-[26px] h-[26px] rounded-xl border-[#2f2f2f] border flex items-center justify-center">
					{icon}
				</span>
				{title}
			</h3>
			{children}
		</section>
	);
}
