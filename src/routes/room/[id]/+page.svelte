<script lang="ts">
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	const id = $page.params.id;

	const socket = io();

	socket.on("message", (message) => {
		console.log(message);
	});
</script>

<h2>Room {id}</h2>
