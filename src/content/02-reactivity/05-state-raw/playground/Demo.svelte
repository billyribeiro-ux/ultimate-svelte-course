<script lang="ts">
	import { datasetA, datasetB, type Row } from './datasets';

	let rows: Row[] = $state.raw<Row[]>(datasetA);
	let active: 'A' | 'B' = $state<'A' | 'B'>('A');

	function loadA(): void {
		rows = datasetA;
		active = 'A';
	}

	function loadB(): void {
		rows = datasetB;
		active = 'B';
	}
</script>

<section class="panel">
	<header class="header">
		<h3>Data table ({rows.length} rows)</h3>
		<div class="controls">
			<button type="button" class="btn" class:active={active === 'A'} onclick={loadA}>
				Dataset A
			</button>
			<button type="button" class="btn" class:active={active === 'B'} onclick={loadB}>
				Dataset B
			</button>
		</div>
	</header>

	<div class="scroll">
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.id)}
					<tr>
						<td>{row.id}</td>
						<td>{row.name}</td>
						<td>{row.score}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.panel {
		display: grid;
		gap: var(--space-sm);
		padding: var(--space-md);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-fg);

		& .header {
			display: grid;
			gap: var(--space-sm);

			@media (min-width: 640px) {
				grid-template-columns: 1fr auto;
				align-items: center;
			}

			& h3 {
				margin: 0;
				font-size: var(--text-lg);
			}
		}

		& .controls {
			display: flex;
			gap: var(--space-xs);
		}

		& .btn {
			padding-block: var(--space-xs);
			padding-inline: var(--space-sm);
			font: inherit;
			color: var(--color-fg);
			background-color: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			cursor: pointer;
			transition: background-color var(--dur-fast) var(--ease-out);

			&.active {
				color: var(--color-primary-contrast);
				background-color: var(--color-primary);
				border-color: var(--color-primary);
			}

			&:focus-visible {
				outline: 2px solid var(--color-focus);
				outline-offset: 2px;
			}
		}

		& .scroll {
			max-block-size: 20rem;
			overflow: auto;
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
		}

		& .table {
			inline-size: 100%;
			border-collapse: collapse;
			font-size: var(--text-sm);
			font-variant-numeric: tabular-nums;

			& th,
			& td {
				padding-block: var(--space-xs);
				padding-inline: var(--space-sm);
				text-align: start;
				border-block-end: 1px solid var(--color-border);
			}

			& thead {
				position: sticky;
				inset-block-start: 0;
				background-color: var(--color-surface-2);
			}

			& th {
				color: var(--color-fg-muted);
				font-weight: 600;
			}
		}
	}
</style>
