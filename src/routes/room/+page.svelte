<script lang="ts">
	import { goto } from "$app/navigation";

	let room_id = "";

	const id_pattern = "^\\d{6}$";

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
		goto(`/room/${room_id}`);
	}
</script>

<h1>Rooms</h1>

<p>Choose one of the following options.</p>

<div class="options">
	<div class="option">
		<h2>Create new room</h2>
		<form on:submit|preventDefault={create_new_room}>
			<button class="button">Create new room</button>
		</form>
	</div>

	<div class="option">
		<h2>Join room</h2>
		<form on:submit|preventDefault={join_existing_room}>
			<label for="room_input">Room ID (6 digits)</label>
			<input
				pattern={id_pattern}
				id="room_input"
				type="text"
				bind:value={room_id}
				required
			/>
			<p>
				<button class="button">Join room</button>
			</p>
		</form>
	</div>
</div>

<style>
	.options {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		max-width: 16rem;
		gap: 1rem;
	}

	.option {
		background-color: var(--light-color);
		padding: 1rem;
		border-radius: 0.5rem;
	}

	h2 {
		margin-bottom: 0.5rem;
	}
</style>
