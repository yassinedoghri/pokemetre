<script lang="ts">
  import type {
    ChangeEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
  } from "svelte/elements";

  interface Props {
    name: string;
    label: string;
    defaultValue: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
  }

  let { name, label, defaultValue, onChange, onPrev, onNext }: Props = $props();

  const disableCursorMovement: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
      event.preventDefault();
    }
  };
</script>

<div class="flex h-full flex-col">
  <button tabindex={-1} type="button" class="self-start" onclick={onPrev}>
    Previous
  </button>
  <div class="grid flex-1 place-items-center">
    <label class="flex flex-col items-center">
      {label}
      <input
        tabindex={0}
        {name}
        type="number"
        value={defaultValue}
        onkeydown={disableCursorMovement}
        onchange={onChange}
      />
    </label>
  </div>
  <button tabindex={1} type="button" class="self-end" onclick={onNext}>
    Next
  </button>
</div>

<style lang="postcss">
  input {
    @apply border bg-transparent;
  }
</style>
