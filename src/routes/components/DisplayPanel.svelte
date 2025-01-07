<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import InputScreen from "./InputScreen.svelte";
  import SummaryScreen from "./SummaryScreen.svelte";
  import LoadingScreen from "./LoadingScreen.svelte";
  import FailureScreen from "./FailureScreen.svelte";
  import SuccessScreen from "./SuccessScreen.svelte";
  import HomeScreen from "./HomeScreen.svelte";
  import { useMachine } from "@xstate/svelte";
  import { pokemetreMachine } from "../pokemetreMachine";

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

  const handleKeydown: KeyboardEventHandler<Window> = (event) => {
    if (event.key === "ArrowLeft") {
      focusPreviousElement();
    } else if (event.key === "ArrowRight") {
      focusNextElement();
    }
  };

  const initActiveElement = () => {
    const activeElement = document.querySelector(
      "#screen [tabindex='0']"
    ) as HTMLElement | null;

    if (activeElement) {
      activeElement.focus();
    }
  };

  const getCurrentActiveElement = (): HTMLElement | null => {
    let activeElement = document.activeElement as HTMLElement | null;

    return activeElement;
  };

  const focusNextElement = () => {
    const currentActiveElement = getCurrentActiveElement();

    if (currentActiveElement) {
      const tabIndex = currentActiveElement.tabIndex;
      const nextElement = document.querySelector(
        `#screen [tabindex="${tabIndex + 1}"]`
      ) as HTMLElement | null;

      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const focusPreviousElement = () => {
    const currentActiveElement = getCurrentActiveElement();

    if (currentActiveElement) {
      const tabIndex = currentActiveElement.tabIndex;
      const nextElement = document.querySelector(
        `#screen [tabindex="${tabIndex - 1}"]`
      ) as HTMLElement | null;

      if (nextElement) {
        nextElement.focus();
      }
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="h-full bg-zinc-800 p-4">
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
      onChange={(event) => {
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
      onChange={(event) => {
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
