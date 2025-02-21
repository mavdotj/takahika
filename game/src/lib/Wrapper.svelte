<script lang="ts">
	import { key } from './key';
	import { Game } from './state.svelte';
	import { setContext } from 'svelte-typed-context';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const game = new Game();
	let sidebar = $state({ open: false });
	$inspect(game, game.answer, game.grid, game.guessesLeft, game.state);
	setContext(key, {
		game,
		sidebar
	});
</script>

<div class="drawer w-full h-full flex flex-col overflow-hidden items-center justify-center">
	<input type="checkbox" class="drawer-toggle" id="my-drawer" checked={sidebar.open} />
	<div class="drawer-content">
		{@render children?.()}
	</div>
	<div class="drawer-side">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="menu p-4 w-80 min-h-full bg-base-200 text-base-content"></div>
	</div>
</div>
