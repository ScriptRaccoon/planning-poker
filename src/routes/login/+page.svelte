<script lang="ts">
	import { set_data_dev } from "svelte/internal";
	import type { ActionData, PageData } from "./$types";
	export let data: PageData;
	export let form: ActionData;
</script>

<h1>Login</h1>

<form method="POST">
	<label>Name<br /><input type="text" name="name" required /></label
	>
	<button class="button">Login</button>
</form>

{#if form}
	<p>
		Login successful. You can now go to <a href="/room">Rooms</a>.
	</p>
{/if}

{#if data?.name}
	<p>
		You are logged in as {data.name}.
	</p>
	<p>You can use the form above to change your name.</p>
{/if}
