<script lang="ts">
  import data from './assets/data.json'
  import WorldCupComponent from './lib/WorldCupComponent.svelte'
</script>

<main>
  <WorldCupComponent {data} />
</main>

<style>
  main {
    max-width: 1000px;
    margin-block: 50px;
    width: 550px;
  }
</style>
