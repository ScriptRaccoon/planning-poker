interface ServerToClientEvents {
	members: (m: member[]) => void;
	estimates: (
		x: { id: string; estimate?: number; name?: string }[]
	) => void;
	reset_estimate: () => void;
}

interface ClientToServerEvents {
	room_id: (id: string) => void;
	name: (n: string) => void;
	estimate: (e: number) => void;
	reveal_estimates: () => void;
	reset_estimates: () => void;
}

interface InterServerEvents {}

interface SocketData {
	name: string;
	room_id: string;
	estimate: number;
}

type member = {
	id: string;
	name: string;
};
