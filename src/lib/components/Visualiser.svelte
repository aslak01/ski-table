<style>
  .line {
    max-width: 100%;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte'
  import type { Distances } from '../types/definitions'
  export let data: Distances

  onMount(() => {
    console.log(data)
  })
</script>

{#each Object.entries(data) as [key, lines]}
  {key}
  <div class="line">
    {#each lines as line}
      {line.duration}
    {/each}
  </div>
{/each}
