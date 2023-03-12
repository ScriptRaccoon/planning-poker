interface ServerToClientEvents {
	members: (x: member[]) => void;
	reveal_estimates: () => void;
	reset_estimate: () => void;
}

type estimate_type = number | "?" | null;

interface ClientToServerEvents {
	login: (x: { room_id: string; name: string }) => void;
	estimate: (x: {
		room_id: string;
		estimate: estimate_type;
	}) => void;
	reveal_estimates: (room_id: string) => void;
	reset_estimates: (room_id: string) => void;
	reset_estimate: (room_id: string) => void;
}

interface InterServerEvents {}

interface SocketData {}

type member = {
	id: string;
	name: string;
	room_id: string;
	estimate: estimate_type;
};
