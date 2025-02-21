<script lang=ts>
    import { getContext } from "svelte-typed-context"
    import { key } from "./key"
    let { game } = getContext(key)!
    import { START_GUESSES } from "./state.svelte"
    import { Heart, HeartCrack } from "svelte-lucide"
    function range(size: number, startAt: number = 0): ReadonlyArray<number> {
        return [...Array(size).keys()].map(i => i + startAt)
    }
    const lives = $derived(range(game.guessesLeft))
    const deaths = $derived(range(START_GUESSES - game.guessesLeft))
</script>
<div class="flex flex-row mb-1">
{#each lives as _}
    <Heart class="text-base-content fill-success" />
{/each}
{#each deaths as _}
    <HeartCrack class="text-base-content fill-error"/>
{/each}
</div>