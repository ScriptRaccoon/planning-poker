<script lang="ts">
	import { debounce } from "@/lib/utils";
	import { io, Socket } from "socket.io-client";
	import type { PageData } from "./$types";

	export let data: PageData;
	const { name, room_id } = data;

	let members: member[] = [];

	const allowed_estimates = [1, 2, 3, 5, 8, 13, 21, "?"] as const;

	let estimate: estimate_type = null;
	let estimates_revealed = false;

	let story = "";

	const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
		io();

	function choose_estimate(_estimate: estimate_type) {
		estimate = _estimate;
		socket.emit("estimate", { estimate, room_id });
	}

	function reset_estimate() {
		estimate = null;
		socket.emit("reset_estimate", room_id);
	}

	function reset_all_estimates() {
		socket.emit("reset_estimates", room_id);
	}

	function reveal_estimates() {
		socket.emit("reveal_estimates", room_id);
	}

	socket.on("connect", () => {
		socket.emit("login", { name, room_id });
	});

	socket.on("members", (_members) => {
		members = _members;
	});

	socket.on("reset_estimate", () => {
		reset_estimate();
		estimates_revealed = false;
	});

	socket.on("reveal_estimates", () => {
		estimates_revealed = true;
	});

	socket.on("story", (_story) => {
		story = _story;
	});

	const emit_story = debounce(() => {
		socket.emit("story", { story, room_id });
	}, 250);
</script>

<svelte:head>
	<title>Room {room_id} - Planning Poker</title>
</svelte:head>

<h1>Room {room_id}</h1>

<form on:submit|preventDefault class="story_form">
	<label for="story_input">User story</label>
	<input
		id="story_input"
		bind:value={story}
		on:input={emit_story}
	/>
	<a href={story} target="_blank">Open</a>
</form>

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

<h2>Estimates</h2>

<table>
	{#each members as member (member.id)}
		<tr>
			<td>{member.name}</td>
			<td>
				{#if estimates_revealed}
					<span class="estimate">
						{@html member.estimate ?? "&ndash;"}
					</span>
				{:else}
					<div
						aria-label={member.estimate != null
							? "Estimated"
							: "Not estimated"}
						class="circle"
						class:estimated={member.estimate != null}
					/>
				{/if}
			</td>
		</tr>
	{/each}
</table>

<style>
	.cards {
		width: fit-content;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		padding-block: 1rem;
	}

	@media (max-width: 26rem) {
		.cards {
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

	menu {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-block: 1rem;
	}

	table {
		font-size: 1.25rem;
	}

	td:nth-child(2) {
		padding-left: 0.25rem;
	}

	.circle {
		width: 1.2rem;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: var(--secondary-color);
	}

	.circle.estimated {
		background-color: var(--primary-color);
	}

	.estimate {
		color: var(--primary-color);
		font-weight: bold;
	}

	h2 {
		padding-top: 1rem;
	}

	label {
		display: inline;
	}

	.story_form {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.5rem;
	}
</style>
