<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div class="d-pad">
  <button id="up" type="button" onmousedown={() => triggerKeydown("ArrowUp")}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <title>up</title><path d="M12 8L18 14H6L12 8Z"></path></svg
    >
  </button>
  <button
    id="left"
    type="button"
    onmousedown={() => triggerKeydown("ArrowLeft")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <title>left</title><path d="M8 12L14 6V18L8 12Z"></path></svg
    >
  </button>
  <div id="center"></div>
  <button
    id="down"
    type="button"
    onmousedown={() => triggerKeydown("ArrowDown")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <title>down</title><path d="M12 16L6 10H18L12 16Z"></path></svg
    >
  </button>
  <button
    id="right"
    type="button"
    onmousedown={() => triggerKeydown("ArrowRight")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <title>right</title><path d="M16 12L10 18V6L16 12Z"></path></svg
    >
  </button>
</div>

<style lang="postcss">
  .d-pad {
    @apply grid h-32 w-32 grid-cols-3 grid-rows-3 rounded-full bg-red-900 p-4;

    > * {
      @apply bg-black;
    }

    button {
      @apply z-10;
    }

    #up,
    #down,
    #center {
      @apply col-start-2;
    }

    #left,
    #right,
    #center {
      @apply row-start-2;
    }

    #up {
      @apply rounded-t;
    }

    #down {
      @apply row-start-3 rounded-b;
    }

    #left {
      @apply rounded-l;
    }

    #right {
      @apply col-start-3 rounded-r;
    }
  }
</style>
