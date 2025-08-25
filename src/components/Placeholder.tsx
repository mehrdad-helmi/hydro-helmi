export function Placeholder({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="glass p-8 text-center opacity-90">
				<h2 className="text-xl font-bold mb-2">{title}</h2>
				{description && <p className="text-sm opacity-80">{description}</p>}
			</div>
		</div>
	);
}
