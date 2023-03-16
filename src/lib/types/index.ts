export interface ServerToClientEvents {
	members: (x: member[]) => void;
	reveal_estimates: () => void;
	reset_estimate: () => void;
	story: (x: string) => void;
}

export type estimate_type = number | "?" | null;

export interface ClientToServerEvents {
	login: (x: { room_id: string; name: string }) => void;
	estimate: (x: {
		room_id: string;
		estimate: estimate_type;
	}) => void;
	reveal_estimates: (room_id: string) => void;
	reset_estimates: (room_id: string) => void;
	reset_estimate: (room_id: string) => void;
	story: (x: { room_id: string; story: string }) => void;
}

export interface InterServerEvents {}

export interface SocketData {}

export type member = {
	id: string;
	name: string;
	room_id: string;
	estimate: estimate_type;
};

export type room = {
	id: string;
	story: string;
};
