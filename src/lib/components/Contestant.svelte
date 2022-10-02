<script lang="ts">
  import { onMount } from 'svelte'
  import type { Contestant } from '../types'
  import { lerpArrSegment } from '../functions'
  export let contestant: Contestant
  export let uuid: string
  export let pctAtIndex: number[]
  export let progress: number
  export let playing: boolean
  export let slowestTime: number
  let times: number[] = []
  let relativeTimes: number[] = []
  $: progressed = relativeTimes[progress]
  $: {
    if (contestant.times) {
      for (const [i, t] of contestant.times.entries()) {
        const ts = contestant.times
        if (typeof contestant.times[i + 1] === 'undefined') break
        const segment = lerpArrSegment(
          t,
          ts[i + 1],
          pctAtIndex[i],
          pctAtIndex[i + 1]
        )
        times.push(...segment)
      }
      relativeTimes = times.map((t) => (t / slowestTime) * 100)
    }
  }
  let mounted = false
  onMount(() => {
    mounted = true
    // console.log(times)
    console.log(progressed)
    // console.log(relativeTimes)
  })
</script>

{#if mounted}
  <div class="contestant" id={uuid} style="--progress: {progressed}%">
    {contestant.shirtNumber}
  </div>
{/if}

<style>
  .contestant {
    position: relative;
    color: white;
    font-size: 8pt;
    height: 5px;
    width: 5px;
    left: var(--progress);
  }
</style>
