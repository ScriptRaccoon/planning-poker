<script lang="ts">
	import { io } from 'socket.io-client';
	import type { PageData } from "./$types";
	export let data: PageData;
	const room = data.room;

	const socket = io();
	
	socket.on('message', (message) => {
		console.log(message);
	});
	
</script>

{#if room}
	<h2>Room {room.id}</h2>
	<label>
		Topic
		<input type="text" bind:value={room.topic} />
	</label>

	<br />
	<code>
		{JSON.stringify(room)}
	</code>
{:else}
	<p>Data could not be loaded</p>
{/if}
