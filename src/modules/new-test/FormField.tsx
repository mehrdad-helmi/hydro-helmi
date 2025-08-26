import {
	Label as ShadLabel,
	Textarea,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
	UnitInput,
	type UnitInputProps,
} from '@/components/ui';
import { cn } from '@/lib';
import type { NewTestFormValues } from '@/schema';
import { Info } from 'lucide-react';
import React from 'react';
import { type Path, useFormContext } from 'react-hook-form';

export interface Option {
	value: string;
	label: string;
}

interface BaseProps {
	name: Path<NewTestFormValues>;
	label: string;
	hint?: string;
}
type InputProps = BaseProps &
	UnitInputProps & {
		type?: React.HTMLInputTypeAttribute;
		placeholder?: string;
	};
type SelectProps = BaseProps & { asSelect: true; options: Option[] };
type TextAreaProps = BaseProps & { textarea: true; rows?: number };

export type FormFieldProps = InputProps | SelectProps | TextAreaProps;

export function FormField(props: FormFieldProps) {
	const { register, getFieldState, formState } =
		useFormContext<NewTestFormValues>();
	const id = props.name;
	const { error } = getFieldState(id, formState);
	const message = error?.message;
	const common = {
		id,
		'aria-invalid': !!message,
		'aria-describedby': message ? `${id}-err` : undefined,
		tabIndex: 0,
	};

	const Label = (
		<div className="flex items-center gap-1">
			<ShadLabel htmlFor={id} className="text-sm">
				{props.label}
			</ShadLabel>
			{'hint' in props && props.hint && (
				<TooltipProvider delayDuration={150}>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								tabIndex={-1}
								className="cursor-help size-5 grid place-items-center rounded-md border border-white/15 bg-white/10"
							>
								<Info className="size-3.5" />
							</button>
						</TooltipTrigger>
						<TooltipContent side="top">{props.hint}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	);

	if ('textarea' in props && props.textarea) {
		return (
			<div className="space-y-1">
				{Label}
				<Textarea
					{...register(props.name)}
					{...common}
					rows={props.rows ?? 3}
					className="acrylic w-full rounded-md px-3 py-2"
				/>
				{message && (
					<p id={`${id}-err`} className="text-xs text-red-400">
						{message}
					</p>
				)}
			</div>
		);
	}

	const inputProps = props as InputProps;
	return (
		<div className="space-y-1">
			{Label}
			<UnitInput
				{...register(inputProps.name)}
				{...common}
				type={inputProps.type ?? 'text'}
				unit={inputProps.unit}
				unitFa={inputProps.unitFa}
				placeholder={inputProps.placeholder}
				min={0}
				className={cn(inputProps.type !== 'number' && 'ty-nums-fa')}
			/>
			{message && (
				<p id={`${id}-err`} className="text-xs text-red-400">
					{message}
				</p>
			)}
		</div>
	);
}
