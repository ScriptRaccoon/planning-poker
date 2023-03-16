<script lang="ts">
	import { scale, fade } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import type { member } from "$lib/types";

	export let member: member;
	export let estimates_revealed: boolean;
</script>

{#if estimates_revealed}
	<span
		class="estimate"
		in:scale|local={{
			duration: 400,
			easing: backOut,
		}}
		out:fade={{ duration: 200 }}
	>
		{@html member.estimate ?? "&ndash;"}
	</span>
{:else}
	<span
		in:fade={{ duration: 200, delay: 210 }}
		aria-label={member.estimate != null
			? "Estimated"
			: "Not estimated"}
		class="circle"
		class:estimated={member.estimate != null}
	/>
{/if}

<style lang="scss">
	.circle {
		display: inline-block;
		width: 1.2rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: var(--secondary-color);
		transform: translateY(0.1rem);

		&.estimated {
			background-color: var(--primary-color);
		}
	}

	.estimate {
		color: var(--primary-color);
		font-weight: bold;
		display: inline-block;
	}
</style>
