<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const imageModules = import.meta.glob("$lib/sprites/sprites/pokemon/*.png", {
    eager: true,
    query: {
      enhanced: true,
    },
  });
</script>

<div class="text-center">
  <h1 class="text-4xl font-bold">Pokémètre</h1>
  <p>Set your height and weight to reveal your Pokémon mate!</p>
  <p>Adjust your scale to unveil your Pokémon tale!</p>
  <p>Enter your stats, and see where your Pokémon’s at!</p>
  <p>With height and weight in sight, find your Pokémon that’s just right!</p>
  <p>Input your height and weight to find your Poké soulmate!</p>
  <p>Set your scale and wait, to find your Pokémon fate!</p>
  <p>Check your weight and your height to find your Pokémon light!</p>
  <p>Height and weight combined will match your Pokémon kind!</p>
  <form action="/">
    <label>
      Your height (in cm)
      <input name="height" type="number" value={data.query?.height ?? ""} />
    </label>
    <label>
      Your weight (in KG)
      <input name="weight" type="number" value={data.query?.weight ?? ""} />
    </label>
    <button>Find your Pokémon!</button>
  </form>
  {#if data.success}
    <p class="font-bold">Your pokepal is {data.pokepal.identifier}</p>
    <enhanced:img
      src={imageModules[
        `/src/lib/sprites/sprites/pokemon/${data.pokepal.id}.png`
      ].default}
      alt={data.pokepal.identifier}
    />
  {/if}
</div>
