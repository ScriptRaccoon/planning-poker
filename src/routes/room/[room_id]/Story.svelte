<script lang="ts">
	export let story: string = "";
	export let emit_story: () => void;
</script>

<form on:submit|preventDefault class="story_form">
	<label for="story_input">User story</label>
	<input
		id="story_input"
		bind:value={story}
		on:input={emit_story}
	/>
	<a href={story} target="_blank">Open</a>
</form>

<style lang="scss">
	.story_form {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5rem;
		padding-bottom: 1rem;
		label {
			white-space: nowrap;
		}
		@media (min-width: 32rem) {
			grid-template-columns: auto 1fr auto;
		}
	}
</style>
