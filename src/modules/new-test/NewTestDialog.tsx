import { Button } from '@/components/ui/button.tsx';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card.tsx';
import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from '@/components/ui/dialog.tsx';
import { NewTestForm } from './NewTestForm';

export interface NewTestDialogProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
}

export function NewTestDialog({ open, onOpenChange }: NewTestDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogPortal>
				<DialogOverlay className="fixed bg-black/5 backdrop-blur-sm inset-0" />
				<DialogContent className="max-h-[85vh] min-w-[min(800px,88vw)] overflow-auto p-0">
					<Card className="border-0 bg-card">
						<DialogTitle>
							<CardHeader className="border-b text-left">
								<CardTitle>آزمایش جدید</CardTitle>
							</CardHeader>
						</DialogTitle>
						<CardContent className="p-4">
							<NewTestForm onSuccess={() => onOpenChange(false)} />
						</CardContent>
						<CardFooter className="gap-2 justify-end border-t">
							<Button
								variant="default"
								form="new-test-form"
								type="submit"
								size="lg"
							>
								ثبت
							</Button>
							<Button
								onClick={() => onOpenChange(false)}
								variant="secondary"
								size="lg"
							>
								انصراف
							</Button>
						</CardFooter>
					</Card>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
}
