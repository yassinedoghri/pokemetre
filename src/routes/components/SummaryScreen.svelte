<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    height: string;
    weight: string;
    onFind: MouseEventHandler<HTMLButtonElement>;
    onEditHeight: MouseEventHandler<HTMLButtonElement>;
    onEditWeight: MouseEventHandler<HTMLButtonElement>;
  }

  let { height, weight, onEditHeight, onEditWeight, onFind }: Props = $props();
</script>

<div class="grid h-full grid-cols-2">
  <div class="col-span-2 place-self-center">
    <dl class="grid grid-cols-3 gap-x-1 gap-y-4 place-self-center">
      <dt class="inline text-right">Height</dt>
      <dd class="col-span-2 text-right font-bold">
        <span class="inline-block w-[7ch] font-display-mono"
          >{height === "" ? "0" : height} cm</span
        ><button
          data-activatable
          type="button"
          onclick={onEditHeight}
          class="ml-2 !p-0 align-middle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class="text-2xl"
            ><title>Edit height</title><path
              fill="currentColor"
              d="M18 2h-2v2h2zM4 4h6v2H4v14h14v-6h2v8H2V4zm4 8H6v6h6v-2h2v-2h-2v2H8zm4-2h-2v2H8v-2h2V8h2V6h2v2h-2zm2-6h2v2h-2zm4 0h2v2h2v2h-2v2h-2v2h-2v-2h2V8h2V6h-2zm-4 8h2v2h-2z"
            /></svg
          >
        </button>
      </dd>

      <dt class="text-right">Weight</dt>
      <dd class="col-span-2 text-right font-bold">
        <span class="inline-block w-[7ch] font-display-mono"
          >{weight === "" ? "0" : weight} kg</span
        ><button
          data-activatable
          type="button"
          onclick={onEditWeight}
          class="ml-2 !p-0 align-middle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            class="text-2xl"
            ><title>Edit weight</title>
            <path
              fill="currentColor"
              d="M18 2h-2v2h2zM4 4h6v2H4v14h14v-6h2v8H2V4zm4 8H6v6h6v-2h2v-2h-2v2H8zm4-2h-2v2H8v-2h2V8h2V6h2v2h-2zm2-6h2v2h-2zm4 0h2v2h2v2h-2v2h-2v2h-2v-2h2V8h2V6h-2zm-4 8h2v2h-2z"
            /></svg
          ></button
        >
      </dd>
    </dl>
  </div>
  <button
    data-activatable
    data-is-active
    type="button"
    class="col-span-2 place-self-center"
    onclick={onFind}>Find my Pokémon!</button
  >
</div>
