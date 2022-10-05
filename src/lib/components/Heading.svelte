<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { MetaData } from '../types/definitions'
  export let data: MetaData
  export let running: boolean
  export let pause: boolean
  export let timeElapsed: number
  export let framesTo100: number

  const dispatch = createEventDispatcher()

  const start = () => dispatch('start')
  const startOrPause = () => dispatch('toggle')
  const restart = () => dispatch('replay')
</script>

<div class="header">
  {data.name}
  {data.date}
  {data.competitionName}
  {data.season}
</div>
<slot />

{#if running === false && timeElapsed < framesTo100}
  <button on:click={start}>Play</button>
{:else if timeElapsed < framesTo100}
  <button on:click={startOrPause}>
    {#if pause}
      Continue
    {:else}
      Pause
    {/if}
  </button>
{:else}
  <button on:click={restart}>Replay</button>
{/if}

<style>
  .header {
    font-size: var(--font-size-fluid-5);
  }
</style>
