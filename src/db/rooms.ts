type room = {
	id: string;
	members: string[];
	topic: string;
};

const rooms: room[] = [];

export function create_room() {
	const id = get_id();
	const members: string[] = [];
	const topic = "";
	const room: room = { id, members, topic };
	rooms.push(room);
	return id;
}

export function get_room(id: string) {
	return rooms.find((r) => r.id === id);
}

export function get_id(): string {
	let id: string;
	do {
		id = "";
		for (let i = 0; i < 6; i++) {
			id += Math.floor(Math.random() * 10).toString();
		}
	} while (rooms.some((r) => r.id === id));
	return id;
}
