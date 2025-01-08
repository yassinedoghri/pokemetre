<script lang="ts">
  import type { FormEventHandler, MouseEventHandler } from "svelte/elements";

  interface Props {
    name: string;
    label: string;
    defaultValue: string;
    onInput: FormEventHandler<HTMLInputElement>;
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
  }

  let { name, label, defaultValue, onInput, onPrev, onNext }: Props = $props();
</script>

<div class="grid h-full grid-cols-2">
  <div class="col-span-2 grid place-items-center">
    <label class="flex flex-col items-center">
      {label}
      <input
        {name}
        type="number"
        min="0"
        value={defaultValue}
        oninput={onInput}
      />
    </label>
  </div>
  <button data-active-index="-1" type="button" onclick={onPrev}>
    Previous
  </button>
  <button data-active-index="0" type="button" onclick={onNext}> Next </button>
</div>

<style lang="postcss">
  input {
    @apply border bg-transparent;
  }
</style>
