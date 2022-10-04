<script lang="ts">
  import { onMount } from 'svelte'
  import type { Contestant } from '../types'
  import { onhover } from '../functions'
  export let contestant: Contestant
  export let uuid: string
  export let progress: number
  export let framesTo100: number

  const times = contestant.times ? contestant.times : [0]
  const maxTime = times[times?.length - 1]
  const relativeMax = maxTime / framesTo100
  const localFrameCount = framesTo100 * relativeMax
  // console.log(times)
  $: localFrameCount > progress && progressed <= 100
    ? (progressed += 1 - relativeMax)
    : ''
  $: progressed = 0

  $: finished = Math.floor(progressed) === 100 ? true : false

  let mounted = false
  let hover = false
  $: if (uuid === '89967c80-6a47-4b13-887b-9f39871954f8') {
    console.log(contestant.times)
    console.log('localFrameCount', localFrameCount)
    console.log('relativeMax', relativeMax)
    console.log('finished', finished)
    // console.log('progress', progress)
    // console.log('percentDone', percentDone)
  }
  // $: console.log(progressed)
  // $: console.log(
  //   uuid === '89967c80-6a47-4b13-887b-9f39871954f8' ? progressed : ''
  // )
  onMount(() => {
    mounted = true
    // console.log(times)
    // console.log(relativeTimes)
  })
</script>

{#if mounted}
  <div
    class="contestant"
    class:hover
    id={uuid}
    style="--progress: {progressed}%"
    use:onhover={() => (hover = !hover)}
  >
    <!-- <div class="number"> -->
    <!-- </div> -->
    {#if finished}
      <div class="number">{contestant.rank}</div>
    {/if}
    <div class="name">
      {contestant.shirtNumber}
      {contestant.name}
    </div>
    <div class="track" />
    <!-- {#if hover} -->
    <!-- {/if} -->
  </div>
{/if}

<style>
  .hover {
    cursor: pointer;
  }
  .contestant {
    font-size: 8pt;
    height: 12px;
    width: var(--progress);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .number {
    background: white;
    border-radius: 999px;
    color: black;
    height: 11px;
    width: 11px;
    line-height: 15px;
    margin-left: 5px;
  }
  .track {
    width: 100%;
    border-block: 1px solid white;
    height: 40%;
  }
  .hover .track {
    border-color: var(--indigo-3);
  }
  .hover .number {
    z-index: 100;
    font-weight: bold;
    transform: scale(2);
    transition: transform 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
  }
  .name {
    white-space: nowrap;
    color: white;
    background: black;
    padding-inline: 5px;
  }
  .hover .name {
    font-weight: bold;
  }
</style>
