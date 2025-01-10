<script lang="ts">
  import type { FormEventHandler, MouseEventHandler } from "svelte/elements";

  interface Props {
    step: number;
    name: string;
    label: string;
    defaultValue: string;
    onInput: FormEventHandler<HTMLInputElement>;
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
  }

  let { step, name, label, defaultValue, onInput, onPrev, onNext }: Props =
    $props();
</script>

<div class="grid h-full grid-cols-2">
  <div class="col-span-2 flex flex-col items-start place-self-start px-4">
    <span class="font-display-mono">{step}/2</span>
    <label class="flex flex-col">
      {label}
      <div class="h-12 font-display-mono font-bold after:animate-blink">
        {defaultValue}
      </div>
      <input
        {name}
        type="number"
        min="0"
        max="9999"
        value={defaultValue}
        oninput={onInput}
      />
    </label>
  </div>
  <div class="col-span-2 flex items-center justify-around">
    <button data-activatable type="button" onclick={onPrev}>Previous</button>
    <button data-activatable data-is-active type="button" onclick={onNext}
      >Next</button
    >
  </div>
</div>

<style lang="postcss">
  label {
    @apply text-xl font-bold;

    div {
      @apply relative text-5xl;

      &::after {
        @apply absolute h-full w-[1ch] bg-screen-contrast content-[''];
      }
    }

    input {
      @apply absolute h-0 w-0 opacity-0;
    }
  }
</style>
