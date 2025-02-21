<script lang="ts">
	import { getContext } from 'svelte-typed-context';
	import { key } from './key';

	let { game } = getContext(key)!;
	let HTMLbutton: HTMLButtonElement;
	let storedAnswer: number = $state(0);

	let open = $derived(game.state !== 'play');
	const LOSE_MESSAGES = [
		'Bruh \u{1f480}...',
		"That wasn't right.",
		"C'mon this is easy.",
		'Womp womp...',
		'You suck \u{1f923} \u{1faf5}\u{1f3fe}',
		'BOO YOU STINK',
		'What made you think that was right? \u{1f62d}'
	];
	const WIN_MESSAGES = ['YEAH! \u{1f60e}', 'Good job', 'RAHHHHH!!!!!'];
	const message = $derived.by(() => {
		if (game.state !== 'play') {
			if (game.state === 'fail') {
				return LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)];
			} else if (game.state === 'pass') {
				return WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
			}
		}
	});

	$effect(() => {
		if (open) {
			HTMLbutton.focus();
			storedAnswer = game.answer;
		}
	});
</script>

<input type="checkbox" checked={open} class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3
			class="font-bold text-md"
			class:text-success={game.state == 'pass'}
			class:text-error={game.state == 'fail'}
		>
			{message}
		</h3>
		<p class="py-4">{storedAnswer}</p>
		<div class="modal-action">
			<button bind:this={HTMLbutton} onclick={() => game.reset()} disabled={!open} class="btn"
				>Ok</button
			>
		</div>
	</div>
</div>
