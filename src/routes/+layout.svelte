<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<div
  class="flex h-full w-full max-w-sm flex-col bg-red-800 text-white xs:h-[inherit] xs:max-h-[700px] xs:rounded-3xl xs:shadow-2xl"
>
  {@render children()}
</div>
