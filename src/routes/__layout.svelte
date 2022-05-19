<script>
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
</script>

<slot />

<div class="absolute bottom-0 right-0 p-3 flex flex-row gap-2">
	<Socials />
</div>
