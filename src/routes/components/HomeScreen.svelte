<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    onStart: MouseEventHandler<HTMLButtonElement>;
    onAbout: MouseEventHandler<HTMLButtonElement>;
  }

  let { onStart, onAbout }: Props = $props();
</script>

<div class="relative grid h-full">
  <button
    data-activatable
    class="absolute right-0 top-0 ml-auto !px-0 text-2xl"
    onclick={onAbout}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      ><title>About</title><path
        fill="currentColor"
        d="M3 3h2v18H3zm16 0H5v2h14v14H5v2h16V3zm-8 6h2V7h-2zm2 8h-2v-6h2z"
      /></svg
    ></button
  >
  <button
    data-activatable
    data-is-active
    type="button"
    class="place-self-center"
    onclick={onStart}>Start</button
  >
</div>
