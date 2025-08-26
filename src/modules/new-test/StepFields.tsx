import { ChevronLeft } from 'lucide-react';
import { FormField } from './FormField';

export interface StepFieldsProps {
	index: number;
}

export function StepFields({ index }: StepFieldsProps) {
	const base = `steps.${index}.` as const;

	const stepName = {
		1: 'اول',
		2: 'دوم',
		3: 'سوم',
		4: 'چهارم',
		5: 'پنجم',
	};

	return (
		<fieldset className="p-4 rounded-xl border border-black/15 flex flex-col">
			<legend className="px-2 py-1 text-sm opacity-80 flex gap-x-1 bg-white border rounded">
				پله‌ی {stepName[index + 1]}
				<ChevronLeft size={18} />
			</legend>
			<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
				<FormField
					name={`${base}motor_speed`}
					label="دور موتور"
					unit="rpm"
					unitFa="دور بر دقیقه"
					type="number"
				/>
				<FormField
					name={`${base}flow_rate_lps`}
					label="دبی"
					unit="L/s"
					unitFa="لیتر بر ثانیه"
					type="number"
				/>
				<FormField
					name={`${base}final_water_level`}
					label="آخرین قرائت سطح آب"
					unit="m"
					unitFa="متر (از سطح زمین)"
					type="number"
				/>
				<FormField
					name={`${base}step_duration`}
					label="زمان آخرین قرائت"
					unit="min"
					unitFa="دقیقه"
					type="number"
				/>
			</div>
		</fieldset>
	);
}
