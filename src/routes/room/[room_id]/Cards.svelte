<script lang="ts">
	import type { estimate_type } from "$lib/types";
	const allowed_estimates = [1, 2, 3, 5, 8, 13, 21, "?"] as const;
	export let estimate: estimate_type = null;
	export let choose_estimate: (e: estimate_type) => void;
</script>

<section>
	<h2>Choose an estimate</h2>
	<div class="cards">
		{#each allowed_estimates as _estimate}
			<button
				class="card"
				class:chosen={_estimate === estimate}
				on:click={() => choose_estimate(_estimate)}
			>
				{_estimate}
			</button>
		{/each}
	</div>
</section>

<style lang="scss">
	.cards {
		width: fit-content;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		padding-block: 1rem;

		@media (max-width: 26rem) {
			margin: 0 auto;
			place-items: center;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.card {
		padding: 0;
		width: 5rem;
		height: 6.5rem;
		border: 0.1rem solid gray;
		border-radius: 0.4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.5rem;
		background: linear-gradient(to bottom right, #fff, #e0e0e0);
	}

	.card.chosen {
		border: 0.2rem solid var(--primary-color);
	}
</style>
