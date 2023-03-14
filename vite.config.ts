import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import * as path from "path";
import { attach_sockets } from "./sockets";

import type { ViteDevServer } from "vite";

const socket_io_plugin = {
	name: "socket.io plugin",
	configureServer(server: ViteDevServer) {
		attach_sockets(server.httpServer!);
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
