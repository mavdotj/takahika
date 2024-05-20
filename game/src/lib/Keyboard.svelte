<script lang=ts>
    import { Delete, HelpCircle, Shuffle, ThumbsUp } from "svelte-lucide"
    import { game } from "./state"
    let text = ""
    $: number = parseInt(text)
    function submit() {
        if(text.length == 0) return
        game.guess(number)
        text = ""
    }

    function add(value: string) {
        text = text.concat(value)
    }

    function addButton(value: number) {
        return () => add(value.toString())
    }

    function handleKBD(e: KeyboardEvent) {
        if($game.modal) return
        if(e.code.startsWith("Digit")) {
            add(e.code[5])
        } else if(e.code == "Backspace") {
            remove()
        } else if(e.code == "Enter") {
            submit()
        }
    }

    function remove() {
        text = text.substring(0, text.length-1)
    }
</script>

<div class="flex flex-row w-fit">
    <button class="btn btn-circle btn-primary text-primary-content"  disabled={$game.modal !== false}>
        <HelpCircle />
    </button>
    <div class="flex-grow mx-4">
        <input value={text} type="text" class="input text-center max-w-xs w-full !text-base-content  !input-bordered !cursor-default" disabled>
    </div>
    <button on:click={game.shuffle} class="btn btn-circle btn-primary text-primary-content"  disabled={$game.modal !== false}>
        <Shuffle />
    </button>
</div>
<div class="flex flex-row gap-x-2 mt-4 scale-90">
    <button on:click={submit}  class="btn btn-circle btn-sm md:btn-md" disabled={$game.modal !== false}><ThumbsUp /></button>
    {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as number (number)}
        <button on:click={addButton(number)} class="btn btn-circle btn-outline btn-primary btn-sm md:btn-md"  disabled={$game.modal !== false}>{number}</button>
    {/each}
    <button on:click={remove}  class="btn btn-circle btn-sm md:btn-md"  disabled={$game.modal !== false}><Delete /></button>
</div>

<svelte:window on:keydown={handleKBD} />