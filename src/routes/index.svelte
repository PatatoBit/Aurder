<script>
	import { auth, db } from '../firebase';
	import { onMount } from 'svelte';
	import { doc, setDoc, onSnapshot } from 'firebase/firestore';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	const provider = new GoogleAuthProvider();

	let isUser;
	let umail = '';
	let uname = '';
	let uid = '';
	let urOrder;

	let inputData;
	let orderRef;

	auth.onAuthStateChanged((user) => {
		if (user) {
			umail = user.email;
			uname = user.displayName;
			uid = user.uid;
			console.log('user logged in');
			isUser = true;
			orderRef = doc(db, 'orders', uid);
			console.log(uid);
			console.log(orderRef);
		} else {
			isUser = false;
			console.log('user logged out');
		}
	});

	function SignIn() {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function SignOut() {
		auth.signOut();
	}

	const Submit = async (e) => {
		e.preventDefault();
		console.log(inputData, uid);

		await setDoc(
			orderRef,
			{
				sender: uname,
				name: inputData
			},
			{ merge: true }
		);
		inputData = '';
	};

	onMount(() => {
		setTimeout(async () => {
			const unsubscribe = onSnapshot(orderRef, (querySnapshot) => {
				const cities = [];
				querySnapshot.forEach((doc) => {
					if (doc.exists()) {
						urOrder = doc.data().name;
						console.log('Document data:', doc.data());
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
					console.log('Document data:', doc.data());
				});
				console.log('Current cities in CA: ', cities.join(', '));
			});
		}, 1000);
	});
	// if (doc.exists()) {
	// 	urOrder = doc.data().name;
	// 	console.log('Document data:', doc.data());
	// } else {
	// 	// doc.data() will be undefined in this case
	// 	console.log('No such document!');
	// }
</script>

<svelte:head>
	<title>Aurder</title>
</svelte:head>

<div class="flex flex-col w-full h-screen items-center justify-center bg-slate-700">
	{#if !isUser}
		<!-- sign in button -->
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={SignIn}
		>
			Sign in with your School Gooogle Account
		</button>
	{:else if umail.split('@')[1] == 'its.ac.th'}
		<!-- display umail and uname -->
		<h1 class="text-5xl text-slate-200">{uname}</h1>
		<h1 class="text-xl text-blue-500">{umail}</h1>
		<button
			class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={SignOut}
		>
			Sign Out
		</button>

		<!-- display urorder -->
		<div
			class="flex flex-col w-1/3 h-1/3 items-center justify-center m-3 bg-white shadow-md rounded px-8 pt-6 pb-8"
		>
			<h1 class="text-5xl text-slate-700">Your Current Order</h1>
			{#if urOrder}
				<h1 class="text-5xl text-slate-700">{urOrder}</h1>
			{:else}
				<h1 class="text-5xl text-slate-500">Loading order... if it exist</h1>
			{/if}
		</div>

		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit={Submit}>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="name">
					Order / Change your Order
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="name"
					type="text"
					placeholder="Enter your order"
					bind:value={inputData}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	{:else}
		<h1 class="text-4xl text-slate-100">Invalid Student Account</h1>
		<h1 class="text-xl text-slate-100">if you're an admin, click Admin Access</h1>

		<button
			class="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={SignOut}
		>
			Sign Out
		</button>
	{/if}
</div>
