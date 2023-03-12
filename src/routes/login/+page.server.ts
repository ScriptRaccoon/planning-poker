import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ cookies }) => {
	const name = cookies.get("name");
	return { name };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get("name") as string;
		const one_day = 60 * 60 * 24;
		cookies.set("name", name, {
			path: "/",
			maxAge: one_day,
		});
		return { name };
	},
};
