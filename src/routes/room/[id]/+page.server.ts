import { get_room } from "@/db/rooms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const room = get_room(id);
	return { room };
};
