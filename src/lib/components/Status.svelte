<script>
	export let status;
</script>

<div class="absolute bottom-0 right-0 mx-4 my-2">
	{#if status == 'cooking'}
		<div class="flex justify-center items-center">
			<div class="bg-yellow-300 w-4 h-4 rounded-full mx-2" />
			<h1 class="text-2xl text-yellow-500">{status}</h1>
		</div>
	{:else if status == 'done'}
		<div class="flex justify-center items-center">
			<div class="bg-green-500 w-4 h-4 rounded-full mx-2" />
			<h1 class="text-2xl text-green-500">{status}</h1>
			<button class="bg-green-500 p-2 px-4 mx-2 rounded-lg text-xl text-white">Clear</button>
		</div>
	{:else if status == 'changed'}
		<div class="flex justify-center items-center">
			<div class="bg-purple-500 w-4 h-4 rounded-full mx-2" />
			<h1 class="text-2xl text-purple-500">{status}</h1>
		</div>
	{:else}
		<div class="flex justify-center items-center">
			<div class="bg-gray-500 w-4 h-4 rounded-full mx-2" />
			<h1 class="text-2xl text-gray-500">{status}</h1>
		</div>
	{/if}
</div>
