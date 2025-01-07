<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { ResponseError } from "../pokemetreMachine";

  interface Props {
    error: ResponseError;
    onRetry: MouseEventHandler<HTMLButtonElement>;
  }

  let { error, onRetry }: Props = $props();
</script>

<div class="flex flex-col items-center">
  Oops, something happened!

  <p>{error.status}: {error.statusText}</p>
  <p>{error.message}</p>

  <button tabindex={0} type="button" onclick={onRetry}> Retry </button>
</div>
