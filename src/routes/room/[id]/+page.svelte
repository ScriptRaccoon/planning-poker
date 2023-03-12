<script lang="ts">
	import { io, Socket } from "socket.io-client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name, id: room_id } = data;

	let members: member[] = [];

	let revealed = false;

	const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
		io();

	const allowed_estimates = [1, 2, 3, 5, 8, 13, 21];

	let estimate: number | null = null;

	function choose_estimate(_estimate: number) {
		estimate = _estimate;
		socket.emit("estimate", { estimate, room_id });
	}

	function reset_my_estimate() {
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
		reset_my_estimate();
		revealed = false;
	});

	socket.on("reveal_estimates", () => {
		revealed = true;
	});
</script>

<svelte:head>
	<title>Room {room_id} - Planning Poker</title>
</svelte:head>

<h1>Room {room_id}</h1>

<div>
	<b>Members:</b>
	{members.map((m) => m.name)}
</div>

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
		on:click={reset_my_estimate}
		disabled={estimate === null}>Reset my estimate</button
	>
	<button class="button" on:click={reset_all_estimates}>
		Reset all estimates</button
	>
	<button class="button" on:click={reveal_estimates}>
		Reveal estimates
	</button>
</menu>

<h2>Estimates</h2>

<table>
	{#each members as member (member.id)}
		<tr>
			<td>{member.name}</td>
			<td>
				{#if revealed}
					{member.estimate}
				{:else}
					{member.estimated}
				{/if}
			</td>
		</tr>
	{/each}
</table>

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
