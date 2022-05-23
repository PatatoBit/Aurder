<script>
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
</script>

<slot />

<!-- Admin button -->
<div class="absolute top-0 right-0 p-3 flex flex-row gap-2">
	<a href="/admin"
		><button
			class="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="submit">Admin Access</button
		></a
	>
</div>

<div class="absolute bottom-0 right-0 p-3 flex flex-row gap-2">
	<Socials />
</div>
