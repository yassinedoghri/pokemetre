<script lang="ts">
  import type { PokemetreMachine } from "../pokemetreMachine";
  import DisplayPanel from "./DisplayPanel.svelte";

  interface Props {
    machine: PokemetreMachine;
  }

  const { machine }: Props = $props();

  const { snapshot } = machine;
</script>

<section class="screen">
  <div class="bezel">
    <div class="steps-indicators">
      <div class="step" class:active={$snapshot.context.height !== ""}>
        <span class="sr-only">Step 1 - Height</span>
      </div>
      <div class="step" class:active={$snapshot.context.weight !== ""}>
        <span class="sr-only">Step 2 - Weight</span>
      </div>
    </div>
    <DisplayPanel {machine} />
    <div class="power-indicator"><span class="sr-only">On</span></div>
    <div class="speakers"></div>
  </div>
</section>

<style lang="postcss">
  .screen {
    @apply relative rounded-md;

    .bezel {
      @apply relative z-20 aspect-[4/3] w-full -translate-y-1 rounded-md bg-red-50 px-8 pb-12 pt-8;

      box-shadow:
        inset 0 2px 0 0 theme(colors.white),
        inset 0 -1px 0 0 theme(colors.black / 5%);

      .steps-indicators {
        @apply absolute inset-x-0 top-3 flex items-center justify-center gap-x-2;

        .step {
          @apply aspect-square w-2 rounded-full bg-black;

          &.active {
            @apply bg-yellow-400 shadow-orange-500;

            box-shadow: 0 0 4px 0 theme(colors.yellow.500 / 75%);
          }
        }
      }

      .power-indicator {
        @apply absolute bottom-4 left-8 aspect-square w-4 rounded-full bg-red-500;

        box-shadow:
          inset 0 -10px 10px -8px theme(colors.red.600),
          inset 3px 1px 0 0 theme(colors.red.500),
          inset -2px 2px 0 0 theme(colors.red.500),
          inset 3px 4px 0 0 theme(colors.white / 0.4),
          0 0 4px 0 theme(colors.red.500 / 75%);
      }

      .speakers {
        @apply absolute bottom-5 right-8 h-1.5 w-16 rounded-full bg-black;

        box-shadow: inset 0 -1px 0 0 theme(colors.white / 50%);

        &::before {
          @apply absolute bottom-3 h-1.5 w-16 rounded-full bg-black content-[''];

          box-shadow: inset 0 -1px 0 0 theme(colors.white / 50%);
        }

        &::after {
          @apply absolute -bottom-3 h-1.5 w-16 rounded-full bg-black content-[''];

          box-shadow: inset 0 -1px 0 0 theme(colors.white / 50%);
        }
      }
    }

    &::after {
      @apply absolute left-0 top-0 h-full w-full rounded-md bg-red-50 content-[''];

      background: linear-gradient(
        to left,
        theme(colors.stone.300) 0%,
        theme(colors.red.100) 2%,
        theme(colors.red.100) 96%,
        theme(colors.stone.300) 100%
      );
    }

    &::before {
      @apply absolute left-0 top-0 h-full w-full translate-y-1 rounded-md bg-red-900 content-[''];
    }
  }
</style>
