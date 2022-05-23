<script>
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
	import Buttons from '$lib/components/Buttons.svelte';
</script>

<slot />

<!-- Admin button -->
<div class="absolute top-0 right-0 p-3 flex flex-row gap-2">
	<Buttons />
</div>

<div class="absolute bottom-0 right-0 p-3 flex flex-row gap-2">
	<Socials />
</div>
