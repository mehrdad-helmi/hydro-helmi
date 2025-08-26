export const roundN = (n: number, d: number): number =>
	Number.isFinite(n) ? Number(n.toFixed(d)) : 0;
export const round1 = (n: number) => roundN(n, 1);
export const round2 = (n: number) => roundN(n, 2);
export const round3 = (n: number) => roundN(n, 3);
export const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);

export function linearRegression(
	xs: number[],
	ys: number[],
): { a: number; b: number } {
	const n = xs.length;
	let sumx = 0,
		sumy = 0,
		sumxy = 0,
		sumxx = 0;
	for (let i = 0; i < n; i++) {
		const x = xs[i],
			y = ys[i];
		sumx += x;
		sumy += y;
		sumxy += x * y;
		sumxx += x * x;
	}
	const b = (n * sumxy - sumx * sumy) / (n * sumxx - sumx * sumx);
	const a = (sumy - b * sumx) / n;
	return { a, b };
}
