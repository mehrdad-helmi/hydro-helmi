import { z } from 'zod';

export const dateString = z.string().regex(/^\d{4}\/\d{1,2}\/\d{1,2}$/, {
	message: 'فرمت تاریخ باید yyyy/m/d باشد',
});

export const stepInputSchema = z.object({
	motor_speed: z.coerce.number().min(0, 'بزرگتر یا مساوی صفر'),
	flow_rate_lps: z.coerce.number().gt(0, 'باید بیشتر از صفر باشد'),
	final_water_level: z.coerce.number().min(0, 'بزرگتر یا مساوی صفر'),
	step_duration: z.coerce.number().min(0, 'بزرگتر یا مساوی صفر'),
});

export const newTestFormSchema = z.object({
	drilling_company_name: z.string().min(1, 'ضروری'),
	well_owner_name: z.string().min(1, 'ضروری'),
	well_number: z.string().min(1, 'ضروری'),
	well_location: z.string().min(1, 'ضروری'),
	well_depth: z.coerce.number().positive('مثبت'),
	pump_installation_depth: z.coerce.number().positive('مثبت'),
	static_water_level: z.coerce.number().positive('مثبت'),
	casing_diameter: z.coerce.number().positive('مثبت'),
	screen_diameter: z.coerce.number().positive('مثبت'),
	pump_diameter: z.coerce.number().positive('مثبت'),
	test_start_date: dateString,
	test_end_date: dateString,
	test_type: z.string().min(1, 'ضروری').default('پله ای'),
	motor_type: z.string().min(1, 'ضروری'),
	pump_type: z.string().min(1, 'ضروری'),
	pump_stages: z.coerce.number().positive('مثبت'),
	testing_duration: z.coerce.number().positive('مثبت'),
	test_motor_power: z.coerce.number().positive('مثبت'),
	header_note: z.string().optional().default(''),
	footnote: z.string().optional().default(''),
	steps: z.array(stepInputSchema).length(5, 'دقیقاً ۵ پله وارد کنید'),
});

export type NewTestFormValues = z.infer<typeof newTestFormSchema>;
export function getNewTestDefaults(): NewTestFormValues {
	return {
		drilling_company_name: '',
		well_owner_name: '',
		well_number: '',
		well_location: '',
		well_depth: 0,
		pump_installation_depth: 0,
		static_water_level: 0,
		casing_diameter: 6,
		screen_diameter: 6,
		pump_diameter: 6,
		test_start_date: '',
		test_end_date: '',
		test_type: 'پله‌ای',
		motor_type: '',
		pump_type: '',
		pump_stages: 0,
		testing_duration: 0,
		test_motor_power: 0,
		header_note: '',
		footnote: '',
		steps: Array.from({ length: 5 }, () => ({
			motor_speed: 0,
			flow_rate_lps: 0,
			final_water_level: 0,
			step_duration: 0,
		})),
	};
}
