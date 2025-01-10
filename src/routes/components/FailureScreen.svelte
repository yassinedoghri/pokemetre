<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { ResponseError } from "../pokemetreMachine";

  interface Props {
    error: ResponseError;
    onRetry: MouseEventHandler<HTMLButtonElement>;
  }

  let { error, onRetry }: Props = $props();
</script>

<div class="grid h-full grid-cols-2 grid-rows-3">
  <img
    alt="missing no."
    src="./images/missing-no.svg"
    class="row-span-3 row-start-1 h-full place-self-center mix-blend-color-burn"
  />
  <div class="row-span-2">
    <h1 class="font-display-mono text-xs font-bold">
      {error.status} - {error.statusText}
    </h1>
    <p>{error.message}</p>
  </div>

  <button
    data-activatable
    data-is-active
    type="button"
    class="row-start-3 place-self-start"
    onclick={onRetry}>Retry</button
  >
</div>
