<script lang=ts>
    import { onMount } from "svelte";
    import { game } from "./state"
    import { derived } from "svelte/store";
    let HTMLbutton: HTMLButtonElement;
    let answer: number = 0;
    const LOSE_MESSAGES = [
        "Bruh \u{1f480}...",
        "That wasn't right.",
        "C'mon this is easy.",
        "Womp womp...",
        "You suck \u{1f923} \u{1faf5}\u{1f3fe}",
        "BOO YOU STINK",
        "What made you think that was right? \u{1f62d}",
    ];
    const WIN_MESSAGES = [
        "YEAH! \u{1f60e}",
        "Good job",
        "RAHHHHH!!!!!",
    ];
    const message = derived(game, game => {
        if(game.modal !== false) {
            if(game.modal === "fail") {
                return LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)]
            } else if(game.modal === "pass") {
                return WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
            }
        }
    })
    onMount(() => {
        game.subscribe(g => {
            if(g.modal !== false) {
                HTMLbutton.focus()
                answer = g.answer
            }
        })
    })
</script>

<input type="checkbox" checked={$game.modal !== false} class="modal-toggle" />
<div class="modal" role="dialog">
    <div class="modal-box">
        <h3 class="font-bold text-md" class:text-success={$game.modal=="pass"} class:text-error={$game.modal=="fail"}>{$message}</h3>
        <p class="py-4">The answer was {answer}</p>
        <div class="modal-action">
            <button bind:this={HTMLbutton} on:click={() => game.reset()} disabled={$game.modal == false} class="btn">Ok</button>
        </div>
    </div>
</div>
