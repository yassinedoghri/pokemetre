<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div id="action-buttons">
  <button id="select" type="button" onclick={() => triggerKeydown("Enter")}
    ><span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><title>Select</title><path
          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
        ></path></svg
      ></span
    ></button
  >
  <button id="reset" type="button" onclick={() => triggerKeydown("Delete")}
    ><span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><title>Reset</title><path
          d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
        ></path></svg
      ></span
    ></button
  >
</div>

<style lang="postcss">
  #action-buttons {
    @apply relative grid aspect-square w-28 grid-cols-2 grid-rows-2 place-self-center;

    &::before {
      @apply absolute bottom-0 left-0 h-full w-14 translate-x-1/2 rotate-45 scale-125 scale-y-[135%] rounded-full bg-red-900 content-[''];

      /* shadow and highlight (accounting for rotation)  */
      box-shadow:
        inset 20px 30px 20px -20px theme(colors.black / 15%),
        inset -20px -30px 20px -20px theme(colors.white / 15%);
    }

    button {
      @apply relative rounded-full;

      &::after {
        @apply absolute left-0 top-0 z-10 h-full w-full rounded-full transition-transform content-[''];

        background: linear-gradient(
          to left,
          theme(colors.black) 0%,
          theme(colors.gray.900) 16%,
          theme(colors.gray.900) 84%,
          theme(colors.black) 100%
        );
      }

      span {
        @apply relative z-20 grid aspect-square -translate-y-1.5 rounded-full bg-gray-900 p-3;

        transition-property: box-shadow, transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        box-shadow:
          inset 0 1px 0 0 theme(colors.white / 15%),
          inset 0 10px 10px -5px theme(colors.white / 20%),
          inset 0 -2px 0 -1px theme(colors.white / 5%);
      }

      &:hover span {
        @apply -translate-y-2;

        box-shadow:
          inset 0 1px 0 0 theme(colors.white / 20%),
          inset 0 10px 10px -5px theme(colors.white / 25%),
          inset 0 -2px 0 -1px theme(colors.white / 5%);
      }

      &:active span {
        @apply -translate-y-0.5 duration-[32ms];

        box-shadow:
          inset 0 1px 0 0 theme(colors.white / 10%),
          inset 0 10px 10px -5px theme(colors.white / 15%),
          inset 0 -2px 0 -1px theme(colors.white / 5%);
      }

      &::before {
        @apply absolute left-0 top-0 h-full w-full translate-y-1 rounded-full bg-black/25 transition-transform content-[''];
      }

      &:hover::before {
        @apply translate-y-1.5;
      }

      &:active::before {
        @apply translate-y-0.5 duration-[32ms];
      }
    }

    #select {
      @apply col-start-2;
    }

    #reset {
      @apply row-start-2;
    }
  }
</style>
