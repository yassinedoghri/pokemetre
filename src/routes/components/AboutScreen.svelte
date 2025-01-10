<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    onOK: MouseEventHandler<HTMLButtonElement>;
  }

  let { onOK }: Props = $props();
</script>

<div class="flex h-full flex-col items-center">
  <p class="text-sm">
    Made with <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      class="inline"
      viewBox="0 0 24 24"
      ><title>love</title><path
        fill="currentColor"
        d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4z"
      /></svg
    >
    by
    <a href="https://yassinedoghri.com/" data-activatable target="_blank"
      >Yassine Doghri</a
    >
    during the
    <a
      data-activatable
      href="https://hack.sveltesociety.dev/2024"
      target="_blank">2024 SvelteHack</a
    >
    using data from
    <a data-activatable href="https://pokeapi.co/" target="_blank">PokéAPI</a>.
  </p>

  <div class="mt-auto flex w-full items-center justify-between">
    <div class="flex flex-col items-start gap-y-2 text-sm">
      <a
        href="https://github.com/yassinedoghri/pokemetre/blob/main/LICENSE.md"
        data-activatable
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="text-lg"
          ><title>License</title><path
            fill="currentColor"
            d="M6 3h14v2h2v6h-2v8h-2V5H6zm8 14v-2H6V5H4v10H2v4h2v2h14v-2h-2v-2zm0 0v2H4v-2zM8 7h8v2H8zm8 4H8v2h8z"
          /></svg
        >AGPL-3.0</a
      >
      <a href="https://github.com/yassinedoghri/pokemetre" data-activatable
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          class="text-lg"
          ><title>Git repository</title><path
            fill="currentColor"
            d="M6 2h12v2H6zm4 12H8v-2h2zm4 0v2h-4v-2zm0 0v-2h2v2z"
          /><path
            fill="currentColor"
            d="M6 6V4H4v2H2v12h2v2h2v2h12v-2h2v-2h2V6h-2V4h-2v2h-2v2H8V6zm2 6v-2h8v2h2V6h2v12h-2v2h-2v-4h-2v4h-4v-4H6v2h2v2H6v-2H4v-2h2v-2H4V6h2v6z"
          /></svg
        >Code</a
      >
    </div>

    <button
      data-activatable
      data-is-active
      type="button"
      class="mt-4"
      onclick={onOK}>Gotcha!</button
    >
  </div>
</div>
