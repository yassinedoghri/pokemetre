<script lang="ts">
  import { triggerKeydown } from "./ui-actions";
</script>

<div class="col-span-2 grid grid-cols-5 gap-2 rounded-lg bg-red-900 p-4">
  <button type="button" onclick={() => triggerKeydown("1")}>1</button>
  <button type="button" onclick={() => triggerKeydown("2")}>2</button>
  <button type="button" onclick={() => triggerKeydown("3")}>3</button>
  <button type="button" onclick={() => triggerKeydown("4")}>4</button>
  <button type="button" onclick={() => triggerKeydown("5")}>5</button>
  <button type="button" onclick={() => triggerKeydown("6")}>6</button>
  <button type="button" onclick={() => triggerKeydown("7")}>7</button>
  <button type="button" onclick={() => triggerKeydown("8")}>8</button>
  <button type="button" onclick={() => triggerKeydown("9")}>9</button>
  <button type="button" onclick={() => triggerKeydown("0")}>0</button>
</div>

<style lang="postcss">
  button {
    @apply aspect-square rounded bg-blue-500 text-2xl font-bold;
  }
</style>
