import type { Server } from "http";
import { Server as ioServer } from "socket.io";

import type {
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData,
	member,
	room,
} from "./types";

export function attach_sockets(server: Server) {
	const io = new ioServer<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>(server);

	let members: member[] = [];
	let rooms: room[] = [];

	io.on("connection", (socket) => {
		// LOGIN
		socket.on("login", ({ room_id, name }) => {
			socket.join(room_id);

			let room = rooms.find((r) => r.id === room_id);

			if (!room) {
				room = {
					id: room_id,
					story: "",
				};
				rooms.push(room);
			}

			if (members.some((m) => m.id === socket.id)) return;

			const member: member = {
				id: socket.id,
				name: name,
				room_id: room_id,
				estimate: null,
			};

			members.push(member);

			const room_members = members.filter(
				(m) => m.room_id === room_id
			);

			io.to(socket.id).emit("story", room.story);

			io.to(room_id).emit("members", room_members);
		});

		// SUBMIT ESTIMATE
		socket.on("estimate", ({ room_id, estimate }) => {
			const member = members.find((m) => m.id == socket.id);
			if (!member) return;
			member.estimate = estimate;

			const room_members = members.filter(
				(m) => m.room_id === room_id
			);

			io.to(room_id).emit("members", room_members);
		});

		// RESET ESTIMATE
		socket.on("reset_estimate", (room_id) => {
			const member = members.find((m) => m.id == socket.id);
			if (!member) return;
			member.estimate = null;
			const room_members = members.filter(
				(m) => m.room_id === room_id
			);

			io.to(room_id).emit("members", room_members);
		});

		// REVEAL ESTIMATES
		socket.on("reveal_estimates", async (room_id) => {
			io.to(room_id).emit("reveal_estimates");
		});

		// RESET ESTIMATES
		socket.on("reset_estimates", (room_id) => {
			io.to(room_id).emit("reset_estimate");
		});

		// USER STORY
		socket.on("story", ({ room_id, story }) => {
			io.to(room_id).emit("story", story);
			const room = rooms.find((r) => r.id == room_id);
			if (room) room.story = story;
		});

		// DISCONNECT
		socket.on("disconnect", async () => {
			const member = members.find((m) => m.id == socket.id);
			if (!member) return;
			const room_id = member.room_id;
			members = members.filter((m) => m.id != socket.id);
			const room_members = members.filter(
				(m) => m.room_id === room_id
			);
			io.to(room_id).emit("members", room_members);
		});
	});
}
