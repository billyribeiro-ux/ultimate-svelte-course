module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']
		],
		'scope-enum': [
			2,
			'always',
			[
				'phase-0',
				'phase-1',
				'phase-2',
				'phase-3',
				'phase-4',
				'phase-5',
				'phase-6',
				'phase-7',
				'phase-8',
				'phase-9',
				'phase-10',
				'phase-11',
				'phase-12',
				'phase-13',
				'phase-14',
				'm1',
				'm2',
				'm3',
				'm4',
				'm5',
				'm6',
				'm7',
				'm8',
				'm9a',
				'm9b',
				'm10',
				'm11',
				'm12',
				'm13',
				'capstone',
				'shell',
				'tauri',
				'deps',
				'ci',
				'tests',
				'docs'
			]
		],
		'scope-empty': [0],
		'subject-case': [0],
		'body-max-line-length': [0],
		'footer-max-line-length': [0]
	}
};
