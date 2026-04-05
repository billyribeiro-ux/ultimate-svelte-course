export interface Row {
	id: string;
	name: string;
	score: number;
}

function make(prefix: string, count: number, offset: number): Row[] {
	const out: Row[] = [];
	for (let i = 0; i < count; i += 1) {
		out.push({
			id: `${prefix}-${i}`,
			name: `${prefix} Row ${i + 1}`,
			score: Math.round((Math.sin(i + offset) * 0.5 + 0.5) * 1000)
		});
	}
	return out;
}

export const datasetA: Row[] = make('A', 200, 0);
export const datasetB: Row[] = make('B', 200, 7);
