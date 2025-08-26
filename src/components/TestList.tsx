import { Button } from '@/components/ui/button';
import { NewTestDialog } from '@/modules/new-test';
import { useTestsStore } from '@/store/testsStore';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export function TestList() {
	const { testId } = useParams();
	const { tests, fetchTests, openNewDialog, setOpenNewDialog } =
		useTestsStore();

	useEffect(() => {
		fetchTests();
	}, [fetchTests]);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold">آزمایش‌ها</h3>
				<Button
					size="lg"
					variant="default"
					onClick={() => setOpenNewDialog(true)}
				>
					+ جدید
				</Button>
			</div>

			{tests.loading ? (
				<div className="text-sm opacity-70">در حال بارگذاری…</div>
			) : tests.items.length === 0 ? (
				<div className="text-sm opacity-70">هنوز آزمایشی ثبت نشده است.</div>
			) : (
				<ul className="space-y-1">
					{tests.items.map((t) => (
						<li key={t.id}>
							<Link
								to={`/dashboard/${t.id}`}
								className={`block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground ${testId === t.id ? 'bg-accent text-accent-foreground' : ''}`}
							>
								<div className="text-sm font-medium">
									{t.well_number ?? t.id.slice(0, 8)}
								</div>
								<div className="text-[11px] opacity-70">
									{t.drilling_company_name}
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}

			<NewTestDialog open={openNewDialog} onOpenChange={setOpenNewDialog} />
		</div>
	);
}
