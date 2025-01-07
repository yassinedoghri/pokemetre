<script lang="ts">
  import type { Pokemon } from "$lib/server/db/schema";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    pokemon: Pokemon;
    onHome: MouseEventHandler<HTMLButtonElement>;
  }

  let { pokemon, onHome }: Props = $props();

  // const imageModules = import.meta.glob("$lib/sprites/sprites/pokemon/*.png", {
  //   eager: true,
  //   query: {
  //     enhanced: true,
  //   },
  // });
</script>

<div class="">
  Success! Your pokemon is <strong>{pokemon.identifier}</strong>
  <!-- <enhanced:img
    src={imageModules[`/src/lib/sprites/sprites/pokemon/${pokemon.id}.png`]
      .default}
    alt={pokemon.identifier}
  /> -->
  <button tabindex={0} type="button" onclick={onHome}> Home </button>
</div>
