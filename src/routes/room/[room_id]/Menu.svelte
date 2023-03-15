<script lang="ts">
	import type { estimate_type } from "../../../../types";
	export let estimate: estimate_type;
	export let reset_estimate: () => void;
	export let reveal_estimates: () => void;
	export let reset_all_estimates: () => void;
	export let estimates_revealed: boolean = false;
</script>

<menu>
	<button
		class="button"
		on:click={reset_estimate}
		disabled={estimate === null}
	>
		Reset
	</button>

	<button
		class="button"
		on:click={reveal_estimates}
		disabled={estimates_revealed}
	>
		Reveal all
	</button>

	<button class="button danger" on:click={reset_all_estimates}>
		Reset all
	</button>
</menu>

<style>
	menu {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-block: 1rem;
	}
</style>
