<script lang="ts">
  import InputScreen from "./InputScreen.svelte";
  import SummaryScreen from "./SummaryScreen.svelte";
  import LoadingScreen from "./LoadingScreen.svelte";
  import FailureScreen from "./FailureScreen.svelte";
  import SuccessScreen from "./SuccessScreen.svelte";
  import HomeScreen from "./HomeScreen.svelte";
  import { initActivatableElements, handleScreenAction } from "./ui-actions";
  import type { PokemetreMachine } from "../pokemetreMachine";
  import AboutScreen from "./AboutScreen.svelte";

  interface Props {
    machine: PokemetreMachine;
  }

  const { machine }: Props = $props();

  const { snapshot, send } = machine;

  let prevScreenState = $state("home");
  snapshot.subscribe((snapshot) => {
    if (snapshot.value !== prevScreenState) {
      prevScreenState = snapshot.value;
    }
  });

  $effect(() => {
    if (prevScreenState) {
      initActivatableElements();
    }
  });
</script>

<svelte:window onkeydown={handleScreenAction} />

<div class="h-full p-4 font-display" id="display-panel">
  {#if $snapshot.matches("home")}
    <HomeScreen
      isContinue={$snapshot.context.isHeightSet ||
        $snapshot.context.isHeightSet}
      onStart={() => {
        send({ type: "START" });
      }}
      onAbout={() => {
        send({ type: "ABOUT" });
      }}
    />
  {:else if $snapshot.matches("about")}
    <AboutScreen
      onOK={() => {
        send({ type: "HOME" });
      }}
    />
  {:else if $snapshot.matches("settingHeight")}
    <InputScreen
      step={1}
      name="height"
      label="Your height (in cm)"
      defaultValue={$snapshot.context.height ?? ""}
      onInput={(event) => {
        send({
          type: "height.UPDATE",
          height: event.currentTarget.value,
        });
      }}
      onPrev={() => {
        send({ type: "PREV" });
      }}
      onNext={() => {
        send({ type: "height.SET", isHeightSet: true });
      }}
    />
  {:else if $snapshot.matches("settingWeight")}
    <InputScreen
      step={2}
      name="weight"
      label="Your weight (in kg)"
      defaultValue={$snapshot.context.weight ?? ""}
      onInput={(event) => {
        send({
          type: "weight.UPDATE",
          weight: event.currentTarget.value,
        });
      }}
      onPrev={() => {
        send({ type: "PREV" });
      }}
      onNext={() => {
        send({ type: "weight.SET", isWeightSet: true });
      }}
    />
  {:else if $snapshot.matches("summary")}
    <SummaryScreen
      height={$snapshot.context.height}
      weight={$snapshot.context.weight}
      onEditHeight={() => {
        send({ type: "height.EDIT", isHeightSet: false });
      }}
      onEditWeight={() => {
        send({ type: "weight.EDIT", isWeightSet: false });
      }}
      onFind={() => {
        send({ type: "FIND" });
      }}
    />
  {:else if $snapshot.matches("loadingPokemon")}
    <LoadingScreen />
  {:else if $snapshot.matches("failure")}
    <FailureScreen
      error={$snapshot.context.error}
      onRetry={() => {
        send({ type: "RETRY" });
      }}
    />
  {:else if $snapshot.matches("success")}
    <SuccessScreen
      pokemon={$snapshot.context.pokemon}
      onHome={() => {
        send({ type: "HOME" });
      }}
    />
  {/if}
</div>

<style lang="postcss">
  #display-panel {
    @apply mix-blend-multiply;

    background-size: 4px 4px;
    background-image: linear-gradient(
      to bottom,
      theme(colors.black / 5%) 1px,
      transparent 1px
    );
    box-shadow:
      inset 0 3px 0 0 theme(colors.black / 0.25),
      inset 0 -3px 0 0 theme(colors.white);
  }
</style>
