<script lang=ts>
    import { onMount } from "svelte"
    import { game } from "./state"
    import Color from "colorjs.io"
    import { writable } from "svelte/store"

    function toHex(color: Color) {
        const newColor = Array.from(color.a98rgb)
        return newColor.reduce<string>((pre, value) => {
            const fullVal = Math.round(value * 255)
            return pre + (fullVal >= 16 ? "" : "0") + fullVal.toString(16)
        }, "#");
    }
    function reshape<T>(array: Array<T>, rows: number, cols: number): T[][] {
        const newArray: T[][] = []

        for (var r = 0; r < rows; r++) {
            var row = []
            for (var c = 0; c < cols; c++) {
                var i = r * cols + c
                if (i < array.length) {
                    row.push(array[i])
                }
            }
            newArray.push(row)
        }
        return newArray
    }
    async function loadFont() {
        const FONT_VALUE = `${BOX_SIZE * 6}px 'RocknRoll One`
        await document.fonts.load(FONT_VALUE).then(() => {
            console.log(document.fonts.check(FONT_VALUE))
            rerender()
        })
        return FONT_VALUE
    }
    function render(
        ctx: CanvasRenderingContext2D,
        font: string
    ) {
        ctx.reset()
        var style = getComputedStyle(document.body);
        const green = toHex(new Color(`oklch(${style.getPropertyValue("--su")})`));
        const red = toHex(new Color(`oklch(${style.getPropertyValue("--er")})`));
        const border = toHex(new Color( `oklch(${style.getPropertyValue("--b2")})`));
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 15;
        const numGrid = reshape($game.grid, 10, 10);
        for (const [x, _] of numGrid.entries()) {
            for (const [y, { value }] of numGrid[x].entries()) {
                const X = x * BOX_SIZE * 10;
                const Y = y * BOX_SIZE * 10;
                const TEXT_X = X + BOX_SIZE * 5;
                const TEXT_Y = Y + BOX_SIZE * 5;
                ctx.fillStyle = value > $game.answer ? green : red;
                ctx.strokeStyle = border;
                ctx.fillRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10);
                ctx.strokeRect(X, Y, BOX_SIZE * 10, BOX_SIZE * 10);
                ctx.fillStyle = "white";
                ctx.fillText(value.toString(), TEXT_X, TEXT_Y);
            }
        }
    }
    let canvas: HTMLCanvasElement;
    const BOX_SIZE = 25;
    function rerender() {
        rerenderValue.set(Symbol())
    }

    const rerenderValue = writable()
    onMount(async () => {
        let ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) throw new Error("unable to get ctx");
        const CANVAS_SIZE = BOX_SIZE * 100;
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const font = await loadFont()
        game.subscribe(rerender)
        rerenderValue.subscribe(() => {
            render(ctx, font);
        })
        setTimeout(() => rerender(), 400)
    });
</script>

<canvas class="h-96" on:click={rerender}  bind:this={canvas}></canvas>
<svelte:window on:focus={rerender} />