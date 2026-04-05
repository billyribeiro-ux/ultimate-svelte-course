<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		size?: number;
	}

	const { src, alt, size = 48 }: Props = $props();
</script>

<img class="avatar" {src} {alt} style="--avatar-size: {size}px" />

<style>
	.avatar {
		inline-size: var(--avatar-size, 3rem);
		block-size: var(--avatar-size, 3rem);
		border-radius: var(--radius-full);
		object-fit: cover;
		background-color: var(--color-surface-2);
		border: 1px solid var(--color-border);
		display: inline-block;
	}
</style>
