<script lang="ts">
	import "./app.css";
</script>

<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/room">Rooms</a>
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		padding: 1rem;
		background-color: #eee;
	}
	ul {
		list-style-type: none;
		display: flex;
		gap: 1rem;
		margin: 0;
	}

	main {
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
