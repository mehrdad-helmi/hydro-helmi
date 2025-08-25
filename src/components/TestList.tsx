import { Button } from '@/components/ui/button.tsx';
import { supabaseClient } from '@/services/supabase.ts';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface PumpingTest {
	id: string;
	well_number: string;
	drilling_company_name: string;
	test_start_date: string;
}

export function TestList() {
	const [tests, setTests] = useState<PumpingTest[]>([]);
	const [loading, setLoading] = useState(true);
	const { testId } = useParams();

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const { data, error } = await supabaseClient
				.from('pumping_tests')
				.select('id, well_number, drilling_company_name, test_start_date')
				.order('test_start_date', { ascending: false });
			if (!error && data) setTests(data);
			setLoading(false);
		};
		load();
	}, []);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">آزمایش‌ها</h3>
				<Button
					size="sm"
					variant="default"
					onClick={() => alert('ایجاد آزمایش جدید: به‌زودی')}
				>
					+ جدید
				</Button>
			</div>
			{loading ? (
				<div className="text-sm opacity-70">در حال بارگذاری…</div>
			) : tests.length === 0 ? (
				<div className="text-sm opacity-70">هنوز آزمایشی ثبت نشده است.</div>
			) : (
				<ul className="space-y-1">
					{tests.map((t) => (
						<li key={t.id}>
							<Link
								to={`/dashboard/${t.id}`}
								className={`block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground ${testId === t.id ? 'bg-accent text-accent-foreground' : ''}`}
							>
								<div className="text-sm font-medium">
									{t.well_number || t.id.slice(0, 8)}
								</div>
								<div className="text-[11px] opacity-70">
									{t.drilling_company_name}
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
