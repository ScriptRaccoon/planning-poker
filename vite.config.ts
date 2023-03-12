import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import * as path from "path";
import { Server as ioServer } from "socket.io";

import type { ViteDevServer } from "vite";

const socket_io_plugin = {
	name: "socket.io plugin",
	configureServer(server: ViteDevServer) {
		const io = new ioServer<
			ClientToServerEvents,
			ServerToClientEvents,
			InterServerEvents,
			SocketData
		>(server.httpServer!);

		let members: member[] = [];

		io.on("connection", (socket) => {
			// LOGIN
			socket.on("login", ({ room_id, name }) => {
				socket.join(room_id);

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

				io.to(room_id).emit("members", room_members);
			});

			// ESTIMATE
			socket.on("estimate", ({ room_id, estimate }) => {
				const member = members.find((m) => m.id == socket.id);
				if (!member) return;
				member.estimate = estimate;

				const room_members = members.filter(
					(m) => m.room_id === room_id
				);

				io.to(room_id).emit("members", room_members);
			});

			socket.on("reset_estimate", (room_id) => {
				const member = members.find((m) => m.id == socket.id);
				if (!member) return;
				member.estimate = null;
				const room_members = members.filter(
					(m) => m.room_id === room_id
				);

				io.to(room_id).emit("members", room_members);
			});

			// REVEAL
			socket.on("reveal_estimates", async (room_id) => {
				io.to(room_id).emit("reveal_estimates");
			});

			// RESET
			socket.on("reset_estimates", (room_id) => {
				io.to(room_id).emit("reset_estimate");
			});

			// USER STORY
			socket.on("story", ({ room_id, story }) => {
				io.to(room_id).emit("story", story);
			});

			// DISCONNECT
			socket.on("disconnect", async () => {
				const member = members.find((m) => m.id == socket.id);
				if (!member) return;
				const room_id = member.room_id;
				socket.leave(member.room_id);
				members = members.filter((m) => m.id != socket.id);
				io.to(room_id).emit("members", members);
			});
		});
	},
};

export default defineConfig({
	plugins: [sveltekit(), socket_io_plugin],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
