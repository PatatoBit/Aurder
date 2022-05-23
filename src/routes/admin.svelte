<script>
	import { auth } from '../firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let nameInput;
	let passwordInput;
	let isUser = false;

	let umail;

	auth.onAuthStateChanged((user) => {
		if (user) {
			umail = user.email;

			isUser = true;
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
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode, errorMessage);
			});
	}
</script>

<div class="flex w-full h-screen items-center justify-center bg-slate-700">
	{#if !isUser}
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
	{:else}
		<div class="w-full max-w-md">
			<div class=" shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-800">
				<div class="mb-4">
					<h1 class="text-center text-2xl font-bold text-slate-200">Welcome Admin</h1>
					<p class="text-center text-slate-300 text-xs">{umail}</p>
					<button
						on:click={() => auth.signOut()}
						class="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign Out
					</button>
				</div>
			</div>
		</div>
		<!-- welcome admin -->
	{/if}

	<!-- Sign In page  -->
</div>
