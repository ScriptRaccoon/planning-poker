<script lang="ts">
	import { io, Socket } from "socket.io-client";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name, id } = data;

	let members: member[] = [];

	const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
		io();

	socket.on("connect", () => {
		socket.emit("name", name);
		socket.emit("room_id", id);
	});

	socket.on("members", (_members) => {
		members = _members;
	});
</script>

<h1>Room {id}</h1>

<b>Members:</b>

{JSON.stringify(members)}
