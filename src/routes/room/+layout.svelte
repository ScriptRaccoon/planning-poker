<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name } = data;
</script>

<div class="status">
	You are logged in as <span class="name">{name}</span>
</div>

<slot />

<style>
	.status {
		margin-block: 0.5rem;
		text-align: right;
	}
	.name {
		font-weight: bold;
	}
</style>
