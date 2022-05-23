<script>
	import { auth, db } from '../firebase';
	import { onMount } from 'svelte';
	import { doc, setDoc, getDoc } from 'firebase/firestore';
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
			const docSnap = await getDoc(orderRef);

			if (docSnap.exists()) {
				urOrder = docSnap.data().name;
				console.log('Document data:', docSnap.data());
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		}, 1000);
	});
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
		<h1 class="text-6xl text-slate-100">{umail}</h1>
		<h1 class="text-6xl text-slate-100">{uname}</h1>
		{#if urOrder}
			<h1 class="text-6xl text-slate-100">{urOrder}</h1>
		{/if}

		<div
			class="flex flex-col w-1/4 h-1/4 border-4 border-slate-300 rounded-2xl items-center justify-center my-5"
		>
			<input type="text" bind:value={inputData} />
			<div class="flex">
				<button class="flex mx-3" on:click={Submit}>Confirm</button>
				<button class="flex mx-3">Cancel</button>
			</div>
		</div>

		<button on:click={SignOut}>Sign Out</button>
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
