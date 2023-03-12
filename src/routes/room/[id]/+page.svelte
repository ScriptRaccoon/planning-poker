<script lang="ts">
	import { io, Socket } from "socket.io-client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name, id } = data;

	let members: member[] = [];

	const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
		io();

	socket.on("connect", () => {
		socket.emit("name", name);
		socket.emit("room_id", id);
	});

	socket.on("members", (_members) => {
		members = _members;
	});

	const estimates = [1, 2, 3, 5, 8, 13, 21];

	let my_estimate: number | null = null;

	function choose_estimate(estimate: number) {
		my_estimate = estimate;
	}

	function reset_my_estimate() {
		my_estimate = null;
	}

	function reset_all_estimates() {
		// TODO
	}

	function reveal_estimates() {
		// TODO
	}
</script>

<svelte:head>
	<title>Room {id} - Planning Poker</title>
</svelte:head>

<h1>Room {id}</h1>

<div>
	<b>Members:</b>
	{members.map((m) => m.name)}
</div>

<div class="cards">
	{#each estimates as estimate}
		<button
			class="card"
			class:chosen={estimate === my_estimate}
			on:click={() => choose_estimate(estimate)}
		>
			{estimate}
		</button>
	{/each}
</div>

<menu>
	<button
		class="button"
		on:click={reset_my_estimate}
		disabled={my_estimate === null}>Reset my estimate</button
	>
	<button class="button" on:click={reset_all_estimates}>
		Reset all estimates</button
	>
	<button class="button" on:click={reveal_estimates}>
		Reveal estimates
	</button>
</menu>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding-block: 1rem;
	}
	.card {
		padding: 0;
		width: 4rem;
		height: 5.5rem;
		border: 0.1rem solid gray;
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.5rem;
		background-color: #f4f4f4;
	}

	.card.chosen {
		border: 0.2rem solid darkgreen;
	}

	menu {
		display: flex;
		gap: 1rem;
		padding-block: 1rem;
	}
</style>
