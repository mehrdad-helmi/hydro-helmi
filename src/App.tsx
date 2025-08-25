import './App.css';
import { AuthProvider } from '@/auth/AuthProvider';
import DashboardLayout from '@/layouts/DashboardLayout';
import { DashboardHome, LoginPage, TestDetailPage } from '@/pages';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />

					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<DashboardLayout />}>
							<Route index element={<DashboardHome />} />
							<Route path=":testId" element={<TestDetailPage />} />
						</Route>
					</Route>

					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="*" element={<div className="p-6">صفحه یافت نشد</div>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
