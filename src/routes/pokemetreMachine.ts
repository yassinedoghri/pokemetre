import type { Pokemon } from "$lib/server/db/schema";
import type { Readable } from "svelte/store";
import {
  assign,
  fromPromise,
  setup,
  type ActorRefFrom,
  type EventFrom,
  type SnapshotFrom,
} from "xstate";

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
      isHeightSet: boolean;
      isWeightSet: boolean;
      pokemon: Pokemon | null;
      error: unknown;
    },
    events: {} as
      | { type: "START" }
      | { type: "ABOUT" }
      | { type: "NEXT" }
      | { type: "PREV" }
      | { type: "EDIT_HEIGHT" }
      | { type: "EDIT_WEIGHT" }
      | { type: "FIND" }
      | { type: "RETRY" }
      | { type: "HOME" }
      | { type: "height.UPDATE"; height: string }
      | { type: "height.SET"; isHeightSet: boolean }
      | { type: "height.EDIT"; isHeightSet: boolean }
      | { type: "weight.UPDATE"; weight: string }
      | { type: "weight.SET"; isWeightSet: boolean }
      | { type: "weight.EDIT"; isWeightSet: boolean },
  },
  actors: {
    fetchPokemon: fromPromise<unknown, { height: string; weight: string }>(
      async ({ input }) => {
        const pokemon = await fetchPokemon(input.height, input.weight);

        // TODO: keep this 1s delay?
        await new Promise((resolve) => setTimeout(resolve, 1000));

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
    isHeightSet: false,
    isWeightSet: false,
    pokemon: null,
    error: null,
  },
  states: {
    home: {
      on: {
        START: [
          {
            guard: ({ context }) => !context.isHeightSet,
            target: "settingHeight",
          },
          {
            guard: ({ context }) => context.isHeightSet && !context.isWeightSet,
            target: "settingWeight",
          },
          {
            guard: ({ context }) => context.isHeightSet && context.isWeightSet,
            target: "summary",
          },
        ],
        ABOUT: "about",
      },
    },
    about: {
      on: {
        HOME: "home",
      },
    },
    settingHeight: {
      on: {
        "height.UPDATE": {
          actions: assign({
            height: ({ event }) =>
              event.height !== "" ? Number(event.height).toString() : "",
          }),
        },
        "height.SET": [
          {
            actions: assign({
              isHeightSet: ({ event }) => event.isHeightSet,
            }),
            guard: ({ context }) => !context.isWeightSet,
            target: "settingWeight",
          },
          {
            actions: assign({
              isHeightSet: ({ event }) => event.isHeightSet,
            }),
            guard: ({ context }) => context.isWeightSet,
            target: "summary",
          },
        ],
        PREV: "home",
      },
    },
    settingWeight: {
      on: {
        "weight.UPDATE": {
          actions: assign({
            weight: ({ event }) =>
              event.weight !== "" ? Number(event.weight).toString() : "",
          }),
        },
        "weight.SET": {
          actions: assign({
            isWeightSet: ({ event }) => event.isWeightSet,
          }),
          target: "summary",
        },
        PREV: "settingHeight",
      },
    },
    summary: {
      on: {
        "height.EDIT": {
          actions: assign({
            isHeightSet: ({ event }) => event.isHeightSet,
          }),
          target: "settingHeight",
        },
        "weight.EDIT": {
          actions: assign({
            isWeightSet: ({ event }) => event.isWeightSet,
          }),
          target: "settingWeight",
        },
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

export type PokemetreMachine = {
  snapshot: Readable<SnapshotFrom<typeof pokemetreMachine>>;
  send: (event: EventFrom<typeof pokemetreMachine>) => void;
  actorRef: ActorRefFrom<typeof pokemetreMachine>;
};
