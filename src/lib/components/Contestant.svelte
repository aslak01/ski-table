<script lang="ts">
  import { onMount } from 'svelte'
  import type { Contestant } from '../types'
  import { onhover, clamp } from '../functions'
  export let contestant: Contestant
  export let progress: number
  export let framesTo100: number
  export let slowestTime: number

  const times = contestant.times ? contestant.times : [0]
  const maxTime = times[times?.length - 1]
  const speedFactor = maxTime / slowestTime
  const localFrameCount = framesTo100 * speedFactor

  $: raceProgress = (progress / localFrameCount) * 100
  $: progressed = contestant.rank ? clamp(raceProgress, 0, 100) : 0
  $: finished = progressed === 100 ? true : false

  // $: if (
  //   contestant.uuid === '89967c80-6a47-4b13-887b-9f39871954f8' ||
  //   contestant.uuid === 'a7797838-6fc5-4615-9143-67bc3c646dc3'
  // ) {
  //   console.log(contestant.times)
  //   console.log('slowestTime', slowestTime)
  //   console.log('localFrameCount', localFrameCount)
  //   console.log('finished', finished)
  //   console.log('speedFactor', speedFactor)
  //   // console.log('progress', progress)
  //   // console.log('percentDone', percentDone)
  // }
  let mounted = false
  let hover = false

  onMount(() => {
    mounted = true
  })
</script>

{#if mounted}
  <div
    class="contestant"
    class:hover
    style="--progress: {progressed}%"
    use:onhover={() => (hover = !hover)}
  >
    {#if finished}
      <div
        class="number"
        class:gold={contestant.rank === 1}
        class:silver={contestant.rank === 2}
        class:bronze={contestant.rank === 3}
      >
        {contestant.rank}
      </div>
    {/if}
    <div class="name">
      {contestant.shirtNumber}
      {contestant.name}
    </div>
    <div class="track" />
  </div>
{/if}

<style>
  .hover {
    cursor: pointer;
  }
  .contestant {
    position: relative;
    font-size: 8pt;
    height: 15px;
    line-height: 15px;
    width: var(--progress);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .number {
    position: absolute;
    right: -20px;
    background: white;
    border-radius: 999px;
    color: black;
    height: 15px;
    width: 15px;
    font-size: 7pt;
    padding: 0;
    line-height: 15px;
  }
  .number.gold {
    background: gold;
  }
  .number.silver {
    background: silver;
  }
  .number.bronze {
    background: #cd7f32;
  }
  .track {
    width: 100%;
    border-block: 1px solid #ffffff80;
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
    padding-left: 5px;
    padding-right: 5px;
    border-right: 1px solid white;
  }
  .hover .name {
    font-weight: bold;
  }
</style>
