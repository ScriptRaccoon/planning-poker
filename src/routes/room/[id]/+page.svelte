<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	const room = data.room;
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
