import { linearRegression, safeDiv } from '@/lib/math.ts';
import type { NewTestFormValues } from '@/schema';
import type { StepTestsInsert, TestAnalysesInsert } from '@/types';

export function buildStepAndAnalysis(
	values: NewTestFormValues,
	id: string,
): { steps: StepTestsInsert[]; analysis: TestAnalysesInsert } {
	const q_m3h = values.steps.map((s) => s.flow_rate_lps * 3.6);
	const dd = values.steps.map(
		(s) => s.final_water_level - values.static_water_level,
	);
	const trueSpec = q_m3h.map((q, i) => safeDiv(dd[i], q), 4);

	const { a: A, b: B } = linearRegression(q_m3h, trueSpec);

	const maxQ = Math.max(...values.steps.map((s) => s.flow_rate_lps));
	const dyn = Math.max(...values.steps.map((s) => s.final_water_level));
	const dynMinusStatic = dyn - values.static_water_level;
	const wdf = safeDiv(B, A) * 100;

	const steps: StepTestsInsert[] = values.steps.map((s, i) => {
		const aquifer = q_m3h[i] * A;
		const well = B * Math.pow(q_m3h[i], 2);
		const total = aquifer + well;
		const spec = safeDiv(total, q_m3h[i]);
		const capacity = safeDiv(1, spec);
		const efficiency = safeDiv(aquifer * 100, total);
		return {
			pumping_test_id: id,
			step_number: i + 1,
			motor_speed: s.motor_speed,
			flow_rate_lps: s.flow_rate_lps,
			flow_rate_m3h: q_m3h[i],
			final_water_level: s.final_water_level,
			step_duration: s.step_duration,
			drawdown: dd[i],
			true_specific_drawdown: trueSpec[i],
			aquifer_drawdown: aquifer,
			well_drawdown: well,
			total_drawdown: total,
			specific_drawdown: spec,
			specific_capacity: capacity,
			efficiency_percent: efficiency,
		};
	});

	const analysis: TestAnalysesInsert = {
		pumping_test_id: id,
		maximum_permissible_discharge: maxQ,
		dynamic_water_level: dyn,
		dynamic_minus_static: dynMinusStatic,
		aquifer_loss_coefficient: A,
		well_loss_coefficient: B,
		wdf: wdf,
	};

	return { steps, analysis };
}
