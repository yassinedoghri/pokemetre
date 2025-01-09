<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div
  id="numpad"
  class="col-span-2 grid grid-cols-5 gap-2 rounded-lg bg-red-900 p-4"
>
  <button type="button" onclick={() => triggerKeydown("1")}
    ><span>1</span></button
  >
  <button type="button" onclick={() => triggerKeydown("2")}
    ><span>2</span></button
  >
  <button type="button" onclick={() => triggerKeydown("3")}
    ><span>3</span></button
  >
  <button type="button" onclick={() => triggerKeydown("4")}
    ><span>4</span></button
  >
  <button type="button" onclick={() => triggerKeydown("5")}
    ><span>5</span></button
  >
  <button type="button" onclick={() => triggerKeydown("6")}
    ><span>6</span></button
  >
  <button type="button" onclick={() => triggerKeydown("7")}
    ><span>7</span></button
  >
  <button type="button" onclick={() => triggerKeydown("8")}
    ><span>8</span></button
  >
  <button type="button" onclick={() => triggerKeydown("9")}
    ><span>9</span></button
  >
  <button type="button" onclick={() => triggerKeydown("0")}
    ><span>0</span></button
  >
</div>

<style lang="postcss">
  #numpad {
    /* shadow and highlight */
    box-shadow:
      inset 0 30px 20px -20px theme(colors.black / 15%),
      inset 0 -30px 20px -20px theme(colors.white / 15%);
  }

  button {
    @apply relative rounded-lg text-3xl font-bold text-blue-950;

    span {
      @apply relative z-20 grid aspect-square -translate-y-1.5 place-items-center rounded-lg bg-blue-500 bg-gradient-to-b from-blue-500 to-blue-600;

      transition-property: box-shadow, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      text-shadow:
        0 1px 0 theme(colors.white / 15%),
        0 -1px 0 theme(colors.black / 15%);
      box-shadow:
        inset 0 3px 0 -2px theme(colors.white / 15%),
        inset 0 -1px 0 0 theme(colors.black / 50%);
    }

    &:hover span {
      @apply -translate-y-2;

      box-shadow:
        inset 0 1px 0 0 theme(colors.white / 20%),
        inset 0 -1px 0 0 theme(colors.black / 60%);
    }

    &:active span {
      @apply -translate-y-0.5 duration-[32ms];

      box-shadow:
        inset 0 8px 0 -7px theme(colors.white / 10%),
        inset 0 -1px 0 0 theme(colors.black / 3%);
    }

    &::after {
      @apply absolute left-0 top-0 z-10 h-full w-full rounded-lg transition-transform content-[''];

      background: linear-gradient(
        to left,
        theme(colors.blue.800) 0%,
        theme(colors.blue.700) 16%,
        theme(colors.blue.700) 84%,
        theme(colors.blue.800) 100%
      );
    }

    &::before {
      @apply absolute left-0 top-0 h-full w-full translate-y-1 rounded-lg bg-black/25 transition-transform content-[''];
    }

    &:hover::before {
      @apply translate-y-1.5;
    }

    &:active::before {
      @apply translate-y-0.5 duration-[32ms];
    }
  }
</style>
