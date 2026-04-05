export interface Item {
	id: string;
	name: string;
	score: number;
}

const names: readonly string[] = [
	'Alpha',
	'Beta',
	'Gamma',
	'Delta',
	'Epsilon',
	'Zeta',
	'Eta',
	'Theta',
	'Iota',
	'Kappa',
	'Lambda',
	'Mu',
	'Nu',
	'Xi',
	'Omicron',
	'Pi',
	'Rho',
	'Sigma',
	'Tau',
	'Upsilon'
] as const;

export const items: readonly Item[] = names.flatMap<Item>((name, i) => [
	{ id: `${i}-a`, name: `${name} Alpha`, score: (i * 13 + 7) % 100 },
	{ id: `${i}-b`, name: `${name} Bravo`, score: (i * 17 + 29) % 100 },
	{ id: `${i}-c`, name: `${name} Charlie`, score: (i * 11 + 41) % 100 }
]);
