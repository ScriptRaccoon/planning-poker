<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	let name = browser ? localStorage.getItem("name") : "";

	const id = $page.params.id;

	let members: any[] = [];

	const socket = io();

	socket.on("connect", () => {
		if (name) {
			socket.emit("name", name);
			socket.emit("room_id", id);
		}
	});

	socket.on("members", (_members) => {
		members = _members;
	});
</script>

<h2>Room {id}</h2>

<p>Hi, {name}!</p>

<b>Members:</b>

{JSON.stringify(members)}
