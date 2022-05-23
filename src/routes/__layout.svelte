<script>
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
	import Buttons from '$lib/components/Buttons.svelte';
	import Title from '$lib/components/Title.svelte';
</script>

<slot />

<div class="absolute top-0 mx-2 my-2">
	<Title />
</div>

<div class="absolute top-0 right-0 p-3 flex flex-col sm:flex-row gap-2">
	<Buttons />
</div>

<div class="absolute bottom-0 right-0 p-3 flex flex-row gap-2">
	<Socials />
</div>
