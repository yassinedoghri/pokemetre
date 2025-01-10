<script lang="ts">
  import { page } from "$app/state";
  import type { Pokemon } from "$lib/server/db/schema";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    pokemon: Pokemon;
    height: string;
    weight: string;
    onHome: MouseEventHandler<HTMLButtonElement>;
  }

  let { pokemon, height, weight, onHome }: Props = $props();

  let clickedOnShare = $state(false);
  let timer: ReturnType<typeof setTimeout> | null = $state(null);
  const share = () => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    const shareableLink = `${page.url.origin}/?height=${height}&weight=${weight}`;

    navigator.clipboard.writeText(shareableLink);

    clickedOnShare = true;

    timer = setTimeout(() => {
      clickedOnShare = false;
    }, 2000);
  };
</script>

<div class="grid h-full grid-cols-2 grid-rows-2">
  <h1 class="text-lg leading-tight">
    Your Pokémon is <strong>{pokemon.identifier}</strong>!
  </h1>
  <img
    src={`/images/pokemons/${pokemon.id}.png`}
    alt={pokemon.identifier}
    class="col-start-2 row-span-3 h-full mix-blend-overlay transition-all hover:mix-blend-normal"
  />
  <div
    class="row-span-2 row-start-2 flex flex-col items-start justify-end gap-y-2"
  >
    <button data-activatable type="button" onclick={onHome}>Home</button>
    <div class="relative flex">
      <button data-activatable data-is-active type="button" onclick={share}
        >Share</button
      >
      {#if clickedOnShare}
        <span
          class="motion-preset-confetti absolute left-full top-0 ml-2 w-16 text-xs"
          >Copied to clipboard!</span
        >
      {/if}
    </div>
  </div>
</div>

<!-- set volume to 0.1 so that people don't get a heart attack. I almost died. -->
<audio autoplay volume={0.1}>
  <source src={`/audio/pokemons/${pokemon.id}.ogg`} type="audio/ogg" />
</audio>
