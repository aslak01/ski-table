<script lang="ts">
  import type { Distances } from '../types'
  import {
    // convertToDs,
    // lerpArrSegment,
    deserializeData,
    convertKeysToPercent
  } from '../functions'
  import Contestant from './Contestant.svelte'
  export let data: Distances
  export let progress: number
  export let framesTo100: number
  export let debug: boolean

  const pctAtIndex = Object.keys(data).map((k) =>
    convertKeysToPercent(k)
  )
  pctAtIndex.unshift(0)

  // const timesInDsAtFinish = data['10km']
  //   .map((time) => convertToDs(time.duration))
  //   .filter((n) => typeof n !== 'undefined')
  // const fastestTime = Math.min(...(timesInDsAtFinish as number[]))
  // const slowestTime = Math.max(...(timesInDsAtFinish as number[]))

  const contestants = deserializeData(data)

  // Interpolation red herring...
  // const transformTimes = (
  //   ogTimes: number[] | undefined
  // ): number[] => {
  //   let times = []
  //   let relativeTimes = []
  //   if (typeof ogTimes !== 'undefined') {
  //     for (const [i, t] of ogTimes.entries()) {
  //       const ts = ogTimes
  //       if (typeof ogTimes[i + 1] === 'undefined') break
  //       const segment = lerpArrSegment(
  //         t,
  //         ts[i + 1],
  //         pctAtIndex[i],
  //         pctAtIndex[i + 1]
  //       )
  //       times.push(...segment)
  //     }
  //   }
  //   // relativeTimes = times.map((t) => t / fastestTime)
  //   return times
  //   // return times
  // }
</script>

<div class="wrapper">
  {#if debug}
    <div class="info">
      {progress}
    </div>
  {/if}
  <div class="indicators">
    <div class="check" />
    <div class="check" />
    <div class="check" />
    <div class="check" />
    <div class="check" />
    <div class="check" />
  </div>
  <div class="piste">
    {#each Object.entries(contestants) as [uuid, contestant]}
      <Contestant {uuid} {contestant} {framesTo100} {progress} />
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 100%;
    height: 1000px;
    width: 100%;
    overflow: hidden;
    background: black;
  }
  .info {
    position: absolute;
    color: white;
    top: 5px;
    right: 10px;
  }
  .piste {
    grid-area: 1 / 2 / 1 / 2;
    z-index: 2;
  }
  .indicators {
    grid-area: 1 / 2 / 1 / 2;
    height: 100%;
    display: grid;
    grid-template-columns: 11% 20% 19% 11% 20% 19%;
    z-index: 1;
  }
  .check {
    border-right: 1px dotted white;
    height: 100%;
    opacity: 0.5;
  }
  .check:first-of-type {
    border-left: 1px dashed white;
  }
  .check:last-of-type {
    border-right: 1px dashed white;
  }
</style>
