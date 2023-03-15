<script lang="ts">
	import type { PageData } from "./$types";
	import Room from "./Room.svelte";
	export let data: PageData;
	const { name, room_id } = data;
</script>

<svelte:head>
	<title>Room {room_id} - Planning Poker</title>
</svelte:head>

<Room {name} {room_id} />
