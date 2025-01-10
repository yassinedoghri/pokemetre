<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import Controls from "./components/Controls.svelte";
  import ScreenBase from "./components/ScreenBase.svelte";
  import { pokemetreMachine } from "./pokemetreMachine";
  import "../styles/app.css";
  import { page } from "$app/state";
  import SvelteSeo from "svelte-seo";
  import { pwaInfo } from "virtual:pwa-info";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

  const defaultHeight = page.url.searchParams.get("height");
  const defaultWeight = page.url.searchParams.get("weight");

  const machine = useMachine(pokemetreMachine, {
    input: {
      defaultHeight: defaultHeight ?? "",
      defaultWeight: defaultWeight ?? "",
    },
  });
</script>

<svelte:head>
  <!-- eslint-disable-next-line -->
  {@html webManifestLink}
</svelte:head>

<SvelteSeo
  title="Pokémètre"
  description="Pokémètre is a console that matches you with one of the 1300+ Pokémon known to existence."
  canonical="https://pokemetre.yassinedoghri.com/"
  openGraph={{
    title: "Pokémètre",
    description:
      "Pokémètre is a console that matches you with one of the 1300+ Pokémon known to existence.",
    image: "https://pokemetre.yassinedoghri.com/images/pokemetre-og.jpg",
    url: "https://pokemetre.yassinedoghri.com/",
    type: "website",
    images: [
      {
        url: "https://pokemetre.yassinedoghri.com/images/pokemetre-og.jpg",
        width: 1200,
        height: 630,
        alt: "Huge Pokémètre logo on the left with a Pokémètre device displaying a pixelated surprised Pikachu face on the right.",
      },
    ],
    site_name: "Pokémètre",
  }}
  twitter={{
    card: "summary_large_image",
    creator: "@yassinedoghri",
  }}
/>

<div
  id="pokemetre"
  class="flex h-full w-full max-w-sm flex-col bg-red-800 text-white xs:h-[inherit] xs:max-h-[700px] xs:rounded-3xl xs:shadow-2xl"
>
  <header class="flex items-center justify-between p-4">
    <div class="indicators">
      <div class="loader">
        <span class="sr-only">Loading indicator</span>
        <span class="loader-bulb"></span>
        <span class="loader-base"></span>
      </div>
      <div class="sound"><span class="sr-only">Sound indicator</span></div>
    </div>
    <h1 class="text-right text-xl font-bold text-red-950">Pokémètre</h1>
  </header>
  <main class="px-4 pb-10">
    <ScreenBase {machine} />
    <Controls />
  </main>
</div>

<style lang="postcss">
  #pokemetre {
    @apply bg-blend-multiply;

    background-image: url("/images/noise.svg");
  }

  .indicators {
    @apply flex items-center gap-x-3;

    .loader {
      @apply relative aspect-square w-12 p-1;

      .loader-base {
        @apply absolute left-0 top-0 z-20 h-full w-full -translate-y-0.5 rounded-full bg-red-50;

        box-shadow:
          inset 0 1px 0 0 theme(colors.white),
          inset 0 -1px 0 0 theme(colors.black / 0.05);
      }

      &::after {
        @apply absolute left-0 top-0 z-10 h-full w-full rounded-full content-[''];

        background: linear-gradient(
          to left,
          theme(colors.stone.500) 0%,
          theme(colors.red.100) 20%,
          theme(colors.red.100) 80%,
          theme(colors.stone.500) 100%
        );
      }

      &::before {
        @apply absolute left-0 top-0 z-0 h-full w-full translate-y-0.5 rounded-full bg-red-900 content-[''];
      }

      .loader-bulb {
        @apply relative z-30 block h-full w-full -translate-y-0.5 rounded-full bg-blue-300;

        box-shadow:
          inset 0 -9px 4px -6px theme(colors.blue.600 / 35%),
          inset 4px 3px 0 0 theme(colors.blue.300),
          inset -2px 5px 0 0 theme(colors.blue.300),
          inset 3px 9px 0 0 theme(colors.white / 40%),
          0 1px 2px 0 theme(colors.black / 20%);
      }
    }

    .sound {
      @apply aspect-square w-4 rounded-full bg-green-400;

      box-shadow:
        inset 0 -10px 10px -8px theme(colors.green.600),
        inset 3px 1px 0 0 theme(colors.green.400),
        inset -1px 3px 0 0 theme(colors.green.400),
        inset 3px 5px 0 0 theme(colors.white / 40%),
        0 0 10px 0 theme(colors.green.300 / 75%);
    }
  }
</style>
