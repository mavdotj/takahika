<script lang="ts">
    import { onMount } from "svelte";
    function reshape<T>(array: Array<T>, rows: number, cols: number): T[][] {
        const newArray: T[][] = []

        for (var r = 0; r < rows; r++) {
            var row = [];
            for (var c = 0; c < cols; c++) {
                var i = r * cols + c;
                if (i < array.length) {
                    row.push(array[i]);
                }
            }
            newArray.push(row);
        }
        return newArray
    }
    function render(ctx: CanvasRenderingContext2D) {
        ctx.font = `${BOX_SIZE*8}px system-ui`;
        ctx.textAlign="center"
        ctx.textBaseline="middle"
        const grid = reshape(nums, 10, 10);
        for(const [x, _] of grid.entries()) {
            for(const [y, number] of grid[x].entries()) {
                const X = x*BOX_SIZE*10;
                const Y = y*BOX_SIZE*10;
                const TEXT_X = X+BOX_SIZE*5;
                const TEXT_Y = Y+BOX_SIZE*5
                ctx.fillStyle = "green"
                ctx.strokeStyle = "#D1D5DA"
                ctx.fillRect(X, Y, BOX_SIZE*10, BOX_SIZE*10)
                ctx.strokeRect(X, Y, BOX_SIZE*10, BOX_SIZE*10)
                ctx.fillStyle = "white"
                ctx.fillText(number.toString(), TEXT_X, TEXT_Y)
            }
        }
    }
    let canvas: HTMLCanvasElement;
    const BOX_SIZE = 25;
    const nums = new Array<number>(100).fill(99);
    onMount(() => {
        let ctx = canvas.getContext("2d");
        if(!ctx) throw new Error("unable to get ctx")
        const CANVAS_SIZE = BOX_SIZE*100;
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        render(ctx)
    });
</script><canvas bind:this={canvas}></canvas>