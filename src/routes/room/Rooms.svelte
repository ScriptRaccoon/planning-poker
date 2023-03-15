<script lang="ts">
	import { goto } from "$app/navigation";
	import { generate_id } from "@/lib/utils";

	let room_id = "";

	const id_pattern = "^\\d{6}$";

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
			<p>
				<button class="button">Create new room</button>
			</p>
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
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding-top: 0.5rem;
	}

	.option {
		padding: 1rem;
		background-color: var(--light-color);
		border-radius: 0.4rem;
	}

	@media (min-width: 32rem) {
		.options {
			grid-template-columns: 1fr 1fr;
		}
		.option input {
			width: 100%;
		}
	}
</style>
