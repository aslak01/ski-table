<script lang="ts">
  import { onMount } from 'svelte'
  import type { Contestant } from '../types'
  import { onhover, clamp, dsToHumandate } from '../functions'
  export let contestant: Contestant
  export let progress: number
  export let framesTo100: number
  export let slowestTime: number

  const times = contestant.times ? contestant.times : [0]
  const maxTime = times[times?.length - 1]
  const speedFactor = maxTime / slowestTime
  const localFrameCount = framesTo100 * speedFactor

  $: raceProgress = (progress / localFrameCount) * 100
  $: progressed =
    contestant.rank && !isNaN(raceProgress)
      ? clamp(raceProgress, 0, 100)
      : 0
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
      <div class="time">{dsToHumandate(maxTime)}</div>
      <div
        class="number"
        class:gold={contestant.rank === 1}
        class:silver={contestant.rank === 2}
        class:bronze={contestant.rank === 3}
      >
        {contestant.rank}
      </div>
    {/if}
    <div class="flag">
      <slot />
    </div>
    <div class="name">
      {contestant.shirtNumber}
      {contestant.name}
    </div>
    <div class="track" />
  </div>
{/if}

<style>
  :root {
    --line-height: 15px;
  }
  .hover {
    cursor: pointer;
  }
  .contestant {
    position: relative;
    font-size: 8pt;
    height: var(--line-height);
    line-height: var(--line-height);
    width: var(--progress);
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .number {
    position: absolute;
    right: -20px;
    background: var(--indigo-1);
    border-radius: 999px;
    color: black;
    height: var(--line-height);
    width: var(--line-height);
    font-size: 7pt;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .time {
    position: absolute;
    right: -80px;
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
  }
  .flag {
    width: var(--line-height);
    height: var(--line-height);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hover .name {
    font-weight: bold;
  }
</style>
