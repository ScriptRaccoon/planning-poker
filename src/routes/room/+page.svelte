<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";

	let name = browser ? localStorage.getItem("name") : "";

	let room_id = "";

	async function create_new_room() {
		const res = await fetch("/create", {
			method: "POST",
		});
		const data = await res.json();
		const { id } = data;
		if (id) {
			goto(`/room/${id}`);
		}
	}

	function join_existing_room() {
		if (room_id) {
			goto(`/room/${room_id}`);
		}
	}
</script>

<h2>Rooms</h2>

{#if name}
	<p>Hi, {name}!</p>

	<p>
		<button on:click={create_new_room}>Create new room</button>
	</p>

	<p>
		<button
			disabled={room_id.length == 0}
			on:click={join_existing_room}>Join existing room</button
		>
		<input type="text" bind:value={room_id} />
	</p>
{:else}
	<p>You are not logged in.</p>
{/if}
