<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	let name = browser ? localStorage.getItem("name") : "";

	const id = $page.params.id;

	const socket = io();

	socket.on("connect", () => {
		socket.emit("room_id", id);
	});

	socket.on("member", (member) => {
		console.log("new member joined the room:", member);
	});
</script>

<h2>Room {id}</h2>

<p>Hi, {name}!</p>
