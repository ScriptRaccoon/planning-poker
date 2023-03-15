<script lang="ts">
	import type { member } from "../../../../types";
	import Estimate from "./Estimate.svelte";

	export let members: member[];
	export let estimates_revealed: boolean;
</script>

<section>
	<h2>Estimates</h2>

	<table>
		{#each members as member (member.id)}
			<tr>
				<td>{member.name}</td>
				<td>
					<Estimate {member} {estimates_revealed} />
				</td>
			</tr>
		{/each}
	</table>
</section>

<style lang="scss">
	table {
		font-size: 1.25rem;
	}

	td:nth-child(2) {
		padding-inline: 0.5rem;
		text-align: center;
	}
</style>
