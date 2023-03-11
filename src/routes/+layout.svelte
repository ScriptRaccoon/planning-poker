<script lang="ts">
	import "./app.css";
</script>

<nav>
	<a href="/">Home</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		padding: 1rem;
		background-color: #eee;
	}

	main {
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
