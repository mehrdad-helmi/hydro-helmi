import {
	type AuthChangeEvent,
	createClient,
	type Session,
	type SupabaseClient,
	type User,
} from '@supabase/supabase-js';

// Define a lightweight Database type for generics (extend later when tables are defined)
type Database = object;

// Environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
	| string
	| undefined;

if (!supabaseUrl || !supabaseAnonKey) {
	// Soft warn to console to avoid crash during build if env not provided
	// The app should still compile; runtime features that depend on auth will show an error state.
	console.warn(
		'[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Auth will not work until they are set.',
	);
}

export const supabaseClient: SupabaseClient<Database> = createClient<Database>(
	supabaseUrl ?? '',
	supabaseAnonKey ?? '',
);

export type { Session, User };

export async function signInWithEmail({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{ user: User | null; session: Session | null }> {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return { user: data.user, session: data.session };
}

export async function signOut(): Promise<void> {
	const { error } = await supabaseClient.auth.signOut();
	if (error) throw error;
}

export async function getCurrentSession(): Promise<Session | null> {
	const { data } = await supabaseClient.auth.getSession();
	return data.session;
}

export function onAuthChanged(
	cb: (event: AuthChangeEvent, session: Session | null) => void,
) {
	return supabaseClient.auth.onAuthStateChange((event, session) =>
		cb(event, session),
	);
}
