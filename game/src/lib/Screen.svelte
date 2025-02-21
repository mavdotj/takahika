<script lang=ts>
    // I had some people cheating in the previous versions of the game, and since I plan to make a leaderboard, I decided to make this a canvas instead of pure html
    import { onMount } from "svelte"
    import { Canvas, Layer, type Render } from "svelte-canvas"
    import { BOX_SIZE, font, loadFont, reshape, toHex } from "./render.svelte";
    import Color from "colorjs.io";
    import { getContext } from "svelte-typed-context";
    import { key } from "./key";
    let width = $state(0)
    let height = $state(0)
    let canvas = $state<Canvas>()

    let { game } = getContext(key)!
    
    // function render(
    //     ctx: CanvasRenderingContext2D,
    //     font: string
    // ) {
    //     ctx.reset()
    //     var style = getComputedStyle(document.body)
    //     const green = toHex(new Color(style.getPropertyValue("--color-success")))
    //     const red = toHex(new Color(style.getPropertyValue("--color-error")))
    //     const border = toHex(new Color(style.getPropertyValue("--color-base-200")))
    //     ctx.font = font
    //     ctx.textAlign = "center"
    //     ctx.textBaseline = "middle"
    //     ctx.lineWidth = 15
    //     const numGrid = reshape(game.grid, 10, 10)
    //     for (const [x, _] of numGrid.entries()) {
    //         for (const [y, { value }] of numGrid[x].entries()) {
    //             const X = x * BOX_SIZE * 10
    //             const Y = y * BOX_SIZE * 10
    //             const TEXT_X = X + BOX_SIZE * 5
    //             const TEXT_Y = Y + BOX_SIZE * 5
    //             ctx.fillStyle = value > game.answer ? green : red
    //             ctx.strokeStyle = border
    //             ctx.fillRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10)
    //             ctx.strokeRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10)
    //             ctx.fillStyle = "white"
    //             ctx.fillText(value.toString(), TEXT_X, TEXT_Y)
    //         }
    //     }
    // }
    // let canvas = $state<HTMLCanvasElement>()
    // function rerender() {
    //     rerenderValue.set(Symbol())
    // }

    // const rerenderValue = writable()
    // onMount(async () => {
    //     let ctx = canvas?.getContext("2d", { alpha: false })
    //     if (!canvas || !ctx) throw new Error("unable to get ctx")
    //     const CANVAS_SIZE = BOX_SIZE * 100
    //     canvas.width = CANVAS_SIZE
    //     canvas.height = CANVAS_SIZE
    //     const font = await loadFont()
    //     game.subscribe(rerender)
    //     rerenderValue.subscribe(render.bind(null, ctx, font))
    //     setTimeout(() => rerender(), 400)
    // });
    
    onMount(async () => {
        const CANVAS_SIZE = BOX_SIZE * 50
        console.log(CANVAS_SIZE)
        width = CANVAS_SIZE
        height = CANVAS_SIZE
        await loadFont()
    })

    const render: Render = ({ context, width }) => {
        console.log("render")
        context.reset()
        let style = getComputedStyle(document.body)
        const green = toHex(new Color(style.getPropertyValue("--color-success")))
        const red = toHex(new Color(style.getPropertyValue("--color-error")))
        const border = toHex(new Color(style.getPropertyValue("--color-base-200")))
        const borderSize = style.getPropertyValue("--border")
        context.font = font.value
        context.textAlign = "center"
        context.textBaseline = "middle"
        const numGrid = reshape(game.grid, 10, 10)
        for (const [x, _] of numGrid.entries()) {
            for (const [y, { value }] of numGrid[x].entries()) {
                const X = x * BOX_SIZE * 10
                const Y = y * BOX_SIZE * 10
                const TEXT_X = X + BOX_SIZE * 5
                const TEXT_Y = Y + BOX_SIZE * 5
                context.fillStyle = value > game.answer ? green : red
                context.strokeStyle = border
                context.lineWidth = 5
                context.fillRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10)
                context.strokeRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10)
                context.fillStyle = "white"
                context.fillText(value.toString(), TEXT_X, TEXT_Y)
            }
        }
    }
</script>

<!-- 
<canvas class="h-96" onclick={rerender}  bind:this={canvas}></canvas>
 -->

<Canvas bind:this={canvas} class="!size-96" bind:width bind:height>
    <Layer {render} />
</Canvas>