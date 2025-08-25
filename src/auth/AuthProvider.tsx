import {
	getCurrentSession,
	onAuthChanged,
	type Session,
	signOut,
	type User,
} from '@/services/supabase';
import type { AuthState } from '@/types';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthCtx } from './AuthContext.ts';

export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unsub: { data: { subscription: { unsubscribe: () => void } } } | null =
			null;
		(async () => {
			const s = await getCurrentSession();
			setSession(s);
			setUser(s?.user ?? null);
			setLoading(false);
			unsub = onAuthChanged((_e, sess) => {
				setSession(sess);
				setUser(sess?.user ?? null);
			});
		})();
		return () => {
			unsub?.data.subscription.unsubscribe();
		};
	}, []);

	const value = useMemo<AuthState>(
		() => ({
			user,
			session,
			loading,
			signOut: async () => {
				await signOut();
			},
		}),
		[user, session, loading],
	);

	return <AuthCtx value={value}>{children}</AuthCtx>;
}
