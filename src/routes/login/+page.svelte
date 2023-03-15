<script lang="ts">
	import Login from "./Login.svelte";
	import type { ActionData, PageData } from "./$types";
	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Planning Poker - Login</title>
</svelte:head>

<Login {data} {form} />
