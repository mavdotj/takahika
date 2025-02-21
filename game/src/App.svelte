<script lang="ts">
  import Screen from "./lib/Screen.svelte";
  import Keyboard from "./lib/Keyboard.svelte";
  import Modal from "./lib/Modal.svelte";
  import Heartbar from "./lib/Heartbar.svelte";
  import Wrapper from "./lib/Wrapper.svelte";
</script>

<Wrapper>
  <Modal />
  <main
    class="w-full h-full flex flex-col overflow-hidden items-center justify-center"
  >
    <h1 class="font-title text-5xl">TAKAHIKA</h1>
    <div class="flex flex-col mt-10 items-center">
      <div class="flex flex-row mb-4 items-center justify-center">
        <Screen />
      </div>
      <span class="mb-1 text-xs"
        >(If the grid does not load, or the text looks old, click/tap it)</span
      >
      <Heartbar />
      <Keyboard />
    </div>
  </main>
</Wrapper>
