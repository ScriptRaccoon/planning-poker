<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const { name } = data;
</script>

<div class="user">You are logged in as {name}</div>

<slot />

<style>
	.user {
		float: right;
	}
</style>
