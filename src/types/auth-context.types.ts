import type { Session, User } from '@supabase/supabase-js';

export interface AuthState {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signOut: () => Promise<void>;
}
