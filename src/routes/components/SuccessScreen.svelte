<script lang="ts">
  import type { Pokemon } from "$lib/server/db/schema";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    pokemon: Pokemon;
    onHome: MouseEventHandler<HTMLButtonElement>;
  }

  let { pokemon, onHome }: Props = $props();

  // set volume to 0.1 so that people don't get a heart attack.
  // I almost died.
  let pokemonCryAudioVolume = $state(0.1);
</script>

<div class="grid h-full grid-cols-2 grid-rows-3">
  <h1 class="text-lg">
    Your Pokémon is <strong>{pokemon.identifier}</strong>!
  </h1>
  <img
    src={`/images/pokemons/${pokemon.id}.png`}
    alt={pokemon.identifier}
    class="col-start-2 row-span-3 h-full mix-blend-overlay transition-all hover:mix-blend-normal"
  />
  <button
    data-active-index="0"
    type="button"
    class="row-start-3 mt-auto"
    onclick={onHome}>Home</button
  >
</div>

<audio autoplay bind:volume={pokemonCryAudioVolume}>
  <source src={`/audio/pokemons/${pokemon.id}.ogg`} type="audio/ogg" />
</audio>
