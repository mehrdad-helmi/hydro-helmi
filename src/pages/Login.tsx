import logoSq from '@/assets/images/logo-sq.svg';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from '@/components/ui';
import { supabaseClient } from '@/services/supabase.ts';
import { Eye, EyeOff } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname ?? '/dashboard';

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabaseClient.auth.signInWithPassword({
			email,
			password,
		});
		setLoading(false);
		if (error) {
			setError(error.message);
			return;
		}
		navigate(from, { replace: true });
	};

	return (
		<div className="grid min-h-screen place-items-center relative">
			<div className="flex flex-col items-center relative">
				<img src={logoSq} alt="هیدرو حلمی" className="h-56 mb-8" />
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
					<div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
				</div>
				<Card className="w-[380px] glass">
					<CardHeader>
						<CardTitle className="text-center">ورود به سامانه</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
							<div className="flex flex-col gap-y-2">
								<Label className="pr-3 text-m text-right w-full">ایمیل</Label>
								<Input
									className="acrylic"
									style={{ height: '52px' }}
									dir="ltr"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="flex flex-col gap-y-2">
								<Label className="pr-3 text-m text-right w-full">
									رمز عبور
								</Label>
								<div className="relative">
									<Input
										className="acrylic"
										dir="ltr"
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										aria-label="رمز عبور"
										style={{ height: '52px' }}
									/>
									<Button
										variant="ghost"
										type="button"
										onClick={() => setShowPassword((s) => !s)}
										className="absolute inset-y-0 right-2 my-auto p-1 rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-2"
										aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
										title={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
									>
										{showPassword ? (
											<EyeOff className="size-5" aria-hidden />
										) : (
											<Eye className="size-5" aria-hidden />
										)}
									</Button>
								</div>
							</div>
							{error && <div className="text-red-500 text-xs">{error}</div>}
							<Button
								style={{ height: '52px' }}
								size="lg"
								className="w-full"
								type="submit"
								disabled={loading}
							>
								{loading ? '...' : 'ورود'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
