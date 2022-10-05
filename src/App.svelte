<script lang="ts">
  import data from './assets/data.json'
  import Visualiser from './lib/components/Visualiser.svelte'
</script>

<main>
  <Visualiser {data} />
</main>

<style>
  main {
    max-width: 1000px;
    margin-inline: auto;
    margin-block: 50px;
  }
</style>
