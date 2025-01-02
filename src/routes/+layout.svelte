<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="grid min-h-screen place-items-center items-center justify-center">
  {@render children()}
</main>
