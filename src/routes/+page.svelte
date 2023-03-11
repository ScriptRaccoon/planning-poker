<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";

	let saved_name = browser
		? localStorage.getItem("name") ?? ""
		: "";
	let name = saved_name;

	function handle_login() {
		if (!browser) return;
		localStorage.setItem("name", name);
		goto("/room");
	}
</script>

<svelte:head>
	<title>SvelteKit Rooms</title>
</svelte:head>

{#if saved_name}
	<h2>Edit your name</h2>
{:else}
	<h2>Choose a name</h2>
{/if}

<form on:submit|preventDefault={handle_login}>
	<label
		>Name
		<input type="text" bind:value={name} required />
	</label>
	<button>Continue</button>
</form>
