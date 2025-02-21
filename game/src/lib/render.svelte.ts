import Color from "colorjs.io"
import { delay } from "@std/async"

export const BOX_SIZE = 25

export let font = $state({ value: '' })

export function toHex(color: Color) {
    const newColor = Array.from(color.a98rgb)
    return newColor.reduce<string>((pre, value) => {
        const fullVal = Math.round(value * 255)
        return pre + (fullVal >= 16 ? "" : "0") + fullVal.toString(16)
    }, "#");
}
export function reshape<T>(array: Array<T>, rows: number, cols: number): T[][] {
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
export async function loadFont() {
    const FONT_VALUE = `${BOX_SIZE * 6}px 'RocknRoll One'`
    await document.fonts.load(FONT_VALUE).then(async () => {
        await delay(100)
        font.value = FONT_VALUE
    })
    // return FONT_VALUE
}