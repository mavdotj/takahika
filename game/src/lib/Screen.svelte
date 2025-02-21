<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas, Layer, type Render } from 'svelte-canvas';
	import { BOX_SIZE, font, loadFont, reshape, toHex } from './render.svelte';
	import Color from 'colorjs.io';
	import { getContext } from 'svelte-typed-context';
	import { key } from './key';
	let width = $state(0);
	let height = $state(0);
	let canvas = $state<Canvas>();

	let { game } = getContext(key)!;
    
	onMount(async () => {
		const CANVAS_SIZE = BOX_SIZE * 50;
		console.log(CANVAS_SIZE);
		width = CANVAS_SIZE;
		height = CANVAS_SIZE;
		await loadFont();
	});

	const render: Render = ({ context, width }) => {
		console.log('render');
		context.reset();
		let style = getComputedStyle(document.body);
		const green = toHex(new Color(style.getPropertyValue('--color-success')));
		const red = toHex(new Color(style.getPropertyValue('--color-error')));
		const border = toHex(new Color(style.getPropertyValue('--color-base-200')));
		context.font = font.value;
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		const numGrid = reshape(game.grid, 10, 10);
		for (const [x, _] of numGrid.entries()) {
			for (const [y, { value }] of numGrid[x].entries()) {
				const X = x * BOX_SIZE * 10;
				const Y = y * BOX_SIZE * 10;
				const TEXT_X = X + BOX_SIZE * 5;
				const TEXT_Y = Y + BOX_SIZE * 5;
				context.fillStyle = value > game.answer ? green : red;
				context.strokeStyle = border;
				context.lineWidth = 5;
				context.fillRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10);
				context.strokeRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10);
				context.fillStyle = 'white';
				context.fillText(value.toString(), TEXT_X, TEXT_Y);
			}
		}
	};
</script>

<Canvas bind:this={canvas} class="!size-96" bind:width bind:height>
	<Layer {render} />
</Canvas>
