<script lang="ts">
  import { onMount } from 'svelte'
  import type { Contestant } from '../types'
  import { onhover } from '../functions'
  export let contestant: Contestant
  export let uuid: string
  export let progress: number
  export let times: number[] | undefined
  export let fastestTime: number
  // console.log(times)
  $: progressed = times?.length ? times[progress] * 100 : 0
  let mounted = false
  let hover = false
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
    {#if isNaN(progressed)}
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
    height: 15px;
    line-height: 15px;
    width: 15px;
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
