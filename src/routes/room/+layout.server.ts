import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const name = cookies.get("name");
	if (!name) {
		throw redirect(307, "/login");
	}
	return { name };
};
