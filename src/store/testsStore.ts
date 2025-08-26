import { supabaseClient as supabase } from '@/services';
import { create } from 'zustand';

export interface PumpingTestListItem {
	id: string;
	well_number: string | null;
	drilling_company_name: string | null;
	test_start_date: string | null;
}

interface TestsState {
	tests: { items: PumpingTestListItem[]; loading: boolean };
	openNewDialog: boolean;
	setOpenNewDialog: (v: boolean) => void;
	fetchTests: () => Promise<void>;
	addTestOptimistic: (t: PumpingTestListItem) => void;
}

export const useTestsStore = create<TestsState>((set) => ({
	tests: { items: [], loading: false },
	openNewDialog: false,
	setOpenNewDialog: (v) => set({ openNewDialog: v }),
	fetchTests: async () => {
		set((state) => ({ tests: { ...state.tests, loading: true } }));
		const { data } = await supabase
			.from('pumping_tests')
			.select('id, well_number, drilling_company_name, test_start_date')
			.order('test_start_date', { ascending: false });
		set({
			tests: { items: (data as PumpingTestListItem[]) ?? [], loading: false },
		});
	},
	addTestOptimistic: (t) =>
		set((state) => ({
			tests: { items: [t, ...state.tests.items], loading: false },
		})),
}));
