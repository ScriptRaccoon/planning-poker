import express from "express";
import { handler } from "./build/handler.js";
import { attach_sockets } from "./sockets.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const app = express();
const server = app.listen(PORT, () => {
	console.log("server is listening on port", PORT);
});
app.use(handler);

attach_sockets(server);

console.log("ORIGIN:", process.env.ORIGIN);
