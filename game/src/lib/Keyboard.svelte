<script lang="ts">
	import { Delete, Menu, Shuffle, ThumbsUp } from 'svelte-lucide';
	import { getContext } from 'svelte-typed-context';
	import { key } from './key';

	let { game, sidebar } = getContext(key)!;
	let text = $state('');
	let number = $derived(parseInt(text));
	function submit() {
		if (text.length == 0) return;
		game.guess(number);
		text = '';
	}

	function add(value: string) {
		if (text.length == 2) return;
		text = text.concat(value);
	}

	function addButton(value: number) {
		return () => add(value.toString());
	}

	function handleKBD(e: KeyboardEvent) {
		if (game.state !== 'play') return;
		if (e.code.startsWith('Digit')) {
			add(e.code[5]);
		} else if (e.code == 'Backspace') {
			remove();
		} else if (e.code == 'Enter') {
			submit();
		}
	}

	function remove() {
		text = text.substring(0, text.length - 1);
	}
</script>

<div class="flex flex-row w-fit">
	<button
		onclick={() => (sidebar.open = !sidebar.open)}
		class="btn btn-circle btn-primary text-primary-content"
		disabled={game.state !== 'play'}
	>
		<Menu />
	</button>
	<div class="grow mx-4">
		<input
			value={text}
			type="text"
			class="input text-center max-w-xs w-full text-base-content !input-bordered !cursor-default"
			disabled
		/>
	</div>
	<button
		onclick={() => game.shuffle()}
		class="btn btn-circle btn-primary text-primary-content"
		disabled={game.state !== 'play'}
	>
		<Shuffle />
	</button>
</div>
<div class="flex flex-row gap-x-2 mt-4 scale-90">
	<button
		onclick={remove}
		title="delete"
		class="btn btn-circle btn-sm md:btn-md"
		disabled={game.state !== 'play'}><Delete /></button
	>
	{#each { length: 10 } as _, i (i)}
		<button
			onclick={addButton(i + 1)}
			title="Number {i + 1}"
			class="btn btn-circle btn-outline btn-primary btn-sm md:btn-md"
			disabled={game.state !== 'play'}>{i + 1}</button
		>
	{/each}
	<button
		onclick={submit}
		title="enter"
		class="btn btn-circle btn-sm md:btn-md"
		disabled={game.state !== 'play'}><ThumbsUp /></button
	>
</div>

<svelte:window onkeydown={handleKBD} />
