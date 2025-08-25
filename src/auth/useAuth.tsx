import { use } from 'react';
import { AuthCtx } from './AuthContext.ts';

export function useAuth() {
	const ctx = use(AuthCtx);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
