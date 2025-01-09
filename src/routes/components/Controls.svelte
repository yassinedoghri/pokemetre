<script>
  import ActionButtons from "./ActionButtons.svelte";
  import DPad from "./DPad.svelte";
  import NumPad from "./NumPad.svelte";
</script>

<div class="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 px-4">
  <NumPad />
  <DPad />
  <ActionButtons />
</div>
