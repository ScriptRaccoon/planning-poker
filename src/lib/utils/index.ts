export function debounce(fn: () => void, delay: number) {
	let id: number;
	return () => {
		if (id) clearTimeout(id);
		id = window.setTimeout(() => {
			fn();
		}, delay);
	};
}

export function generate_id(length = 6) {
	let id = "";
	for (let i = 0; i < length; i++) {
		const num = Math.floor(Math.random() * 10);
		id += num.toString();
	}
	return id;
}
