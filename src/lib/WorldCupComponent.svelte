<script lang="ts">
  import type { WorldCupData } from './types'
  // import { onMount } from 'svelte'
  import { clamp } from './functions'
  import Heading from './components/Heading.svelte'
  import Visualiser from './components/Visualiser.svelte'
  export let data: WorldCupData

  let debug = true
  let startTime: null | number = null
  let timeElapsed = 0
  let pauseTime = 0
  let pause = false
  let running = false
  let progress = 0
  let framesTo100 = 20000

  const startOrPause = () => {
    running = !running
    pause = !pause
  }
  const start = () => {
    running = true
    requestAnimationFrame(loop)
  }
  const restart = () => {
    timeElapsed = 0
    startTime = null
    pauseTime = 0
    running = true
    pause = false
    requestAnimationFrame(loop)
  }

  $: progress = Math.floor(clamp(timeElapsed, 0, framesTo100))

  function loop(timeStamp: number) {
    if (startTime === null) {
      startTime = timeStamp
    }
    if (running && pause === false) {
      timeElapsed = timeStamp - startTime - pauseTime
      requestAnimationFrame(loop)
    } else if (running && pause) {
      pauseTime = timeStamp - startTime - timeElapsed
      timeElapsed = timeStamp - startTime - pauseTime
      pause = false
      requestAnimationFrame(loop)
    }
  }

  // onMount(() => {
  // })
</script>

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
<Heading data={data.racedata} />
<Visualiser data={data.locations} {progress} {debug} {framesTo100} />
