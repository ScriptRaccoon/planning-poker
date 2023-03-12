<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name } = data;

	let room_id = "";

	function generate_id(length = 6) {
		let id = "";
		for (let i = 0; i < length; i++) {
			const num = Math.floor(Math.random() * 10);
			id += num.toString();
		}
		return id;
	}

	async function create_new_room() {
		const id = generate_id();
		goto(`/room/${id}`);
	}

	function join_existing_room() {
		if (room_id) {
			goto(`/room/${room_id}`);
		}
	}
</script>

<h1>Rooms</h1>

<form on:submit|preventDefault>
	<p>
		<button class="button" on:click={create_new_room}
			>Create and join new room</button
		>
	</p>

	<p>
		<input type="text" bind:value={room_id} />
		<button
			class="button"
			disabled={room_id.length == 0}
			on:click={join_existing_room}>Join existing room</button
		>
	</p>
</form>
