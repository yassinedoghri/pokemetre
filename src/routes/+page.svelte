<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { pokemetreMachine } from "./pokemetreMachine";

  const imageModules = import.meta.glob("$lib/sprites/sprites/pokemon/*.png", {
    eager: true,
    query: {
      enhanced: true,
    },
  });

  const { snapshot, send } = useMachine(pokemetreMachine);
</script>

<header class="flex items-center justify-between p-4">
  <div class="indicators">
    <div class="loading"><span class="sr-only">Loading indicator</span></div>
    <div class="sound"><span class="sr-only">Sound indicator</span></div>
  </div>
  <h1 class="text-right text-xl font-bold">Pokémètre</h1>
</header>
<main class="px-4">
  <form>
    <div class="screen">
      <div class="steps-indicators">
        <div class="step"><span class="sr-only">Step 1 - Height</span></div>
        <div class="step"><span class="sr-only">Step 2 - Weight</span></div>
      </div>
      <div class="display-panel flex flex-col p-4">
        {#if $snapshot.matches("idle")}
          <button
            type="button"
            onclick={() => {
              send({ type: "START" });
            }}
          >
            Start
          </button>
        {:else if $snapshot.matches("setHeight")}
          <label>
            Your height (in cm)
            <input
              name="height"
              type="number"
              value={$snapshot.context.height ?? ""}
              onchange={(event) => {
                send({
                  type: "height.UPDATE",
                  height: event.currentTarget.value,
                });
              }}
            />
          </label>
          <button
            type="button"
            onclick={() => {
              send({ type: "NEXT" });
            }}
          >
            Next
          </button>
          <button
            type="button"
            onclick={() => {
              send({ type: "PREV" });
            }}
          >
            Previous
          </button>
        {:else if $snapshot.matches("setWeight")}
          <label>
            Your weight (in KG)
            <input
              name="weight"
              type="number"
              value={$snapshot.context.weight ?? ""}
              onchange={(event) => {
                send({
                  type: "weight.UPDATE",
                  weight: event.currentTarget.value,
                });
              }}
            />
          </label>
          <button
            type="button"
            onclick={() => {
              send({ type: "NEXT" });
            }}
          >
            Next
          </button>
          <button
            type="button"
            onclick={() => {
              send({ type: "PREV" });
            }}
          >
            Previous
          </button>
        {:else if $snapshot.matches("summary")}
          Height: {$snapshot.context.height} cm
          <br />
          Weight: {$snapshot.context.weight} kg
          <br />
          <button
            type="button"
            onclick={() => {
              send({ type: "PREV" });
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onclick={() => {
              send({ type: "FIND" });
            }}
          >
            FIND!
          </button>
        {:else if $snapshot.matches("loadingPokemon")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            ><g
              ><circle
                cx="12"
                cy="2.5"
                r="1.5"
                fill="currentColor"
                opacity="0.14"
              /><circle
                cx="16.75"
                cy="3.77"
                r="1.5"
                fill="currentColor"
                opacity="0.29"
              /><circle
                cx="20.23"
                cy="7.25"
                r="1.5"
                fill="currentColor"
                opacity="0.43"
              /><circle
                cx="21.5"
                cy="12"
                r="1.5"
                fill="currentColor"
                opacity="0.57"
              /><circle
                cx="20.23"
                cy="16.75"
                r="1.5"
                fill="currentColor"
                opacity="0.71"
              /><circle
                cx="16.75"
                cy="20.23"
                r="1.5"
                fill="currentColor"
                opacity="0.86"
              /><circle
                cx="12"
                cy="21.5"
                r="1.5"
                fill="currentColor"
              /><animateTransform
                attributeName="transform"
                calcMode="discrete"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
              /></g
            ></svg
          >
        {:else if $snapshot.matches("failure")}
          Oops... something weird happened!

          <button
            type="button"
            onclick={() => {
              send({ type: "RETRY" });
            }}
          >
            Retry
          </button>
        {:else if $snapshot.matches("success") && $snapshot.context.pokemon !== null}
          Success! Your pokemon is
          <strong>{$snapshot.context.pokemon.identifier}</strong>
          <enhanced:img
            src={imageModules[
              `/src/lib/sprites/sprites/pokemon/${$snapshot.context.pokemon.id}.png`
            ].default}
            alt={$snapshot.context.pokemon.identifier}
          />
          <button
            type="button"
            onclick={() => {
              send({ type: "START_AGAIN" });
            }}
          >
            Start again
          </button>
        {/if}
      </div>
      <div class="power-indicator"><span class="sr-only">On</span></div>
      <div class="speakers"></div>
    </div>
    <div class="controls">
      <div class="numpad">
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <button type="button">6</button>
        <button type="button">7</button>
        <button type="button">8</button>
        <button type="button">9</button>
        <button type="button">0</button>
      </div>
      <div class="d-pad">
        <button type="button" class="up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <title>up</title><path d="M12 8L18 14H6L12 8Z"></path></svg
          >
        </button>
        <button type="button" class="down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <title>down</title><path d="M12 16L6 10H18L12 16Z"></path></svg
          >
        </button>
        <div class="center"></div>
        <button type="button" class="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <title>left</title><path d="M8 12L14 6V18L8 12Z"></path></svg
          >
        </button>
        <button type="button" class="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <title>right</title><path d="M16 12L10 18V6L16 12Z"></path></svg
          >
        </button>
      </div>
      <div class="action-buttons">
        <input type="reset" class="reset" value="reset" />
        <button type="submit" class="select">select</button>
      </div>
    </div>
  </form>
</main>
<footer class="mt-auto py-2 text-center text-xs">© Yassine Doghri</footer>

<style lang="postcss">
  .indicators {
    @apply flex items-center gap-x-3;

    .loading {
      @apply aspect-square w-12 rounded-full border-4 border-white bg-blue-400;
    }

    .sound {
      @apply aspect-square w-4 rounded-full bg-black;
    }
  }

  .screen {
    @apply relative aspect-[4/3] w-full rounded-md bg-white px-8 pb-12 pt-8;

    .steps-indicators {
      @apply absolute inset-x-0 top-3 flex items-center justify-center gap-x-2;

      .step {
        @apply aspect-square w-2 rounded-full bg-black;
      }
    }

    .display-panel {
      @apply h-full bg-zinc-800;

      input {
        @apply border bg-transparent;
      }
    }

    .power-indicator {
      @apply absolute bottom-4 left-8 aspect-square w-4 rounded-full bg-red-500;
    }

    .speakers {
      @apply absolute bottom-5 right-8 h-2 w-16 rounded-full bg-black;

      &::before {
        @apply absolute bottom-3 h-2 w-16 rounded-full bg-black content-[''];
      }

      &::after {
        @apply absolute -bottom-3 h-2 w-16 rounded-full bg-black content-[''];
      }
    }
  }

  .controls {
    @apply grid grid-cols-2 gap-x-8 gap-y-4 p-4;
  }

  .numpad {
    @apply col-span-2 grid grid-cols-5 gap-2 rounded-lg bg-red-900 p-4;

    button {
      @apply aspect-square rounded bg-blue-500 text-2xl font-bold;
    }
  }

  .d-pad {
    @apply grid h-32 w-32 grid-cols-3 grid-rows-3 rounded-full bg-red-900 p-4;

    > * {
      @apply bg-black;
    }

    .up,
    .down,
    .center {
      @apply col-start-2;
    }

    .left,
    .right,
    .center {
      @apply row-start-2;
    }

    .up {
      @apply rounded-t;
    }

    .down {
      @apply row-start-3 rounded-b;
    }

    .left {
      @apply rounded-l;
    }

    .right {
      @apply col-start-3 rounded-r;
    }
  }

  .action-buttons {
    @apply relative grid aspect-square w-28 grid-cols-2 grid-rows-2 place-self-center;

    &::before {
      @apply absolute bottom-0 left-0 h-full w-14 translate-x-1/2 rotate-45 scale-125 scale-y-[135%] rounded-full bg-red-900 content-[''];
    }

    .reset {
      @apply z-10 row-start-2 aspect-square w-full place-self-center rounded-full bg-black;
    }

    .select {
      @apply z-10 col-start-2 aspect-square w-full place-self-center rounded-full bg-black;
    }
  }
</style>
