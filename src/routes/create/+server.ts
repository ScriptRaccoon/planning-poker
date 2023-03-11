import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { create_room } from "@/db/rooms";

export const POST: RequestHandler = async ({ request }) => {
	const id = create_room();
	return json({ id });
};
