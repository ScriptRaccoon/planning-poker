<script lang="ts">
	import { debounce } from "@/lib/utils";
	import { io, Socket } from "socket.io-client";
	import type {
		member,
		estimate_type,
		ServerToClientEvents,
		ClientToServerEvents,
	} from "../../../../types";
	import Cards from "./Cards.svelte";
	import Menu from "./Menu.svelte";
	import Story from "./Story.svelte";
	import Estimates from "./Estimates.svelte";
	import { beforeNavigate } from "$app/navigation";

	export let name: string;
	export let room_id: string;

	let members: member[] = [];

	let estimate: estimate_type = null;
	let estimates_revealed = false;

	let story = "";

	const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
		io();

	function choose_estimate(_estimate: estimate_type) {
		estimate = _estimate;
		socket.emit("estimate", { estimate, room_id });
	}

	function reset_estimate() {
		estimate = null;
		socket.emit("reset_estimate", room_id);
	}

	function reset_all_estimates() {
		socket.emit("reset_estimates", room_id);
	}

	function reveal_estimates() {
		socket.emit("reveal_estimates", room_id);
	}

	socket.on("connect", () => {
		socket.emit("login", { name, room_id });
	});

	socket.on("members", (_members) => {
		members = _members;
	});

	socket.on("reset_estimate", () => {
		reset_estimate();
		estimates_revealed = false;
	});

	socket.on("reveal_estimates", () => {
		estimates_revealed = true;
	});

	socket.on("story", (_story) => {
		story = _story;
	});

	const emit_story = debounce(() => {
		socket.emit("story", { story, room_id });
	}, 250);

	beforeNavigate(() => {
		socket.disconnect();
	});
</script>

<h1>Room {room_id}</h1>

<Story {story} {emit_story} />

<Cards {estimate} {choose_estimate} />

<Menu
	{estimate}
	{reset_all_estimates}
	{reveal_estimates}
	{reset_estimate}
	{estimates_revealed}
/>

<Estimates {members} {estimates_revealed} />
