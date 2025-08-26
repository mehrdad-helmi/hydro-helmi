import { buildStepAndAnalysis } from '@/lib';
import {
	getNewTestDefaults,
	newTestFormSchema,
	type NewTestFormValues,
} from '@/schema';
import { supabaseClient as supabase } from '@/services';
import { useTestsStore } from '@/store';
import type { PumpingTestsInsert } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	BadgeInfo,
	FlaskConical,
	LoaderPinwheel,
	NotepadText,
} from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormField } from './FormField';
import { FormGrid } from './FormGrid';
import { FormSection } from './FormSection';
import { StepFields } from './StepFields';

export interface NewTestFormProps {
	onSuccess: () => void;
}

export function NewTestForm({ onSuccess }: NewTestFormProps) {
	const methods = useForm({
		// ✅ make resolver generic explicit to align types
		resolver: zodResolver(newTestFormSchema),
		defaultValues: getNewTestDefaults(),
		mode: 'onBlur',
	});
	const { addTestOptimistic } = useTestsStore();
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = methods.handleSubmit(async (values: NewTestFormValues) => {
		setSubmitting(true);

		// 1) Insert pumping test (typed)
		const insertPayload: PumpingTestsInsert = {
			drilling_company_name: values.drilling_company_name,
			well_owner_name: values.well_owner_name,
			well_number: values.well_number,
			well_location: values.well_location,
			well_depth: values.well_depth,
			pump_installation_depth: values.pump_installation_depth,
			static_water_level: values.static_water_level,
			casing_diameter: values.casing_diameter,
			screen_diameter: values.screen_diameter,
			pump_diameter: values.pump_diameter,
			test_start_date: values.test_start_date,
			test_end_date: values.test_end_date,
			test_type: values.test_type,
			motor_type: values.motor_type,
			pump_type: values.pump_type,
			pump_stages: values.pump_stages,
			testing_duration: values.testing_duration,
			test_motor_power: values.test_motor_power,
			header_note: values.header_note ?? '',
			footnote: values.footnote ?? '',
			// user_id is filled by DB default auth.uid()
		};

		const { data: insertedTest, error: insertTestErr } = await supabase
			.from('pumping_tests')
			.insert(insertPayload)
			.select('id, well_number, drilling_company_name, test_start_date')
			.single();

		if (insertTestErr || !insertedTest) {
			toast.error(insertTestErr?.message ?? 'خطا در ایجاد آزمایش');
			setSubmitting(false);
			return;
		}

		const pumpingTestId = insertedTest.id;

		// 2) Build steps + analysis on client (typed)
		const { steps, analysis } = buildStepAndAnalysis(values, pumpingTestId);

		// 3) Insert steps (typed)
		const { error: stepsErr } = await supabase.from('step_tests').insert(steps); // already typed, cast ensures exact Insert[]

		if (stepsErr) {
			toast.error(stepsErr.message);
			setSubmitting(false);
			return;
		}

		// 4) Insert analysis (typed)
		const { error: analysisErr } = await supabase
			.from('test_analyses')
			.insert(analysis);

		if (analysisErr) {
			toast.error(analysisErr.message);
			setSubmitting(false);
			return;
		}

		// 5) Optimistic update list + success toast
		addTestOptimistic({
			id: pumpingTestId,
			well_number: insertedTest.well_number,
			drilling_company_name: insertedTest.drilling_company_name,
			test_start_date: insertedTest.test_start_date,
		});

		toast.success('آزمایش با موفقیت ایجاد شد.');
		methods.reset(getNewTestDefaults());
		setSubmitting(false);
		onSuccess();
	});

	const iconStyle = {
		color: '#2f2f2f',
		size: 18,
	};

	return (
		<form
			id="new-test-form"
			onSubmit={onSubmit}
			className="space-y-8"
			aria-busy={submitting}
		>
			<FormProvider {...methods}>
				<FormSection
					icon={<BadgeInfo size={iconStyle.size} color={iconStyle.color} />}
					title="اطلاعات و مشخصات کلی چاه"
				>
					<FormGrid cols={2}>
						<FormField name="drilling_company_name" label="شرکت حفار" />
						<FormField name="well_owner_name" label="نام مالک" />
					</FormGrid>
					<FormGrid cols={2}>
						<FormField name="well_number" label="شماره چاه" />
						<FormField name="well_location" label="موقعیت" />
					</FormGrid>
					<FormGrid cols={3}>
						<FormField
							name="well_depth"
							label="عمق چاه"
							unit="m"
							unitFa="متر"
							type="number"
						/>
						<FormField
							name="pump_installation_depth"
							label="عمق نصب پمپ"
							unit="m"
							unitFa="متر"
							type="number"
						/>
						<FormField
							name="static_water_level"
							label="سطح ایستایی"
							unit="m"
							unitFa="متر (از سطح زمین)"
							type="number"
						/>
						<FormField
							name="casing_diameter"
							label="قطر لوله جداره"
							unit="in"
							unitFa="اینچ"
							type="number"
						/>
						<FormField
							name="screen_diameter"
							label="قطر لوله آبده"
							unit="in"
							unitFa="اینچ"
							type="number"
						/>
						<FormField
							name="pump_diameter"
							label="قطر پمپ"
							unit="in"
							unitFa="اینچ"
							type="number"
						/>
					</FormGrid>
				</FormSection>

				<FormSection
					icon={<FlaskConical size={iconStyle.size} color={iconStyle.color} />}
					title="مشخصات کلی آزمایش"
				>
					<FormGrid cols={3}>
						<FormField
							name="test_start_date"
							label="تاریخ شروع آزمایش"
							hint="فرمت: 1403/5/2"
							placeholder="YYYY/M/D"
						/>
						<FormField
							name="test_end_date"
							label="تاریخ خاتمه آزمایش"
							hint="فرمت: 1403/5/3"
							placeholder="YYYY/M/D"
						/>
						<FormField name="test_type" label="نوع آزمایش" />
						<FormField name="motor_type" label="نوع موتور" />
						<FormField name="pump_type" label="نوع پمپ" />
						<FormField
							name="pump_stages"
							label="تعداد طبقات پمپ"
							type="number"
						/>
						<FormField
							name="testing_duration"
							label="مدت شستشو و آزمایش"
							unit="hr"
							unitFa="ساعت"
							type="number"
						/>
						<FormField
							name="test_motor_power"
							label="قدرت موتور آزمایشی"
							unit="hp"
							unitFa="اسب بخار"
							type="number"
						/>
					</FormGrid>
				</FormSection>

				<FormSection
					icon={
						<LoaderPinwheel size={iconStyle.size} color={iconStyle.color} />
					}
					title="برداشت‌های حاصل از آزمایش (۵ پله)"
				>
					<div className="space-y-4">
						{Array.from({ length: 5 }, (_, i) => (
							<StepFields key={i} index={i} />
						))}
					</div>
				</FormSection>

				<FormSection
					icon={<NotepadText size={iconStyle.size} color={iconStyle.color} />}
					title="توضیحات"
				>
					<FormField name="footnote" label="پانویس" textarea rows={2} />
					<FormField
						name="header_note"
						label="توضیحات سربرگ"
						textarea
						rows={10}
					/>
				</FormSection>
			</FormProvider>
		</form>
	);
}
