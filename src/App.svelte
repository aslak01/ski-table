<script lang="ts">
  import data from './assets/data.json'
  import Visualiser from './lib/components/Visualiser.svelte'
</script>

<main>
  <Visualiser {data} />
</main>

<style>
  main {
    margin-inline: auto;
    margin-block: 50px;
    max-width: 1000px;
  }
</style>
