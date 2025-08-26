import { useAuth } from '@/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
	const { session, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="grid min-h-screen place-items-center">
				در حال بارگذاری…
			</div>
		);
	}

	if (!session) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return <Outlet />;
}
