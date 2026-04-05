<script lang="ts">
	type BadgeColor = 'neutral' | 'success' | 'warning' | 'danger' | 'primary';
	type BadgeSize = 'sm' | 'md' | 'lg';

	interface Props {
		label: string;
		color?: BadgeColor;
		size?: BadgeSize;
		rounded?: boolean;
	}

	const {
		label,
		color = 'neutral',
		size = 'md',
		rounded = true
	}: Props = $props();
</script>

<span class="badge" data-color={color} data-size={size} data-rounded={rounded}>
	{label}
</span>

<style>
	.badge {
		--badge-bg: var(--color-surface-2);
		--badge-fg: var(--color-fg);
		--badge-border: var(--color-border);
		--badge-pad-block: var(--space-2xs);
		--badge-pad-inline: var(--space-sm);
		--badge-font: var(--text-sm);
		--badge-radius: var(--radius-full);

		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding-block: var(--badge-pad-block);
		padding-inline: var(--badge-pad-inline);
		font-size: var(--badge-font);
		font-weight: 600;
		line-height: var(--leading-tight);
		color: var(--badge-fg);
		background-color: var(--badge-bg);
		border: 1px solid var(--badge-border);
		border-radius: var(--badge-radius);
		white-space: nowrap;

		&[data-color='neutral'] {
			--badge-bg: var(--color-surface-2);
			--badge-fg: var(--color-fg);
			--badge-border: var(--color-border);
		}

		&[data-color='primary'] {
			--badge-bg: var(--color-primary);
			--badge-fg: var(--color-primary-contrast);
			--badge-border: transparent;
		}

		&[data-color='success'] {
			--badge-bg: color-mix(in oklch, var(--color-success) 20%, var(--color-surface));
			--badge-fg: var(--color-fg);
			--badge-border: var(--color-success);
		}

		&[data-color='warning'] {
			--badge-bg: color-mix(in oklch, var(--color-warning) 22%, var(--color-surface));
			--badge-fg: var(--color-fg);
			--badge-border: var(--color-warning);
		}

		&[data-color='danger'] {
			--badge-bg: var(--color-danger);
			--badge-fg: var(--color-primary-contrast);
			--badge-border: transparent;
		}

		&[data-size='sm'] {
			--badge-pad-block: var(--space-2xs);
			--badge-pad-inline: var(--space-xs);
			--badge-font: var(--text-xs);
		}

		&[data-size='md'] {
			--badge-pad-block: var(--space-2xs);
			--badge-pad-inline: var(--space-sm);
			--badge-font: var(--text-sm);
		}

		&[data-size='lg'] {
			--badge-pad-block: var(--space-xs);
			--badge-pad-inline: var(--space-md);
			--badge-font: var(--text-base);
		}

		&[data-rounded='false'] {
			--badge-radius: var(--radius-sm);
		}
	}
</style>
