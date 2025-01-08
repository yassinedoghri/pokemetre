<script lang="ts">
  import InputScreen from "./InputScreen.svelte";
  import SummaryScreen from "./SummaryScreen.svelte";
  import LoadingScreen from "./LoadingScreen.svelte";
  import FailureScreen from "./FailureScreen.svelte";
  import SuccessScreen from "./SuccessScreen.svelte";
  import HomeScreen from "./HomeScreen.svelte";
  import { useMachine } from "@xstate/svelte";
  import { pokemetreMachine } from "../pokemetreMachine";
  import { initActiveElement, handleScreenAction } from "./ui-actions";

  const { snapshot, send } = useMachine(pokemetreMachine);

  let prevScreenState = $state("home");
  snapshot.subscribe((snapshot) => {
    if (snapshot.value !== prevScreenState) {
      prevScreenState = snapshot.value;
    }
  });

  $effect(() => {
    if (prevScreenState) {
      initActiveElement();
    }
  });
</script>

<svelte:window onkeydown={handleScreenAction} />

<div class="h-full bg-zinc-800 p-4" id="display-panel">
  {#if $snapshot.matches("home")}
    <HomeScreen
      onStart={() => {
        send({ type: "START" });
      }}
    />
  {:else if $snapshot.matches("settingHeight")}
    <InputScreen
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
        send({ type: "NEXT" });
      }}
    />
  {:else if $snapshot.matches("settingWeight")}
    <InputScreen
      name="weight"
      label="Your weight (in KG)"
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
        send({ type: "NEXT" });
      }}
    />
  {:else if $snapshot.matches("summary")}
    <SummaryScreen
      height={$snapshot.context.height}
      weight={$snapshot.context.weight}
      onPrev={() => {
        send({ type: "PREV" });
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
