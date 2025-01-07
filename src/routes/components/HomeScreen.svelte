<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    onStart: MouseEventHandler<HTMLButtonElement>;
  }

  let { onStart }: Props = $props();
</script>

<div class="grid h-full place-items-center">
  <button tabindex={0} type="button" onclick={onStart}>Start</button>
</div>
