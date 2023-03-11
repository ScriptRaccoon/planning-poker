<script lang="ts">
	import { goto } from "$app/navigation";

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

	let room_id = "";

	function join_existing_room() {
		if (room_id) {
			goto(`/room/${room_id}`);
		}
	}
</script>

<svelte:head>
	<title>SvelteKit Rooms</title>
</svelte:head>

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
