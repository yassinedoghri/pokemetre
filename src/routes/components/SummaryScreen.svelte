<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    height: string;
    weight: string;
    onFind: MouseEventHandler<HTMLButtonElement>;
    onPrev: MouseEventHandler<HTMLButtonElement>;
  }

  let { height, weight, onPrev, onFind }: Props = $props();
</script>

<div class="flex h-full flex-col">
  <button
    data-active-index="-1"
    type="button"
    class="self-start"
    onclick={onPrev}>Previous</button
  >
  <div class="grid flex-1">
    <dl class="grid grid-cols-2 gap-x-4 gap-y-2 place-self-center">
      <dt>Height</dt>
      <dd class="font-bold">{height === "" ? "N/A" : height} cm</dd>

      <dt>Weight</dt>
      <dd class="font-bold">{weight === "" ? "N/A" : weight} KG</dd>
    </dl>
  </div>
  <button data-active-index="0" type="button" onclick={onFind}>FIND</button>
</div>
