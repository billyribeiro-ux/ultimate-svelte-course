/**
 * Canonical component test for `ProgressBar.svelte`.
 *
 * Demonstrates:
 *  - rendering a Svelte 5 component with typed props
 *  - querying by ARIA role
 *  - asserting inline styles / custom attributes
 *  - clamping edge cases (value outside [0, 1])
 */
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ProgressBar from './ProgressBar.svelte';

function getFill(progressbar: HTMLElement): HTMLElement {
	const fill = progressbar.querySelector<HTMLElement>('.fill');
	if (fill === null) throw new Error('ProgressBar: .fill element not found');
	return fill;
}

describe('ProgressBar', () => {
	it('renders with value=0 showing 0% width', () => {
		render(ProgressBar, { props: { value: 0 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuenow', '0');
		expect(getFill(bar).style.inlineSize).toBe('0%');
	});

	it('renders with value=0.5 showing 50% width', () => {
		render(ProgressBar, { props: { value: 0.5 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuenow', '50');
		expect(getFill(bar).style.inlineSize).toBe('50%');
	});

	it('renders with value=1 showing 100% width', () => {
		render(ProgressBar, { props: { value: 1 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuenow', '100');
		expect(getFill(bar).style.inlineSize).toBe('100%');
	});

	it('clamps value > 1 to 100%', () => {
		render(ProgressBar, { props: { value: 2.5 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuenow', '100');
		expect(getFill(bar).style.inlineSize).toBe('100%');
	});

	it('clamps value < 0 to 0%', () => {
		render(ProgressBar, { props: { value: -0.5 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuenow', '0');
		expect(getFill(bar).style.inlineSize).toBe('0%');
	});

	it('exposes aria-valuemin=0 and aria-valuemax=100', () => {
		render(ProgressBar, { props: { value: 0.3 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-valuemin', '0');
		expect(bar).toHaveAttribute('aria-valuemax', '100');
	});

	it('uses a default aria-label when no label prop is provided', () => {
		render(ProgressBar, { props: { value: 0.25 } });
		const bar = screen.getByRole('progressbar');
		expect(bar).toHaveAttribute('aria-label', 'Progress');
	});

	it('uses the provided label as aria-label', () => {
		render(ProgressBar, { props: { value: 0.4, label: 'Module 2 progress' } });
		const bar = screen.getByRole('progressbar', { name: 'Module 2 progress' });
		expect(bar).toHaveAttribute('aria-label', 'Module 2 progress');
		expect(bar).toHaveAttribute('aria-valuenow', '40');
	});
});
