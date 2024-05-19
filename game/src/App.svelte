<script lang="ts">
    import Screen from './lib/Screen.svelte';
    import Keyboard from './lib/Keyboard.svelte';
    import Modal from './lib/Modal.svelte';
</script>

<Modal />
<main class="w-full h-full flex flex-col overflow-hidden items-center justify-center">
  <h1 class="font-title text-5xl">TAKAHIKA</h1>
  <div class="flex flex-col mt-10 items-center">
    <div class="flex flex-row mb-4 items-center justify-center">
      <Screen />
    </div>
    <Keyboard />
  </div>
</main>
