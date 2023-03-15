<script lang="ts">
	import type { ActionData, PageData } from "./$types";
	export let data: PageData;
	export let form: ActionData;
</script>

<h1>Login</h1>

<form method="POST">
	<label for="name_input">Name</label>
	<input id="name_input" type="text" name="name" required />
	<button class="button">
		{#if data?.name}
			Change name
		{:else}
			Login
		{/if}
	</button>
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
{/if}
