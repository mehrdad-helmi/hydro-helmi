import {
	Input,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui';
import React, { forwardRef } from 'react';

export interface UnitInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	unit?: string;
	unitFa?: string;
}

export const UnitInput = forwardRef<HTMLInputElement, UnitInputProps>(
	({ unit, unitFa, className = '', ...rest }, ref) => (
		<div className="relative overflow-hidden">
			<Input ref={ref} className={`pr-2 pl-16 ${className}`} {...rest} />
			{unit && (
				<div className="w-[36px] h-full border-r pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center bg-black/10 rounded-tl-md rounded-bl-md cursor-help">
					<TooltipProvider delayDuration={200}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="pointer-events-auto rounded-md border border-white/15 bg-white/10 px-2 text-xs opacity-90 backdrop-blur-sm">
									{unit}
								</div>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<span>{unitFa}</span>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			)}
		</div>
	),
);
