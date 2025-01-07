import type { Pokemon } from "$lib/server/db/schema";
import { assign, fromPromise, setup } from "xstate";

export interface ResponseError extends Error {
  status: number;
  statusText: string;
}

export const fetchPokemon = (height: string, weight: string) =>
  fetch(`/?height=${height}&weight=${weight}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response);
    })
    .then((responseJson) => responseJson)
    .catch(async (response) => {
      const error = await response.json();

      const responseError = new Error(error.message) as ResponseError;
      responseError.status = response.status;
      responseError.statusText = response.statusText;

      throw responseError;
    });

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
      | { type: "HOME" }
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
  initial: "home",
  context: {
    height: "",
    weight: "",
    pokemon: null,
    error: null,
  },
  states: {
    home: {
      on: {
        START: "settingHeight",
      },
    },
    settingHeight: {
      on: {
        "height.UPDATE": {
          actions: assign({
            height: ({ event }) => event.height,
          }),
        },
        NEXT: "settingWeight",
        PREV: "home",
      },
    },
    settingWeight: {
      on: {
        "weight.UPDATE": {
          actions: assign({
            weight: ({ event }) => event.weight,
          }),
        },
        NEXT: "summary",
        PREV: "settingHeight",
      },
    },
    summary: {
      on: {
        PREV: "settingWeight",
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
        RETRY: { target: "settingHeight" },
      },
    },
    success: {
      on: {
        HOME: "home",
      },
    },
  },
});
