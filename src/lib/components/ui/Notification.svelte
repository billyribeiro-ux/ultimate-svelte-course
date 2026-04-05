<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Avatar from './Avatar.svelte';
	import Badge from './Badge.svelte';
	import Card from './Card.svelte';

	type Level = 'info' | 'success' | 'warning' | 'danger';

	interface NotificationUser {
		name: string;
		avatarUrl: string;
	}

	interface Props extends HTMLAttributes<HTMLDivElement> {
		user: NotificationUser;
		level?: Level;
		title: string;
		children: Snippet;
	}

	const {
		user,
		level = 'info',
		title,
		children,
		...rest
	}: Props = $props();

	const badgeColor = $derived.by(() => {
		switch (level) {
			case 'success':
				return 'success' as const;
			case 'warning':
				return 'warning' as const;
			case 'danger':
				return 'danger' as const;
			case 'info':
			default:
				return 'primary' as const;
		}
	});
</script>

<div class="notification" data-level={level} {...rest}>
	<Card>
		{#snippet header()}
			<div class="head">
				<Avatar src={user.avatarUrl} alt={user.name} size={40} />
				<div class="meta">
					<strong class="name">{user.name}</strong>
					<span class="title">{title}</span>
				</div>
				<Badge label={level} color={badgeColor} size="sm" />
			</div>
		{/snippet}
		{#snippet body()}
			<div class="body">{@render children()}</div>
		{/snippet}
	</Card>
</div>

<style>
	.notification {
		display: block;

		& .head {
			display: grid;
			grid-template-columns: auto 1fr auto;
			align-items: center;
			gap: var(--space-sm);
		}

		& .meta {
			display: grid;
			gap: var(--space-2xs);
			min-inline-size: 0;
		}

		& .name {
			font-size: var(--text-base);
			line-height: var(--leading-tight);
			color: var(--color-fg);
		}

		& .title {
			font-size: var(--text-sm);
			color: var(--color-fg-muted);
		}

		& .body {
			font-size: var(--text-base);
			line-height: var(--leading-normal);
			color: var(--color-fg);
		}
	}
</style>
