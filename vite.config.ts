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
			socket.emit("message", "Hi there!");
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
