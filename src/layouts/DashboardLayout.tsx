import logoVert from '@/assets/images/logo-vert.svg';
import { useAuth } from '@/auth';
import { TestList } from '@/components';
import { Button } from '@/components/ui';
import { supabaseClient } from '@/services/supabase.ts';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
	return (
		<div className="min-h-screen grid grid-rows-[auto_1fr_auto] gap-3 p-3">
			<Header />
			<div className="grid grid-cols-[280px_1fr] gap-3">
				<aside className="glass p-4 overflow-auto">
					<TestList />
				</aside>
				<main className="glass p-4 overflow-auto">
					<Outlet />
				</main>
			</div>
			<Footer />
		</div>
	);
}

function Header() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await supabaseClient.auth.signOut();
		navigate('/login', { replace: true });
	};

	return (
		<header className="sticky top-3 z-20">
			<div className="glass mx-auto flex items-center justify-between px-4 py-3">
				<div className="flex items-center gap-3">
					<img src={logoVert} alt="Vertical Logo" className="h-[40px]" />
				</div>
				<div className="flex items-center gap-3 text-sm">
					<span className="opacity-80">{user?.email}</span>
					<Button variant="secondary" onClick={handleLogout}>
						خروج
					</Button>
				</div>
			</div>
		</header>
	);
}

function Footer() {
	return (
		<footer className="sticky bottom-3">
			<div className="glass mx-auto px-4 py-2 text-xs opacity-80 text-center">
				© {new Date().getFullYear()} — همه حقوق محفوظ است
			</div>
		</footer>
	);
}
