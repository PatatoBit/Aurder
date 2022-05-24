<script>
	import { auth, db } from '../firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { collection, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let nameInput;
	let passwordInput;
	let isUser = false;

	const orderRef = collection(db, 'orders');

	let orders = [];

	onMount(() => {});

	let umail;

	auth.onAuthStateChanged((user) => {
		if (user) {
			umail = user.email;
			isUser = true;

			onSnapshot(orderRef, (querySnapshot) => {
				// querySnapshot.forEach((doc) => {
				// 	orders = [...orders, { sender: doc.data().sender, name: doc.data().name }];
				// });
				orders = [];
				for (const doc of querySnapshot.docs) {
					orders = [
						...orders,
						{
							sender: doc.data().sender,
							uid: doc.data().uid,
							name: doc.data().name,
							status: doc.data().status
						}
					];
				}
			});
		} else {
			isUser = false;
		}
	});

	function SignIn(e) {
		e.preventDefault();
		signInWithEmailAndPassword(auth, nameInput, passwordInput)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.error(errorCode, errorMessage);
			});
	}

	async function Cooking(uid) {
		const orderRef = doc(db, 'orders', uid);
		await setDoc(
			orderRef,
			{
				status: 'cooking'
			},
			{ merge: true }
		);
	}

	async function Done(uid) {
		const orderRef = doc(db, 'orders', uid);
		await setDoc(
			orderRef,
			{
				status: 'done'
			},
			{ merge: true }
		);
	}
</script>

<svelte:head>
	<title>Aurder Admin</title>
</svelte:head>

<div class="flex flex-col w-full h-screen items-center justify-center bg-slate-700">
	{#if !isUser}
		<!-- Admin Sign in -->
		<div class="w-full max-w-md">
			<div class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800">
				<div class="mb-4">
					<h1 class="text-center text-2xl font-bold text-slate-200">Sign In</h1>
					<p class="text-center text-slate-300 text-xs">Admin Access</p>
				</div>
				<form on:submit={SignIn}>
					<div class="mb-4">
						<label class="block text-slate-300 text-sm font-bold mb-2" for="username">
							Username
						</label>
						<input
							bind:value={nameInput}
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							type="text"
							placeholder="Username"
						/>
					</div>
					<div class="mb-6">
						<label class="block text-slate-300 text-sm font-bold mb-2" for="password">
							Password
						</label>
						<input
							bind:value={passwordInput}
							class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
						/>
						<p class="text-gray-600 text-xs italic">Please choose a password.</p>
					</div>
					<div class="flex items-center justify-between">
						<button
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Sign In
						</button>
						<form
							class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="mailto:pathonscript@gmail.com"
						>
							Forgot Password?
						</form>
					</div>
				</form>
			</div>
		</div>
	{:else if umail.split('@')[1] == 'staff.admin'}
		<!-- Admin view -->
		<div class="w-full max-w-md">
			<div class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800">
				<div class="mb-4">
					<h1 class="text-center text-2xl font-bold text-slate-200">Welcome Admin</h1>
					<p class="text-center text-slate-300 text-xs">{umail}</p>
					<div class="flex flex-row justify-center">
						<button
							on:click={() => auth.signOut()}
							class="flex text-center mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- display each element in Orders -->
		<div class="w-full max-w-md">
			<div class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800">
				<div class="mb-4">
					<h1 class="text-center text-2xl font-bold text-slate-200">Orders</h1>
					<p class="text-center text-slate-300 text-xs">
						{#each orders as order}
							<div class="flex flex-col my-2">
								<div class="flex flex-row bg-slate-700 rounded rounded-b-none shadow-md px-2 py-1">
									<h1 class="flex-1 text-left text-xl">
										{order.sender}:
									</h1>
									<h1 class="flex-1 text-right text-xl ">
										{order.name}
									</h1>
								</div>
								<div class="flex flex-row">
									<button
										class="flex-1 items-right text-xl bg-blue-500 rounded rounded-t-none rounded-r-none "
										on:click={() => Cooking(order.uid)}
									>
										📝</button
									>
									<button
										class="flex-1 items-right text-xl bg-green-500 rounded rounded-t-none rounded-l-none "
										on:click={() => Done(order.uid)}>✅</button
									>
								</div>
							</div>
						{/each}
					</p>
				</div>
			</div>
		</div>
	{:else}
		<!-- Not Admin -->
		<h1 class="text-4xl text-slate-100">Invalid Admin Account</h1>
		<h1 class="text-xl text-slate-100">if you're an student, click Main Access</h1>

		<button
			class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={() => auth.signOut()}
		>
			Sign Out
		</button>
	{/if}
</div>
