<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div class="action-buttons">
  <button id="select" type="button" onclick={() => triggerKeydown("Enter")}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><title>Select</title><path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
      ></path></svg
    ></button
  >
  <button id="reset" type="button" onclick={() => triggerKeydown("Delete")}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      ><title>Reset</title><path
        d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
      ></path></svg
    ></button
  >
</div>

<style lang="postcss">
  .action-buttons {
    @apply relative grid aspect-square w-28 grid-cols-2 grid-rows-2 place-self-center;

    &::before {
      @apply absolute bottom-0 left-0 h-full w-14 translate-x-1/2 rotate-45 scale-125 scale-y-[135%] rounded-full bg-red-900 content-[''];
    }

    button {
      @apply z-10 aspect-square w-full place-self-center rounded-full bg-black p-3;
    }

    #select {
      @apply col-start-2;
    }

    #reset {
      @apply row-start-2;
    }
  }
</style>
