<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div class="d-pad">
  <button id="up" type="button" onmousedown={() => triggerKeydown("ArrowUp")}>
    <span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <title>up</title><path d="M12 8L18 14H6L12 8Z"></path></svg
      >
    </span></button
  >
  <button
    id="left"
    type="button"
    onmousedown={() => triggerKeydown("ArrowLeft")}
    ><span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <title>left</title><path d="M8 12L14 6V18L8 12Z"></path></svg
      >
    </span></button
  >
  <div id="center"></div>
  <button
    id="down"
    type="button"
    onmousedown={() => triggerKeydown("ArrowDown")}
    ><span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <title>down</title><path d="M12 16L6 10H18L12 16Z"></path></svg
      >
    </span></button
  >
  <button
    id="right"
    type="button"
    onmousedown={() => triggerKeydown("ArrowRight")}
    ><span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <title>right</title><path d="M16 12L10 18V6L16 12Z"></path></svg
      >
    </span></button
  >
</div>

<style lang="postcss">
  .d-pad {
    @apply h-36 w-36 rounded-full bg-red-900 p-3;

    display: grid;
    grid-template-columns: 1fr 0.5rem 2rem 0.5rem 1fr;
    grid-template-rows: 1fr 0.5rem 2rem 0.5rem 1fr;

    /* shadow and highlight */
    box-shadow:
      inset 0 30px 20px -20px theme(colors.black / 15%),
      inset 0 -30px 20px -20px theme(colors.white / 15%);

    button {
      @apply relative z-10 h-full w-full;

      &::after {
        @apply absolute left-0 top-0 z-10 h-full w-full transition-transform content-[''];
      }

      span {
        @apply relative z-20 grid h-full w-full -translate-y-1.5 place-items-center bg-gray-900;

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
        @apply absolute left-0 top-0 h-full w-full translate-y-1 bg-black/25 transition-transform content-[''];
      }

      &:hover::before {
        @apply translate-y-1.5;
      }

      &:active::before {
        @apply translate-y-0.5 duration-[32ms];
      }
    }

    #up {
      @apply rounded-b-3xl rounded-t-lg;

      grid-area: 1 / 2 / 3 / 5;

      &::after {
        @apply rounded-b-3xl rounded-t-lg;

        background: linear-gradient(
          to left,
          theme(colors.black) 0%,
          theme(colors.gray.900) 20%,
          theme(colors.gray.900) 80%,
          theme(colors.black) 100%
        );
      }

      span {
        @apply rounded-b-3xl rounded-t-lg;
      }

      &::before {
        @apply rounded-b-3xl rounded-t-lg;
      }
    }

    #left {
      @apply rounded-l-lg rounded-r-3xl;

      grid-area: 2 / 1 / 5 / 3;

      &::after {
        @apply rounded-l-lg rounded-r-3xl;

        background: linear-gradient(
          to left,
          theme(colors.black) 0%,
          theme(colors.gray.900) 24%,
          theme(colors.gray.900) 92%,
          theme(colors.black) 100%
        );
      }

      span {
        @apply rounded-l-lg rounded-r-3xl;
      }

      &::before {
        @apply rounded-l-lg rounded-r-3xl;
      }
    }

    #down {
      @apply z-20 rounded-b-lg rounded-t-3xl;

      grid-area: 4 / 2 / 7 / 5;

      &::after {
        @apply rounded-b-lg rounded-t-3xl;

        background: linear-gradient(
          to left,
          theme(colors.black) 0%,
          theme(colors.gray.900) 8%,
          theme(colors.gray.900) 92%,
          theme(colors.black) 100%
        );
      }

      span {
        @apply rounded-b-lg rounded-t-3xl;
      }

      &::before {
        @apply rounded-b-lg rounded-t-3xl;
      }
    }

    #right {
      @apply rounded-l-3xl rounded-r-lg;

      grid-area: 2 / 4 / 5 / 7;

      &::after {
        @apply rounded-l-3xl rounded-r-lg;

        background: linear-gradient(
          to right,
          theme(colors.black) 0%,
          theme(colors.gray.900) 24%,
          theme(colors.gray.900) 92%,
          theme(colors.black) 100%
        );
      }

      span {
        @apply rounded-l-3xl rounded-r-lg;
      }

      &::before {
        @apply rounded-l-3xl rounded-r-lg;
      }
    }

    #center {
      grid-area: c;
    }
  }
</style>
