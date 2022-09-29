<script lang="ts">
  import data from './assets/data.json'
  import WorldCupComponent from './lib/WorldCupComponent.svelte'
</script>

<main>
  <WorldCupComponent {data} />
</main>

<style>
  main {
    max-width: 500px;
    margin-block: 100px;
  }
</style>
