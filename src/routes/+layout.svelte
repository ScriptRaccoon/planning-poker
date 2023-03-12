<script lang="ts">
	import Nav from "@/lib/Nav.svelte";
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
	}
</style>
