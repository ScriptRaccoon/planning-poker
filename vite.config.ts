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

		io.on("connection", (socket) => {
			console.log("got connection with", socket.id);

			socket.on("room_id", async (room_id) => {
				socket.join(room_id);
				socket.data.room_id = room_id;
				const sockets_in_room = await io
					.in(room_id)
					.fetchSockets();
				const members: member[] = sockets_in_room.map(
					(s) => ({
						id: s.id,
						name: s.data.name,
					})
				);
				io.to(room_id).emit("members", members);
			});

			socket.on("name", (name) => {
				socket.data.name = name;
			});

			socket.on("estimate", (estimate) => {
				socket.data.estimate = estimate;
			});

			socket.on("reveal_estimates", async () => {
				const room_id = socket.data.room_id;
				if (!room_id) return;
				const sockets_in_room = await io
					.in(room_id)
					.fetchSockets();
				const estimates = sockets_in_room.map((s) => ({
					id: s.id,
					name: s.data.name,
					estimate: s.data.estimate,
				}));
				io.to(room_id).emit("estimates", estimates);
			});

			socket.on("reset_estimates", () => {
				const room_id = socket.data.room_id;
				if (!room_id) return;
				io.to(room_id).emit("reset_estimate");
			});

			socket.on("disconnect", async () => {
				const room_id = socket.data.room_id;
				if (!room_id) return;
				socket.leave(room_id);
				const sockets_in_room = await io
					.in(room_id)
					.fetchSockets();
				const members = sockets_in_room
					.map((s) => ({
						id: s.id,
						name: s.data.name,
					}))
					.filter((s) => s.id != socket.id);
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
