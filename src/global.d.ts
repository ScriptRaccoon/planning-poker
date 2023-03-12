interface ServerToClientEvents {
	members: (m: member[]) => void;
}

interface ClientToServerEvents {
	room_id: (id: string) => void;
	name: (n: string) => void;
}

interface InterServerEvents {}

interface SocketData {
	name: string;
	room_id: string;
}

type member = {
	id: string;
	name: string;
};
