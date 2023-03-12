interface ServerToClientEvents {
	members: (m: member[]) => void;
	reveal_estimates: () => void;
	reset_estimate: () => void;
}

interface ClientToServerEvents {
	login: ({ room_id: string, name: string }) => void;
	estimate: ({ room_id: string, estimate: number }) => void;
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
	estimate: null | number;
	estimated: boolean;
};
