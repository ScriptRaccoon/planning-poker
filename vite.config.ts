import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import * as path from "path";
import { Server as ioServer } from "socket.io";

import type { ViteDevServer, UserConfig } from "vite";

const socket_io_plugin = {
	name: "socket.io plugin",
	configureServer(server: ViteDevServer) {
		const io = new ioServer(server.httpServer!);
		io.on("connection", (socket) => {
			console.log("got connection with", socket.id);

			socket.on("room_id", async (room_id) => {
				socket.join(room_id);
				socket.data.room_id = room_id;
				const sockets_in_room = await io
					.in(room_id)
					.fetchSockets();
				const members = sockets_in_room.map((s) => ({
					id: s.id,
					name: s.data.name,
				}));
				io.to(room_id).emit("members", members);
			});

			socket.on("name", (name) => {
				socket.data.name = name;
			});

			socket.on("disconnect", async () => {
				const room_id = socket.data.room_id;
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
