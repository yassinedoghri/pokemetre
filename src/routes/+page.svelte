<script lang="ts">
  import ActionButtons from "./components/ActionButtons.svelte";
  import DisplayPanel from "./components/DisplayPanel.svelte";
  import DPad from "./components/DPad.svelte";
  import NumPad from "./components/NumPad.svelte";
</script>

<header class="flex items-center justify-between p-4">
  <div class="indicators">
    <div class="loading"><span class="sr-only">Loading indicator</span></div>
    <div class="sound"><span class="sr-only">Sound indicator</span></div>
  </div>
  <h1 class="text-right text-xl font-bold">Pokémètre</h1>
</header>
<main class="px-4">
  <div class="screen">
    <div class="steps-indicators">
      <div class="step"><span class="sr-only">Step 1 - Height</span></div>
      <div class="step"><span class="sr-only">Step 2 - Weight</span></div>
    </div>
    <DisplayPanel />
    <div class="power-indicator"><span class="sr-only">On</span></div>
    <div class="speakers"></div>
  </div>
  <div class="grid grid-cols-2 gap-x-8 gap-y-4 p-4">
    <NumPad />
    <DPad />
    <ActionButtons />
  </div>
</main>
<footer class="mt-auto py-2 text-center text-xs">© Yassine Doghri</footer>

<style lang="postcss">
  .indicators {
    @apply flex items-center gap-x-3;

    .loading {
      @apply aspect-square w-12 rounded-full border-4 border-white bg-blue-400;
    }

    .sound {
      @apply aspect-square w-4 rounded-full bg-black;
    }
  }

  .screen {
    @apply relative aspect-[4/3] w-full rounded-md bg-white px-8 pb-12 pt-8;

    .steps-indicators {
      @apply absolute inset-x-0 top-3 flex items-center justify-center gap-x-2;

      .step {
        @apply aspect-square w-2 rounded-full bg-black;
      }
    }

    .power-indicator {
      @apply absolute bottom-4 left-8 aspect-square w-4 rounded-full bg-red-500;
    }

    .speakers {
      @apply absolute bottom-5 right-8 h-2 w-16 rounded-full bg-black;

      &::before {
        @apply absolute bottom-3 h-2 w-16 rounded-full bg-black content-[''];
      }

      &::after {
        @apply absolute -bottom-3 h-2 w-16 rounded-full bg-black content-[''];
      }
    }
  }
</style>
