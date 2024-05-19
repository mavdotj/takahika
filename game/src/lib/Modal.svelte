<script>
    import { game } from "./state";
</script>

<input type="checkbox" checked={$game.modal !== false} class="modal-toggle" />
<div class="modal" role="dialog">
    <div class="modal-box">
        <h3 class="font-bold text-lg" class:text-success={$game.modal=="pass"} class:text-error={$game.modal=="fail"}>{#if $game.modal == "pass"}You won!{:else if $game.modal == "fail"}You Failed{/if}</h3>
        <p class="py-4"></p>
        <div class="modal-action">
            <button on:click={() => game.reset()} disabled={$game.modal == false} class="btn">Ok</button>
        </div>
    </div>
</div>
