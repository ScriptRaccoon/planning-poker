import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const name = cookies.get("name");
	if (!name) {
		throw redirect(307, "/login");
	}
	const { room_id } = params;
	return { name, room_id };
};
