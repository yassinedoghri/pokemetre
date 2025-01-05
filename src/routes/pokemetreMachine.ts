import type { Pokemon } from "$lib/server/db/schema";
import { assign, fromPromise, setup } from "xstate";

export const fetchPokemon = (height: string, weight: string) =>
  fetch(`/?height=${height}&weight=${weight}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => response);

export const pokemetreMachine = setup({
  types: {
    context: {} as {
      height: string;
      weight: string;
      pokemon: Pokemon | null;
      error: unknown;
    },
    events: {} as
      | { type: "START" }
      | { type: "NEXT" }
      | { type: "PREV" }
      | { type: "FIND" }
      | { type: "RETRY" }
      | { type: "START_AGAIN" }
      | { type: "height.UPDATE"; height: string }
      | { type: "weight.UPDATE"; weight: string },
  },
  actors: {
    fetchPokemon: fromPromise<unknown, { height: string; weight: string }>(
      async ({ input }) => {
        const pokemon = await fetchPokemon(input.height, input.weight);

        return pokemon;
      }
    ),
  },
}).createMachine({
  id: "pokemetre",
  initial: "idle",
  context: {
    height: "",
    weight: "",
    pokemon: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        START: "setHeight",
      },
    },
    setHeight: {
      on: {
        "height.UPDATE": {
          actions: assign({
            height: ({ event }) => event.height,
          }),
        },
        NEXT: "setWeight",
        PREV: "idle",
      },
    },
    setWeight: {
      on: {
        "weight.UPDATE": {
          actions: assign({
            weight: ({ event }) => event.weight,
          }),
        },
        NEXT: "summary",
        PREV: "setHeight",
      },
    },
    summary: {
      on: {
        PREV: "setWeight",
        FIND: "loadingPokemon",
      },
    },
    loadingPokemon: {
      invoke: {
        id: "getPokemon",
        src: "fetchPokemon",
        input: ({ context: { height, weight } }) => ({ height, weight }),
        onDone: {
          target: "success",
          actions: assign({
            pokemon: ({ event }) => event.output as Pokemon,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({ error: ({ event }) => event.error }),
        },
      },
    },
    failure: {
      on: {
        RETRY: { target: "loadingPokemon" },
      },
    },
    success: {
      on: {
        START_AGAIN: "setHeight",
      },
    },
  },
});
