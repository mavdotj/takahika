<script lang=ts>
    import { derived } from "svelte/store"
    import { game, START_GUESSES } from "./state"
    import { Heart, HeartCrack } from "svelte-lucide"
    function range(size: number, startAt: number = 0): ReadonlyArray<number> {
        return [...Array(size).keys()].map(i => i + startAt)
    }
    const lives = derived(game, g => {
        return range(g.guessesLeft)
    })
    const deaths = derived(game, g => {
        return range(START_GUESSES - g.guessesLeft)
    })
</script>
<div class="flex flex-row mb-1">
{#each $lives as _}
    <Heart class="text-base-content fill-success" />
{/each}
{#each $deaths as _}
    <HeartCrack class="text-base-content fill-error"/>
{/each}
</div>