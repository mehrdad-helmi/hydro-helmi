import { supabaseClient } from '@/services';
import type { PumpingTestsRow } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function TestDetailPage() {
	const { testId } = useParams();
	const [data, setData] = useState<PumpingTestsRow>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			if (!testId) return;
			setLoading(true);
			const { data, error } = await supabaseClient
				.from('pumping_tests')
				.select('*')
				.eq('id', testId)
				.single();
			if (!error) setData(data);
			setLoading(false);
		};
		load();
	}, [testId]);

	if (loading) return <div>در حال بارگذاری…</div>;
	if (!data) return <div>یافت نشد.</div>;

	return (
		<div className="space-y-4">
			<h1 className="text-xl font-bold">
				آزمایش #{data.well_number ?? data.id}
			</h1>
			<pre
				className="rounded-xl border p-4 bg-muted/30 overflow-auto text-xs"
				dir="ltr"
			>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
}
