<script lang="ts">
	import Nav from "@/lib/components/Nav.svelte";
	import "./app.css";
</script>

<Nav />

<main>
	<slot />
</main>

<style>
	main {
		max-width: 38rem;
		margin: 0 auto;
		padding-inline: 0.5rem;
		padding-bottom: 1.5rem;
	}
</style>
